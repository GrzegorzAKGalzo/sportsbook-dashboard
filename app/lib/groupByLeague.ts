import { Match } from "../types/match"

export function groupMatchesByLeague(matches: Match[]) {
  return matches.reduce<Record<string, Match[]>>((acc, match) => {
    if (!acc[match.league]) {
      acc[match.league] = []
    }

    acc[match.league].push(match)

    return acc
  }, {})
}