"use client";

import { useState, useEffect, useCallback } from "react";
import { CampusMap } from "@/components/game/campus-map";
import { GameSidebar } from "@/components/game/game-sidebar";
import { TriviaModal } from "@/components/game/trivia-modal";
import type { Collectible, PlayerPosition, TriviaGate } from "@/lib/types";
import {
  initialCollectibles,
  initialMapLayout,
  initialPlayerPosition,
  initialTriviaGates,
  leaderboardData,
} from "@/lib/game-data";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

export function Game() {
  const [mapLayout, setMapLayout] = useState(initialMapLayout);
  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);
  const [collectibles, setCollectibles] = useState(initialCollectibles);
  const [triviaGates, setTriviaGates] = useState(initialTriviaGates);
  const [activeTrivia, setActiveTrivia] = useState<TriviaGate | null>(null);
  const { toast } = useToast();

  const collectedItems = collectibles.filter((c) => c.collected);

  const handleMove = useCallback(
    (dx: number, dy: number) => {
      const newPos = {
        x: playerPosition.x + dx,
        y: playerPosition.y + dy,
      };

      if (
        newPos.y < 0 ||
        newPos.y >= mapLayout.length ||
        newPos.x < 0 ||
        newPos.x >= mapLayout[0].length
      ) {
        return;
      }

      const targetCell = mapLayout[newPos.y][newPos.x];
      if (targetCell === 1) return; // Wall

      const triviaGate = triviaGates.find(
        (g) => g.position.x === newPos.x && g.position.y === newPos.y
      );
      if (triviaGate && !triviaGate.unlocked) {
        setActiveTrivia(triviaGate);
        return;
      }

      setPlayerPosition(newPos);
    },
    [playerPosition, mapLayout, triviaGates]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleMove(0, -1);
          break;
        case "ArrowDown":
          handleMove(0, 1);
          break;
        case "ArrowLeft":
          handleMove(-1, 0);
          break;
        case "ArrowRight":
          handleMove(1, 0);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove]);

  useEffect(() => {
    const collectible = collectibles.find(
      (c) =>
        c.position.x === playerPosition.x &&
        c.position.y === playerPosition.y &&
        !c.collected
    );
    if (collectible) {
      setCollectibles((prev) =>
        prev.map((c) =>
          c.id === collectible.id ? { ...c, collected: true } : c
        )
      );
      toast({
        title: "Easter Egg Found!",
        description: `You collected the ${collectible.name}.`,
        action: <CheckCircle2 className="text-green-500" />,
      });
    }
  }, [playerPosition, collectibles, toast]);

  const handleTriviaSuccess = (gateId: number) => {
    setTriviaGates((prev) =>
      prev.map((gate) =>
        gate.id === gateId ? { ...gate, unlocked: true } : gate
      )
    );
    const gate = triviaGates.find((g) => g.id === gateId);
    if (gate) {
      setMapLayout((prevLayout) => {
        const newLayout = prevLayout.map((row) => [...row]);
        newLayout[gate.position.y][gate.position.x] = 0; // Unlock path
        return newLayout;
      });
      setPlayerPosition(gate.position);
    }
    setActiveTrivia(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background font-body overflow-hidden">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 transition-all duration-300">
        <CampusMap
          layout={mapLayout}
          playerPosition={playerPosition}
          collectibles={collectibles}
          triviaGates={triviaGates}
        />
      </main>
      <GameSidebar
        collectedItems={collectedItems}
        leaderboard={leaderboardData}
        onMove={handleMove}
      />
      {activeTrivia && (
        <TriviaModal
          gate={activeTrivia}
          onClose={() => setActiveTrivia(null)}
          onSuccess={handleTriviaSuccess}
        />
      )}
    </div>
  );
}
