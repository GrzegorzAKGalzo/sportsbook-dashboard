"use client";
import BetFinalization from "./BetFinalization";
import BetSlip from "./BetSlip";
import { useBetsStore } from "../store/useBetsStore";
import React, { useState } from "react";

export default function BetBasket() {
  const clearBets = useBetsStore((state) => state.clearBets);
  const bets = useBetsStore((state) => state.betsSlip.bets);
  const betsSum = bets.length;
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleBetsRemoval = () => {
    if (confirm("Czy na pewno chcesz usuąć swoje zakłady?")) clearBets();
  };

  return (
    <>
      {/* ================= Desktop / md+ ================= */}
      <div className="hidden md:flex flex-col">
        <div className="relative bg-primary text-center rounded-sm p-3 items-start">
          <h2 className="uppercase text-white">
            Kupon <span className="text-orange-400">({betsSum})</span>
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            stroke="#fff"
            onClick={handleBetsRemoval}
            viewBox="-3 0 32 32"
            className="w-5 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:scale-110 transition-all"
          >
            <title>{"Usuń zakłady"}</title>
            <path
              fill="#fff"
              fillRule="evenodd"
              stroke="none"
              d="M7 15a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15Zm5 0a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15Zm5 0a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15ZM2 28a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V12H2v16ZM16 4h-6V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1Zm8 0h-6V2a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v2a2 2 0 0 0 1.999 2h22.003A2 2 0 0 0 26 8V6a2 2 0 0 0-2-2Z"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2 mt-2 h-full">
          <BetSlip />
        </div>

        <BetFinalization />
      </div>

      {/* ================= Mobile / sm ================= */}
      <div className="md:hidden">
        {/* Przycisk rozwijania */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleToggle}
            className="bg-primary text-white rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform"
          >
            Kupon ({betsSum})
          </button>
        </div>

        {/* Overlay */}
        <div
          className={`
            fixed bottom-0 left-0 w-full bg-white shadow-xl transition-transform duration-300 z-40
            ${open ? "translate-y-0" : "translate-y-full"}
          `}
          style={{ maxHeight: "90vh" }}
        >
          <div className="flex flex-col h-full">
            <div className="relative bg-primary text-center rounded-t-sm p-3 items-start ">
              <h2 className="uppercase text-white">
                Kupon <span className="text-orange-400">({betsSum})</span>
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                stroke="#fff"
                onClick={handleBetsRemoval}
                viewBox="-3 0 32 32"
                className="w-5 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:scale-110 transition-all"
              >
                <title>{"Usuń zakłady"}</title>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  stroke="none"
                  d="M7 15a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15Zm5 0a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15Zm5 0a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15ZM2 28a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V12H2v16ZM16 4h-6V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1Zm8 0h-6V2a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v2a2 2 0 0 0 1.999 2h22.003A2 2 0 0 0 26 8V6a2 2 0 0 0-2-2Z"
                />
              </svg>
            </div>

            <div
              className="flex flex-col gap-2 mt-2 overflow-y-scroll px-2"
              style={{ maxHeight: "30vh" }}
            >
              <BetSlip />
            </div>

            <div className="px-2 pb-4">
              <BetFinalization />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
