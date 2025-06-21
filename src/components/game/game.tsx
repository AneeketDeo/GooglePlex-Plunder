"use client";

import { useState, useEffect, useCallback } from "react";
import { CampusMap } from "@/components/game/campus-map";
import { GameSidebar } from "@/components/game/game-sidebar";
import { TriviaModal } from "@/components/game/trivia-modal";
import { GameStartScreen } from "@/components/game/game-start-screen";
import { GameOverScreen } from "@/components/game/game-over-screen";
import type { Collectible, PlayerPosition, TriviaGate, GameState } from "@/lib/types";
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
  const [gameState, setGameState] = useState<GameState>("START_SCREEN");
  const [mapLayout, setMapLayout] = useState(initialMapLayout);
  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);
  const [collectibles, setCollectibles] = useState(initialCollectibles);
  const [triviaGates, setTriviaGates] = useState(initialTriviaGates);
  const [activeTrivia, setActiveTrivia] = useState<TriviaGate | null>(null);
  const { toast } = useToast();

  const collectedItems = collectibles.filter((c) => c.collected);

  const resetGame = useCallback(() => {
    setMapLayout(initialMapLayout);
    setPlayerPosition(initialPlayerPosition);
    setCollectibles(initialCollectibles);
    setTriviaGates(initialTriviaGates);
    setActiveTrivia(null);
  }, []);

  const handleStartGame = () => {
    resetGame();
    setGameState("PLAYING");
  };

  const handlePlayAgain = () => {
    resetGame();
    setGameState("PLAYING");
  };

  const handleMove = useCallback(
    (dx: number, dy: number) => {
      if (gameState !== 'PLAYING') return;

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
    [playerPosition, mapLayout, triviaGates, gameState]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;
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
  }, [handleMove, gameState]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
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
  }, [playerPosition, collectibles, toast, gameState]);
  
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    if (collectibles.length > 0 && collectedItems.length === collectibles.length) {
      const timer = setTimeout(() => {
        setGameState("GAME_OVER");
      }, 2000); // Allow time for the final toast to be seen
      return () => clearTimeout(timer);
    }
  }, [collectedItems.length, collectibles.length, gameState]);

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

  if (gameState === "START_SCREEN") {
    return <GameStartScreen onStartGame={handleStartGame} />;
  }

  if (gameState === "GAME_OVER") {
    return (
      <GameOverScreen
        score={collectedItems.length}
        total={collectibles.length}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

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
        totalCollectibles={collectibles.length}
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
