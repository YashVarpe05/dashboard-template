import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const chartData = {
    barChart: [
      {
        name: "Today",
        Individual: 1234,
        "Non-Individual": 567,
      },
      {
        name: "Yesterday",
        Individual: 1098,
        "Non-Individual": 589,
      },
    ],
    pieChart: [
      { name: "Solicited", value: 2456, color: "#3b82f6" },
      { name: "Received", value: 2123, color: "#10b981" },
      { name: "Consumed", value: 1987, color: "#f59e0b" },
      { name: "Pending", value: 136, color: "#ef4444" },
    ],
  }

  return NextResponse.json(chartData)
}
