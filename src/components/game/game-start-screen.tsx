"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

type GameStartScreenProps = {
  onStartGame: () => void;
};

export function GameStartScreen({ onStartGame }: GameStartScreenProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-headline text-primary flex items-center justify-center gap-2">
              <Gamepad2 className="w-10 h-10" />
              Googleplex Plunder
            </CardTitle>
            <CardDescription className="text-lg pt-2">
              An epic adventure to find hidden treasures on the Google campus!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <p className="text-muted-foreground">
              Navigate the map using your arrow keys, solve trivia to unlock new areas, and collect all the Google-themed Easter Eggs.
            </p>
            <Button onClick={onStartGame} size="lg" className="w-full">
              Start Game
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
