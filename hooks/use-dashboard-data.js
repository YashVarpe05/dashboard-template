"use client"

import { useState, useEffect } from "react"

interface DashboardStats {
  newKyc: {
    count: number
    change: number
    trend: "up" | "down"
  }
  modifiedKyc: {
    count: number
    change: number
    trend: "up" | "down"
  }
  statusCounts: {
    initiated: number
    underProcess: number
    registered: number
    validated: number
    hold: number
    docsPending: number
  }
  panStats: {
    solicited: { total: number; withImage: number; withoutImage: number }
    received: { total: number; withImage: number; withoutImage: number }
    consumed: { total: number }
    pending: { total: number }
  }
}

interface ChartData {
  barChart: Array<{
    name: string
    Individual: number
    "Non-Individual": number
  }>
  pieChart: Array<{
    name: string
    value: number
    color: string
  }>
}

interface CategoryData {
  individual: {
    ri: number
    nri: number
  }
  nonIndividual: {
    ri: number
    nri: number
  }
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [charts, setCharts] = useState<ChartData | null>(null)
  const [categories, setCategories] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const [statsRes, chartsRes, categoriesRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/dashboard/charts"),
          fetch("/api/dashboard/categories"),
        ])

        if (!statsRes.ok || !chartsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch dashboard data")
        }

        const [statsData, chartsData, categoriesData] = await Promise.all([
          statsRes.json(),
          chartsRes.json(),
          categoriesRes.json(),
        ])

        setStats(statsData)
        setCharts(chartsData)
        setCategories(categoriesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { stats, charts, categories, loading, error }
}
