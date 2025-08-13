"use client"

import { useState, useEffect } from "react"

export function useDashboardData() {
  const [stats, setStats] = useState(null)
  const [charts, setCharts] = useState(null)
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
