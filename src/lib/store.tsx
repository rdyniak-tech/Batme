"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  currentUser as initialUser,
  walletTransactions as initialTransactions,
  friendRequests as initialFriendRequests,
  opponents,
  type Transaction,
  type FriendRequest,
} from "./mockData";

const STORAGE_KEY = "batme_state_v1";

type State = {
  wallet: number;
  transactions: Transaction[];
  kycVerified: boolean;
  trustScore: number;
  wins: number;
  losses: number;
  betsWon: number;
  betsLost: number;
  friendSlugs: string[];
  friendRequests: FriendRequest[];
};

function initialState(): State {
  return {
    wallet: initialUser.wallet,
    transactions: initialTransactions,
    kycVerified: initialUser.kycVerified,
    trustScore: initialUser.trustScore,
    wins: initialUser.wins,
    losses: initialUser.losses,
    betsWon: initialUser.betsWon,
    betsLost: initialUser.betsLost,
    friendSlugs: opponents.filter((o) => o.isFriend).map((o) => o.slug),
    friendRequests: initialFriendRequests,
  };
}

function nowLabel() {
  return "Jetzt";
}

type AppStateValue = State & {
  isFriend: (slug: string) => boolean;
  placeBet: (opponentName: string, game: string, stake: number) => boolean;
  completeDuel: (opponentName: string, game: string, stake: number, result: "won" | "lost") => void;
  verifyKyc: () => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
  acceptFriendRequest: (id: string) => void;
  declineFriendRequest: (id: string) => void;
  sendFriendRequest: (username: string) => void;
  removeFriend: (slug: string) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  // Tracked as state (not a ref) so the persist-effect below re-evaluates
  // once hydration actually lands in a render — a ref flips synchronously
  // inside the effect and can't stop that same effect's own stale closure
  // from firing first, which raced and clobbered restored data with defaults.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // Restoring persisted client-only state after mount (hydration-safe):
      // server and first client render use defaults, then this syncs from
      // localStorage — a deliberate exception to the no-setState-in-effect rule.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore corrupt/unavailable storage, keep defaults
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable (private mode etc.) — state still works in-memory
    }
  }, [state, hydrated]);

  const isFriend = useCallback(
    (slug: string) => state.friendSlugs.includes(slug),
    [state.friendSlugs],
  );

  const placeBet = useCallback((opponentName: string, game: string, stake: number) => {
    let ok = false;
    setState((s) => {
      if (stake > s.wallet) return s;
      ok = true;
      const tx: Transaction = {
        id: `tx_${Date.now()}`,
        type: "stake",
        label: `Einsatz vs. ${opponentName} (${game})`,
        amount: -stake,
        date: nowLabel(),
      };
      return { ...s, wallet: s.wallet - stake, transactions: [tx, ...s.transactions] };
    });
    return ok;
  }, []);

  const completeDuel = useCallback(
    (opponentName: string, game: string, stake: number, result: "won" | "lost") => {
      setState((s) => {
        if (result === "won") {
          const pot = stake * 2;
          const tx: Transaction = {
            id: `tx_${Date.now()}`,
            type: "win",
            label: `Sieg vs. ${opponentName} (${game})`,
            amount: pot,
            date: nowLabel(),
          };
          return {
            ...s,
            wallet: s.wallet + pot,
            transactions: [tx, ...s.transactions],
            wins: s.wins + 1,
            betsWon: s.betsWon + 1,
            trustScore: Math.min(100, s.trustScore + 1),
          };
        }
        return {
          ...s,
          losses: s.losses + 1,
          betsLost: s.betsLost + 1,
        };
      });
    },
    [],
  );

  const verifyKyc = useCallback(() => {
    setState((s) => ({ ...s, kycVerified: true }));
  }, []);

  const deposit = useCallback((amount: number) => {
    if (amount <= 0) return;
    setState((s) => ({
      ...s,
      wallet: s.wallet + amount,
      transactions: [
        {
          id: `tx_${Date.now()}`,
          type: "deposit",
          label: "Einzahlung · Apple Pay",
          amount,
          date: nowLabel(),
        },
        ...s.transactions,
      ],
    }));
  }, []);

  const withdraw = useCallback((amount: number) => {
    let ok = false;
    setState((s) => {
      if (amount <= 0 || amount > s.wallet) return s;
      ok = true;
      return {
        ...s,
        wallet: s.wallet - amount,
        transactions: [
          {
            id: `tx_${Date.now()}`,
            type: "withdrawal",
            label: "Auszahlung auf Bankkonto",
            amount: -amount,
            date: nowLabel(),
          },
          ...s.transactions,
        ],
      };
    });
    return ok;
  }, []);

  const acceptFriendRequest = useCallback((id: string) => {
    setState((s) => {
      const req = s.friendRequests.find((r) => r.id === id);
      if (!req) return s;
      return {
        ...s,
        friendRequests: s.friendRequests.filter((r) => r.id !== id),
        friendSlugs: s.friendSlugs.includes(req.slug)
          ? s.friendSlugs
          : [...s.friendSlugs, req.slug],
      };
    });
  }, []);

  const declineFriendRequest = useCallback((id: string) => {
    setState((s) => ({ ...s, friendRequests: s.friendRequests.filter((r) => r.id !== id) }));
  }, []);

  const sendFriendRequest = useCallback((username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;
    setState((s) => ({
      ...s,
      friendRequests: [
        ...s.friendRequests,
        {
          id: `fr_${Date.now()}`,
          slug: trimmed.toLowerCase(),
          name: trimmed,
          direction: "outgoing",
        },
      ],
    }));
  }, []);

  const removeFriend = useCallback((slug: string) => {
    setState((s) => ({ ...s, friendSlugs: s.friendSlugs.filter((f) => f !== slug) }));
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      ...state,
      isFriend,
      placeBet,
      completeDuel,
      verifyKyc,
      deposit,
      withdraw,
      acceptFriendRequest,
      declineFriendRequest,
      sendFriendRequest,
      removeFriend,
    }),
    [
      state,
      isFriend,
      placeBet,
      completeDuel,
      verifyKyc,
      deposit,
      withdraw,
      acceptFriendRequest,
      declineFriendRequest,
      sendFriendRequest,
      removeFriend,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
