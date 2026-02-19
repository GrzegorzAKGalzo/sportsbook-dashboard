import {Match} from "@/app/types/match"

export function mapEventsToMatches(data: any[]): Match[]{
    return data.map((event)=>{
        const [homeTeam, awayTeam] = event.eventName.split(" - ")

        const game = event.eventGames.find(
            (g:any) => g.gameName === "1x2"
        )
        

        return{
            id: String(event.eventId),
            league: event.category2Name + " - " +event.category3Name,
            homeTeam,
            awayTeam,
            startTime: event.eventStart,
            odds:{
                 home: game.outcomes[0].outcomeOdds ?? 0,
                 draw: game.outcomes[1].outcomeOdds ?? 0,
                 away: game.outcomes[2].outcomeOdds ?? 0,
            }
        }
    })
}