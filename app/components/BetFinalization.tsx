"use client";

import React, { useState, useMemo } from "react";
import { useBetsStore } from "../store/useBetsStore";
import BetTabs from "../components/BetTabs";

export default function BetFinalization() {
  const bets = useBetsStore((state) => state.betsSlip.bets);
  const [stake, setStake] = useState<number>(0);
  const acceptNewOdds = useBetsStore((state) => state.acceptNewOdds);
  const hasChanges = bets.some((bet) => bet.needsAccept);

  const totalOdds = useMemo(() => {
    if (bets.length === 0) return 0;
    return bets.reduce((sum, bet) => sum + bet.odds, 0);
  }, [bets]);

  const possibleWin = useMemo(() => {
    return stake * totalOdds;
  }, [stake, totalOdds]);

  return (
    <div className="sticky bottom-0">
      <BetTabs />
      {/* Finalizacja kuponu */}
      <div className="bg-white text-primary px-2 flex flex-col gap-3 pt-5 text-sm">
        <div className="flex flex-row justify-between items-center gap-10">
          Stawka
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full max-w-xs sm:max-w-sm">
            <input
              type="number"
              placeholder="0.00"
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              className="flex-1 px-3 py-2 outline-none min-w-0"
            />
            <span className="px-3 py-2 text-gray-700 whitespace-nowrap">
              EUR
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          Kurs Całkowity
          <span className="bg-primary rounded-full text-white font-bold text-sm px-2 py-1 mr-2">
            {totalOdds.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-row justify-between">
          Możliwa wygrana
          <span className="font-bold">{possibleWin.toFixed(2)} EUR</span>
        </div>
        {/* Przycisk akceptacji nowych kursów */}
        {hasChanges && (
          <button
            onClick={acceptNewOdds}
            className="bg-primary hover:bg-indigo-900 text-white rounded-xl py-3 text-md mb-3 font-bold transition cursor-pointer"
          >
            AKCEPTUJĘ NOWE KURSY
          </button>
        )}
        <button
          disabled={hasChanges}
          className={`w-full py-3 rounded-xl font-bold transition
        ${
          hasChanges
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary rounded-xl text-white py-3 text-md mb-3"
        }`}
        >
          {hasChanges ? "Zaakceptuj zmiany kursów" : "POSTAW ZAKŁAD"}
        </button>
      </div>
    </div>
  );
}
