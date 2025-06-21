import type { LucideIcon } from "lucide-react";

export type PlayerPosition = {
  x: number;
  y: number;
};

export type Collectible = {
  id: number;
  name: string;
  position: PlayerPosition;
  collected: boolean;
  icon: LucideIcon;
};

export type TriviaGate = {
  id: number;
  position: PlayerPosition;
  unlocked: boolean;
  question: string;
};

export type LeaderboardPlayer = {
  rank: number;
  name: string;
  score: number;
};

export type CampusMapProps = {
  layout: number[][];
  playerPosition: PlayerPosition;
  collectibles: Collectible[];
  triviaGates: TriviaGate[];
};

export type GameSidebarProps = {
  collectedItems: Collectible[];
  leaderboard: LeaderboardPlayer[];
  onMove: (dx: number, dy: number) => void;
};
