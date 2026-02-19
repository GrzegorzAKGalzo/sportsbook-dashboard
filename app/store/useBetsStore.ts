import { create } from "zustand";
import { Match } from "@/app/types/match"; 

export interface Bet {
  match: Match;
  selected: "home" | "draw" | "away";
  odds: number;        
  lockedOdds: number;  
  needsAccept: boolean;
}
type AddBetInput = {
  match: Match;
  selected: "home" | "draw" | "away";
  odds: number;
};
export interface BetsSlip {
  bets: Bet[];
}

interface BetsStore {
  betsSlip: BetsSlip;
 addBet: (bet: AddBetInput) => void;
  removeBet: (matchId: string) => void; 
  clearBets: () => void;
  updateOddsStatus: (matches: Match[]) => void;
  acceptNewOdds: () => void;
}

export const useBetsStore = create<BetsStore>((set) => ({
  betsSlip: { bets: [] },

addBet: ({ match, selected, odds }) =>
  set((state) => {
    const existing = state.betsSlip.bets.find(
      (b) => b.match.id === match.id
    );

    const newBet: Bet = {
      match,
      selected,
      odds,
      lockedOdds: odds,
      needsAccept: false,
    };

    if (existing) {
      return {
        betsSlip: {
          bets: state.betsSlip.bets.map((b) =>
            b.match.id === match.id ? newBet : b
          ),
        },
      };
    }

    return {
      betsSlip: {
        bets: [...state.betsSlip.bets, newBet],
      },
    };
  }),

  removeBet: (matchId) =>
    set((state) => ({
      betsSlip: {
        bets: state.betsSlip.bets.filter((b) => b.match.id !== matchId),
      },
    })),

  clearBets: () => set({ betsSlip: { bets: [] } }),


 updateOddsStatus: (matches) =>
  set((state) => ({
    betsSlip: {
      bets: state.betsSlip.bets.map((bet) => {
        const currentMatch = matches.find(
          (m) => m.id === bet.match.id
        );

        if (!currentMatch) return bet;

        const newOdds = currentMatch.odds[bet.selected];

        if (newOdds !== bet.lockedOdds) {
          return {
            ...bet,
            odds: newOdds,
            needsAccept: true,
          };
        }

        return bet;
      }),
    },
  })),


 acceptNewOdds: () =>
  set((state) => ({
    betsSlip: {
      bets: state.betsSlip.bets.map((bet) => ({
        ...bet,
        lockedOdds: bet.odds,
        needsAccept: false,
      })),
    },
  })),



}));