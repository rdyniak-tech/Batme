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
};

export const currentUser = {
  name: "Du",
  wallet: 245,
};

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
];

export function getOpponent(slug: string) {
  return opponents.find((o) => o.slug === slug);
}

export const frequentFriends = opponents.filter((o) => o.isFriend);
