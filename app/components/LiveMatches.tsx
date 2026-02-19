"use client";

import React, { useEffect, useState } from "react";
import { Match } from "@/app/types/match";
import Bet from "@/app/components/Bet";
import { useBetsStore } from "../store/useBetsStore";

type Props = {
  initialMatches: Match[];
};

function getRandomOdds(odds: number) {
  const delta = Math.random() * 0.4 - 0.2;
  let newOdds = parseFloat((odds + delta).toFixed(2));
  if (newOdds < 1.01) newOdds = 1.01;
  return newOdds;
}

export default function LiveMatches({ initialMatches }: Props) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);

  const updateOddsStatus = useBetsStore((state) => state.updateOddsStatus);

  // 🔹 zmieniamy kursy
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches((prev) =>
        prev.map((match) => {
          if (Math.random() > 0.1) return match;

          const oddsTypes: ("home" | "draw" | "away")[] = [
            "home",
            "draw",
            "away",
          ];

          const randomType =
            oddsTypes[Math.floor(Math.random() * oddsTypes.length)];

          return {
            ...match,
            odds: {
              ...match.odds,
              [randomType]: getRandomOdds(match.odds[randomType]),
            },
          };
        }),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateOddsStatus(matches);
  }, [matches, updateOddsStatus]);

  return (
    <div className="flex flex-col gap-6">
      {matches.map((match) => (
        <Bet key={match.id} match={match} />
      ))}
    </div>
  );
}
