export type GameStats = {
  game: string;
  played: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  profitLoss: number;
};

export type Opponent = {
  slug: string;
  name: string;
  isFriend: boolean;
  trustScore: number;
  mainGame: string;
  wins: number;
  losses: number;
  headToHeadWins: number;
  headToHeadLosses: number;
  games: GameStats[];
  isTeam?: boolean;
  members?: string[];
};

export const currentUser = {
  name: "Du",
  username: "MaxM",
  email: "max@example.com",
  wallet: 245,
  trustScore: 93,
  wins: 41,
  losses: 14,
  betsWon: 28,
  betsLost: 9,
  mainGame: "FIFA 26",
  kycVerified: false,
  depositLimit: 200,
  lossLimit: 100,
  country: "Deutschland",
  language: "Deutsch",
  linkedAccounts: [
    { platform: "PlayStation", handle: "MaxM_PSN", linked: true },
    { platform: "Xbox", handle: "", linked: false },
    { platform: "Steam", handle: "", linked: false },
  ],
};

export type FriendRequest = {
  id: string;
  slug: string;
  name: string;
  direction: "incoming" | "outgoing";
};

export const friendRequests: FriendRequest[] = [
  { id: "fr1", slug: "hakan62aslan", name: "Hakan62aslan", direction: "incoming" },
];

export type Dispute = {
  id: string;
  opponentSlug: string;
  opponentName: string;
  game: string;
  stake: number;
  status: "open" | "resolved";
  reason: string;
  openedAt: string;
  resolution?: string;
  resolvedInFavorOf?: "you" | "opponent";
};

export const disputes: Dispute[] = [
  {
    id: "d1",
    opponentSlug: "rafael_k",
    opponentName: "Rafael_K",
    game: "FIFA 26",
    stake: 15,
    status: "resolved",
    reason: "Unterschiedliche Ergebnis-Angaben (3:1 vs. 1:3).",
    openedAt: "vor 2 Tagen",
    resolution:
      "Beweisfotos ausgewertet: Endstand 3:1 bestätigt durch Zeitstempel-Foto. Einsatz an dich ausgezahlt, TrustScore von Rafael_K gesenkt.",
    resolvedInFavorOf: "you",
  },
  {
    id: "d2",
    opponentSlug: "teamnova",
    opponentName: "TeamNova",
    game: "Call of Duty",
    stake: 20,
    status: "open",
    reason: "Gegner hat das Ergebnis nicht bestätigt (kein Nachweisfoto vorhanden).",
    openedAt: "vor 3 Std.",
  },
];

export type Transaction = {
  id: string;
  type: "deposit" | "withdrawal" | "win" | "stake" | "bonus";
  label: string;
  amount: number;
  date: string;
};

export const walletTransactions: Transaction[] = [
  { id: "t1", type: "win", label: "Sieg vs. Perino (FIFA 26)", amount: 66, date: "Heute, 14:32" },
  { id: "t2", type: "stake", label: "Einsatz vs. Perino (FIFA 26)", amount: -33, date: "Heute, 14:02" },
  { id: "t3", type: "deposit", label: "Einzahlung · Apple Pay", amount: 100, date: "Gestern, 19:10" },
  { id: "t4", type: "stake", label: "Einsatz vs. TeamNova (COD)", amount: -20, date: "Gestern, 18:40" },
  { id: "t5", type: "withdrawal", label: "Auszahlung auf Bankkonto", amount: -50, date: "Mo., 09:15" },
  { id: "t6", type: "bonus", label: "Willkommensbonus", amount: 25, date: "Mo., 08:00" },
];

export type NotificationItem = {
  id: string;
  type: "duel" | "event" | "friend" | "dispute" | "payout";
  title: string;
  body: string;
  time: string;
  read: boolean;
  href?: string;
};

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    type: "duel",
    title: "Wette angenommen",
    body: "Perino hat deine Herausforderung in FIFA 26 angenommen.",
    time: "vor 5 Min.",
    read: false,
    href: "/duels/perino",
  },
  {
    id: "n2",
    type: "payout",
    title: "Auszahlung bestätigt",
    body: "66€ wurden deinem Guthaben gutgeschrieben.",
    time: "vor 2 Std.",
    read: false,
    href: "/wallet",
  },
  {
    id: "n3",
    type: "event",
    title: "Event startet bald",
    body: "\"Perino vs. Michel_S\" beginnt in 15 Minuten. Bitte bestätigen.",
    time: "vor 3 Std.",
    read: true,
    href: "/events/perino-vs-michel_s",
  },
  {
    id: "n4",
    type: "friend",
    title: "Neue Freundschaftsanfrage",
    body: "Hakan62aslan möchte dich als Freund hinzufügen.",
    time: "gestern",
    read: true,
    href: "/friends",
  },
  {
    id: "n5",
    type: "dispute",
    title: "Streitfall aktualisiert",
    body: "Dein Streitfall zu \"vs. Rafael_K\" wurde entschieden.",
    time: "vor 2 Tagen",
    read: true,
    href: "/disputes/d1",
  },
];

export type EventItem = {
  slug: string;
  title: string;
  game: string;
  playerA: string;
  playerB: string;
  date: string;
  streamUrl: string;
  pot: number;
  bettors: number;
  stakeA: number;
  stakeB: number;
  status: "upcoming" | "live";
};

export const events: EventItem[] = [
  {
    slug: "perino-vs-michel_s",
    title: "Charity Match",
    game: "FIFA 26",
    playerA: "Perino",
    playerB: "Michel_S",
    date: "Sa. 20:00 Uhr",
    streamUrl: "twitch.tv/batme_live",
    pot: 340,
    bettors: 18,
    stakeA: 60,
    stakeB: 40,
    status: "upcoming",
  },
  {
    slug: "teamnova-vs-hakan",
    title: "Derby",
    game: "Call of Duty",
    playerA: "TeamNova",
    playerB: "Hakan62aslan",
    date: "Live jetzt",
    streamUrl: "youtube.com/batme_live",
    pot: 512,
    bettors: 31,
    stakeA: 45,
    stakeB: 55,
    status: "live",
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export const opponents: Opponent[] = [
  {
    slug: "perino",
    name: "Perino",
    isFriend: true,
    trustScore: 96,
    mainGame: "FIFA 26",
    wins: 34,
    losses: 11,
    headToHeadWins: 2,
    headToHeadLosses: 1,
    games: [
      {
        game: "FIFA 26",
        played: 23,
        wins: 17,
        losses: 5,
        draws: 1,
        winRate: 88,
        profitLoss: 27,
      },
      {
        game: "Call of Duty",
        played: 11,
        wins: 6,
        losses: 5,
        draws: 0,
        winRate: 55,
        profitLoss: -8,
      },
    ],
  },
  {
    slug: "hakan62aslan",
    name: "Hakan62aslan",
    isFriend: false,
    trustScore: 91,
    mainGame: "FIFA 26",
    wins: 28,
    losses: 9,
    headToHeadWins: 0,
    headToHeadLosses: 0,
    games: [
      {
        game: "FIFA 26",
        played: 30,
        wins: 22,
        losses: 8,
        draws: 0,
        winRate: 73,
        profitLoss: 64,
      },
    ],
  },
  {
    slug: "teamnova",
    name: "TeamNova",
    isFriend: false,
    trustScore: 76,
    mainGame: "Call of Duty",
    wins: 40,
    losses: 22,
    headToHeadWins: 0,
    headToHeadLosses: 0,
    games: [
      {
        game: "Call of Duty",
        played: 62,
        wins: 40,
        losses: 22,
        draws: 0,
        winRate: 65,
        profitLoss: 120,
      },
    ],
  },
  {
    slug: "michaelle_s",
    name: "Michaelle_S",
    isFriend: true,
    trustScore: 88,
    mainGame: "FIFA 26",
    wins: 15,
    losses: 6,
    headToHeadWins: 1,
    headToHeadLosses: 0,
    games: [
      {
        game: "FIFA 26",
        played: 21,
        wins: 15,
        losses: 6,
        draws: 0,
        winRate: 71,
        profitLoss: 40,
      },
    ],
  },
  {
    slug: "rafael_k",
    name: "Rafael_K",
    isFriend: false,
    trustScore: 64,
    mainGame: "FIFA 26",
    wins: 12,
    losses: 14,
    headToHeadWins: 0,
    headToHeadLosses: 0,
    games: [
      {
        game: "FIFA 26",
        played: 26,
        wins: 12,
        losses: 14,
        draws: 0,
        winRate: 46,
        profitLoss: -35,
      },
    ],
  },
  {
    slug: "team-alpha",
    name: "Team Alpha",
    isFriend: false,
    trustScore: 82,
    mainGame: "Call of Duty",
    wins: 51,
    losses: 19,
    headToHeadWins: 0,
    headToHeadLosses: 0,
    isTeam: true,
    members: ["Kevin_K", "Dennis_R", "Jonas_M"],
    games: [
      {
        game: "Call of Duty",
        played: 70,
        wins: 51,
        losses: 19,
        draws: 0,
        winRate: 73,
        profitLoss: 210,
      },
    ],
  },
  {
    slug: "valkyrie-esports",
    name: "Valkyrie Esports",
    isFriend: false,
    trustScore: 89,
    mainGame: "Call of Duty",
    wins: 33,
    losses: 10,
    headToHeadWins: 0,
    headToHeadLosses: 0,
    isTeam: true,
    members: ["Lara_V", "Sofia_T", "Nadja_P"],
    games: [
      {
        game: "Call of Duty",
        played: 43,
        wins: 33,
        losses: 10,
        draws: 0,
        winRate: 77,
        profitLoss: 165,
      },
    ],
  },
];

export function getOpponent(slug: string) {
  return opponents.find((o) => o.slug === slug);
}

export const frequentFriends = opponents.filter((o) => o.isFriend);
