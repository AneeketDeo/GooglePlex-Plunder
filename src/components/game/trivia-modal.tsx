"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { answerTrivia, AnswerTriviaOutput } from "@/ai/flows/answer-trivia";
import { motion, AnimatePresence } from "framer-motion";

type TriviaModalProps = {
  gate: {
    id: number;
    question: string;
  };
  onClose: () => void;
  onSuccess: (gateId: number) => void;
};

export function TriviaModal({ gate, onClose, onSuccess }: TriviaModalProps) {
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<AnswerTriviaOutput | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer) return;

    startTransition(async () => {
      const res = await answerTrivia({
        question: gate.question,
        answer: answer,
      });
      setResult(res);
      if (res.isCorrect) {
        setTimeout(() => onSuccess(gate.id), 2000);
      }
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">
            Trivia Challenge
          </DialogTitle>
          <DialogDescription>{gate.question}</DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Input
                id="answer"
                placeholder="Your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                autoComplete="off"
                disabled={isPending}
              />
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending || !answer}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Answer
                </Button>
              </DialogFooter>
            </motion.form>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Alert variant={result.isCorrect ? "default" : "destructive"} className={result.isCorrect ? "border-green-500/50 bg-green-500/10" : ""}>
                {result.isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-accent" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <AlertTitle className={result.isCorrect ? "text-accent" : "text-destructive"}>
                  {result.isCorrect ? "Correct!" : "Not Quite..."}
                </AlertTitle>
                <AlertDescription>{result.explanation}</AlertDescription>
              </Alert>
              <DialogFooter className="mt-4">
                 <Button onClick={onClose}>
                  {result.isCorrect ? "Continue" : "Try Again Later"}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
