"use client";

import { formatMatchDate } from "../lib/formatDate";
import { Match } from "../types/match";
import { useBetsStore } from "../store/useBetsStore";
import React, { useEffect, useState } from "react";

interface BetProps {
  match: Match;
}

function Bet({ match }: BetProps) {
  console.log(`Render Bet: ${match.homeTeam} - ${match.awayTeam}`);
  const { time, date } = formatMatchDate(match.startTime);
  const addBet = useBetsStore((state) => state.addBet);
  const bets = useBetsStore((state) => state.betsSlip.bets);

  const [prevOdds, setPrevOdds] = useState(match.odds);
  const [flash, setFlash] = useState<{
    home?: "up" | "down";
    draw?: "up" | "down";
    away?: "up" | "down";
  }>({});

  useEffect(() => {
    const newFlash: typeof flash = {};

    if (match.odds.home > prevOdds.home) newFlash.home = "up";
    else if (match.odds.home < prevOdds.home) newFlash.home = "down";

    if (match.odds.draw > prevOdds.draw) newFlash.draw = "up";
    else if (match.odds.draw < prevOdds.draw) newFlash.draw = "down";

    if (match.odds.away > prevOdds.away) newFlash.away = "up";
    else if (match.odds.away < prevOdds.away) newFlash.away = "down";

    if (Object.keys(newFlash).length > 0) {
      setFlash(newFlash);

      setTimeout(() => {
        setFlash({});
      }, 800);
    }

    setPrevOdds(match.odds);
  }, [match.odds]);

  const selectedOdds = bets.find((b) => b.match.id === match.id)?.odds;

  const getOddsClass = (type: "home" | "draw" | "away", odds: number) => {
    const base =
      "rounded-md text-center flex justify-center items-center cursor-pointer transition-all duration-300";

    const selected = "bg-primary font-bold text-white";
    const normal = "bg-blue-700/10 hover:bg-blue-700/20";

    const flashUp = "bg-green-400 text-white";
    const flashDown = "bg-red-400 text-white";

    if (selectedOdds === odds) return `${base} ${selected}`;

    if (flash[type] === "up") return `${base} ${flashUp}`;
    if (flash[type] === "down") return `${base} ${flashDown}`;

    return `${base} ${normal}`;
  };

  return (
    <div className="bet grid grid-cols-4 md:grid-cols-9 text-primary gap-2 pb-5">
      <div className="text-sm">
        {time} <br /> {date}
      </div>

      <div className="col-span-4 font-bold text-right md:text-left">
        {match.homeTeam} <br /> {match.awayTeam}
      </div>

      <div
        className={getOddsClass("home", match.odds.home)}
        onClick={() =>
          addBet({ match, selected: "home", odds: match.odds.home })
        }
      >
        {match.odds.home}
      </div>

      <div
        className={getOddsClass("draw", match.odds.draw)}
        onClick={() =>
          addBet({ match, selected: "draw", odds: match.odds.draw })
        }
      >
        {match.odds.draw}
      </div>

      <div
        className={getOddsClass("away", match.odds.away)}
        onClick={() =>
          addBet({ match, selected: "away", odds: match.odds.away })
        }
      >
        {match.odds.away}
      </div>

      <div className="border rounded-md text-center flex justify-center items-center">
        59+
      </div>
    </div>
  );
}

export default React.memo(Bet, (prevProps, nextProps) => {
  return (
    prevProps.match.id === nextProps.match.id &&
    prevProps.match.odds.home === nextProps.match.odds.home &&
    prevProps.match.odds.draw === nextProps.match.odds.draw &&
    prevProps.match.odds.away === nextProps.match.odds.away
  );
});
