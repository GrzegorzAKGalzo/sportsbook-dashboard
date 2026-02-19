export interface Match{
    id: string
    league: string
    homeTeam: string
    awayTeam: string
    startTime: number
    odds: {
        home: number
        draw: number
        away: number
    }
}