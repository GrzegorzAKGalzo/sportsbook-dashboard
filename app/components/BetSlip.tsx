"use client";

import React from "react";
import { useBetsStore } from "../store/useBetsStore";
import { formatMatchDate } from "../lib/formatDate";

export default function BetSlip() {
  const bets = useBetsStore((state) => state.betsSlip.bets);
  const removeBet = useBetsStore((state) => state.removeBet);

  if (bets.length === 0) {
    return (
      <div className="bg-white/70 text-primary p-2 rounded-sm border border-slate-200">
        <p className="text-sm text-gray-500">Brak zakładów w kuponie</p>
      </div>
    );
  }

  const handleBetRemoval = (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć zakład?")) removeBet(id);
  };

  return (
    <div className=" text-primary rounded-sm space-y-3">
      {bets.map((bet) => {
        const { match, odds } = bet;
        const { time, date } = formatMatchDate(match.startTime);
        let selectedTeam = "";
        if (odds === match.odds.home) selectedTeam = match.homeTeam;
        else if (odds === match.odds.away) selectedTeam = match.awayTeam;
        else selectedTeam = "Remis";

        return (
          <div
            key={match.id}
            className="bg-white/70 p-2 border border-slate-200 rounded-sm"
          >
            <div className="flex justify-between items-start items-top">
              <div>
                <span className="font-bold">{selectedTeam}</span> <br />
                <span className="text-sm">1x2</span>
              </div>
              <div className="flex items-start">
                <span className="bg-primary rounded-full text-white font-bold text-sm px-2 py-1 mr-2">
                  {odds.toFixed(2)}
                </span>
                <button
                  className="font-bold hover:text-red-500 hover:cursor-pointer"
                  onClick={() => handleBetRemoval(match.id)}
                >
                  x
                </button>
              </div>
            </div>

            <hr className="my-1 text-black/10" />

            <p className="text-sm font-bold">
              {match.homeTeam} - {match.awayTeam}
            </p>
            <div className="flex justify-between text-sm">
              <div>Piłka nożna - {match.league}</div>
              <div>
                {time} | {date}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
