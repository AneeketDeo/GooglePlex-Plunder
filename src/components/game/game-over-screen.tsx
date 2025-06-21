"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type GameOverScreenProps = {
  score: number;
  total: number;
  onPlayAgain: () => void;
  isGenerating?: boolean;
};

export function GameOverScreen({ score, total, onPlayAgain, isGenerating }: GameOverScreenProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
       <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-headline text-primary flex items-center justify-center gap-2">
               <Trophy className="w-10 h-10 text-yellow-500" />
              Game Over!
            </CardTitle>
            <CardDescription className="text-lg pt-2">
             Congratulations, you've plundered the campus!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
             <p className="text-2xl font-bold">
              You collected {score} out of {total} Easter Eggs!
            </p>
            <Button onClick={onPlayAgain} size="lg" className="w-full" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing new game...
                </>
              ) : "Play Again"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
