import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  const categories = {
    individual: {
      ri: 75,
      nri: 25,
    },
    nonIndividual: {
      ri: 60,
      nri: 40,
    },
  }

  return NextResponse.json(categories)
}
