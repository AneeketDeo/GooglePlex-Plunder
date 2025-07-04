import {
  type Collectible,
  type LeaderboardPlayer,
  type PlayerPosition,
  type TriviaGate,
} from "./types";
import {
  Bot,
  Chrome,
  Mail,
  Map,
  Youtube,
} from "lucide-react";

export const initialMapLayout: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1],
  [1, 2, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 2, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 2, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 2, 1],
  [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
// 0: path, 1: wall, 2: building

export const initialPlayerPosition: PlayerPosition = { x: 7, y: 13 };

export const initialCollectibles: Collectible[] = [
  { id: 1, name: "Google Chrome Logo", position: { x: 4, y: 13 }, collected: false, icon: Chrome },
  { id: 2, name: "Android Bot", position: { x: 1, y: 4 }, collected: false, icon: Bot },
  { id: 3, name: "Gmail Envelope", position: { x: 1, y: 10 }, collected: false, icon: Mail },
  { id: 4, name: "YouTube Play Button", position: { x: 7, y: 3 }, collected: false, icon: Youtube },
  { id: 5, name: "Google Maps Pin", position: { x: 13, y: 6 }, collected: false, icon: Map },
];

export const initialTriviaGates: TriviaGate[] = [
  {
    id: 1,
    position: { x: 7, y: 7 },
    unlocked: false,
    question: "What was Google's original name?",
  },
  {
    id: 2,
    position: { x: 5, y: 7 },
    unlocked: false,
    question: "In what year was Google founded?",
  },
  {
    id: 3,
    position: { x: 9, y: 7 },
    unlocked: false,
    question: "What is the name of Google's parent company?",
  },
];

export const leaderboardData: LeaderboardPlayer[] = [
  { rank: 1, name: "Larry P.", score: 5 },
  { rank: 2, name: "Sergey B.", score: 4 },
  { rank: 3, name: "Sundar P.", score: 3 },
  { rank: 4, name: "New Player", score: 0 },
  { rank: 5, name: "Noogler", score: 0 },
];
