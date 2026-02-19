import rawData from "@/app/lib/mock/betting_dashboard_data.json"


export async function GET() {
    return Response.json(rawData)
}