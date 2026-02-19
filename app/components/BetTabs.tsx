"use client";

import React from "react";
import { create } from "zustand";

interface TabStore {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  selectedTab: "Akumulator",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

const BetTabs = () => {
  const { selectedTab, setSelectedTab } = useTabStore();

  const tabs = ["Prosty", "Akumulator", "Systemowy"];

  return (
    <div className="bg-indigo-100/60 text-primary flex justify-evenly text-sm backdrop-blur-sm">
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`py-2 px-3 cursor-pointer ${
            selectedTab === tab ? "bg-white font-bold rounded-t-md" : ""
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default BetTabs;
