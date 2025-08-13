import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const stats = {
    newKyc: {
      count: 1234,
      change: 12.5,
      trend: "up",
    },
    modifiedKyc: {
      count: 567,
      change: -3.2,
      trend: "down",
    },
    statusCounts: {
      initiated: 892,
      underProcess: 456,
      registered: 234,
      validated: 178,
      hold: 89,
      docsPending: 123,
    },
    panStats: {
      solicited: { total: 2456, withImage: 1890, withoutImage: 566 },
      received: { total: 2123, withImage: 1678, withoutImage: 445 },
      consumed: { total: 1987 },
      pending: { total: 136 },
    },
  }

  return NextResponse.json(stats)
}
