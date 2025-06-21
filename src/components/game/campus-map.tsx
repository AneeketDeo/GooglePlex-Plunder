"use client";

import { motion } from "framer-motion";
import {
  Package,
  KeyRound,
  User,
  Trees,
  Building,
  Waypoints,
} from "lucide-react";
import type { CampusMapProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const TILE_COMPONENTS: { [key: number]: React.ReactNode } = {
  0: <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>, // Path
  1: <Trees className="w-full h-full text-green-700 bg-green-200 dark:bg-green-900 dark:text-green-500 p-1" />, // Wall/Boundary
  2: <Building className="w-full h-full text-gray-500 bg-gray-300 dark:bg-gray-800 dark:text-gray-400 p-1" />, // Building
};

export function CampusMap({
  layout,
  playerPosition,
  collectibles,
  triviaGates,
}: CampusMapProps) {
  return (
    <div
      className="grid border-2 border-primary/20 bg-background rounded-lg shadow-xl overflow-hidden max-w-full max-h-full aspect-square"
      style={{
        gridTemplateColumns: `repeat(${layout[0].length}, minmax(0, 1fr))`,
      }}
    >
      {layout.map((row, y) =>
        row.map((tile, x) => {
          const isPlayerPosition = playerPosition.x === x && playerPosition.y === y;
          const collectible = collectibles.find(
            (c) => c.position.x === x && c.position.y === y && !c.collected
          );
          const triviaGate = triviaGates.find(
            (g) => g.position.x === x && g.position.y === y
          );

          return (
            <div
              key={`${x}-${y}`}
              className="relative flex items-center justify-center border-t border-l border-primary/10"
            >
              {TILE_COMPONENTS[tile] || TILE_COMPONENTS[0]}
              {collectible && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute z-10"
                >
                  <Package className="w-3/4 h-3/4 text-yellow-500 animate-pulse" />
                </motion.div>
              )}
              {triviaGate && (
                <div className="absolute z-10">
                  <KeyRound
                    className={cn(
                      "w-3/4 h-3/4 text-red-500",
                      triviaGate.unlocked && "opacity-30"
                    )}
                  />
                </div>
              )}
              {isPlayerPosition && (
                <motion.div
                  layoutId="player"
                  className="absolute z-20 bg-primary rounded-full p-1 shadow-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <User className="w-full h-full text-primary-foreground" />
                </motion.div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
