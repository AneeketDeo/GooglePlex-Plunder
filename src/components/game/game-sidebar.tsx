"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GameSidebarProps } from "@/lib/types";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Gift,
  Trophy,
  Gamepad2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function GameSidebar({
  collectedItems,
  leaderboard,
  onMove,
  totalCollectibles,
}: GameSidebarProps) {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-secondary/30 dark:bg-card flex flex-col p-4 gap-4 border-l-0 md:border-l-2 border-primary/10 h-auto md:h-screen">
      <Card className="flex-shrink-0">
        <CardHeader>
          <CardTitle className="font-headline text-primary flex items-center gap-2">
            <Gamepad2 />
            Googleplex Plunder
          </CardTitle>
          <CardDescription>
            Explore the campus and find all the Easter Eggs!
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="flex-grow flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Gift className="text-accent" />
            Collected Items
          </CardTitle>
          <CardDescription>
            {collectedItems.length} / {totalCollectibles} found
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <ul className="space-y-2 pr-4">
              {collectedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-2 bg-background rounded-md shadow-sm"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{item.name}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Separator />

      <div className="md:hidden">
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-2 w-48">
              <div></div>
              <Button size="icon" variant="outline" onClick={() => onMove(0, -1)} aria-label="Move Up"><ArrowUp /></Button>
              <div></div>
              <Button size="icon" variant="outline" onClick={() => onMove(-1, 0)} aria-label="Move Left"><ArrowLeft /></Button>
              <Button size="icon" variant="outline" onClick={() => onMove(0, 1)} aria-label="Move Down"><ArrowDown /></Button>
              <Button size="icon" variant="outline" onClick={() => onMove(1, 0)} aria-label="Move Right"><ArrowRight /></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-shrink-0">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell className="font-medium">{player.rank}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell className="text-right">{player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </aside>
  );
}
