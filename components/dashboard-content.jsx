"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown, Calendar, FileText, CheckCircle, Clock, AlertCircle, FileX } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useDashboardData } from "@/hooks/use-dashboard-data"

export function DashboardContent() {
  const [viewType, setViewType] = useState("individual")
  const [timeRange, setTimeRange] = useState("today")
  const { stats, charts, categories, loading, error } = useDashboardData()

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading dashboard data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">KYC Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* View Type Toggle */}
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-36 md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="non-individual">Non-Individual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Time Range Tabs */}
      <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="today" className="text-xs md:text-sm">
            Today
          </TabsTrigger>
          <TabsTrigger value="month" className="text-xs md:text-sm">
            This Month
          </TabsTrigger>
          <TabsTrigger value="custom" className="text-xs md:text-sm">
            Custom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 md:space-y-6">
          <DashboardCards viewType={viewType} stats={stats} charts={charts} categories={categories} loading={loading} />
        </TabsContent>
        <TabsContent value="month" className="space-y-4 md:space-y-6">
          <DashboardCards viewType={viewType} stats={stats} charts={charts} categories={categories} loading={loading} />
        </TabsContent>
        <TabsContent value="custom" className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="sm" className="transition-all hover:scale-105 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Select Date Range
            </Button>
          </div>
          <DashboardCards viewType={viewType} stats={stats} charts={charts} categories={categories} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardCards({ viewType, stats, charts, categories, loading }: any) {
  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Total KYCs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="transition-all hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New KYC</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.newKyc.count.toLocaleString()}</div>
            <div
              className={`flex items-center text-xs ${stats?.newKyc.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stats?.newKyc.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {stats?.newKyc.trend === "up" ? "+" : ""}
              {stats?.newKyc.change}% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modified KYC</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.modifiedKyc.count.toLocaleString()}</div>
            <div
              className={`flex items-center text-xs ${stats?.modifiedKyc.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stats?.modifiedKyc.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {stats?.modifiedKyc.trend === "up" ? "+" : ""}
              {stats?.modifiedKyc.change}% from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced chart card with better mobile responsiveness */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Individual vs Non-Individual Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.barChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Individual" fill="#3b82f6" name="Individual" />
                <Bar dataKey="Non-Individual" fill="#10b981" name="Non-Individual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Improved status cards grid for mobile */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-4">KYC Status Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          <StatusCard
            title="KYC Initiated"
            count={stats?.statusCounts.initiated}
            icon={<FileText className="h-5 w-5" />}
            color="blue"
          />
          <StatusCard
            title="Under Process"
            count={stats?.statusCounts.underProcess}
            icon={<Clock className="h-5 w-5" />}
            color="yellow"
          />
          <StatusCard
            title="Registered"
            count={stats?.statusCounts.registered}
            icon={<CheckCircle className="h-5 w-5" />}
            color="green"
          />
          <StatusCard
            title="Validated"
            count={stats?.statusCounts.validated}
            icon={<CheckCircle className="h-5 w-5" />}
            color="green"
          />
          <StatusCard
            title="Hold"
            count={stats?.statusCounts.hold}
            icon={<AlertCircle className="h-5 w-5" />}
            color="orange"
          />
          <StatusCard
            title="Docs Pending"
            count={stats?.statusCounts.docsPending}
            icon={<FileX className="h-5 w-5" />}
            color="red"
          />
        </div>
      </div>

      {/* Updated categories with dynamic progress data */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Individual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>RI (Resident Indian)</span>
                  <span>{categories?.individual.ri}%</span>
                </div>
                <Progress value={categories?.individual.ri} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>NRI (Non-Resident Indian)</span>
                  <span>{categories?.individual.nri}%</span>
                </div>
                <Progress value={categories?.individual.nri} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Non-Individual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>RI (Resident Indian)</span>
                  <span>{categories?.nonIndividual.ri}%</span>
                </div>
                <Progress value={categories?.nonIndividual.ri} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>NRI (Non-Resident Indian)</span>
                  <span>{categories?.nonIndividual.nri}%</span>
                </div>
                <Progress value={categories?.nonIndividual.nri} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced pie chart section with better mobile layout */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-4">Solicited & Unsolicited</h2>
        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">PAN Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={charts?.pieChart}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {charts?.pieChart.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                {charts?.pieChart.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Improved PAN stats grid for mobile */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-4">PAN & Data Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="transition-all hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">PANs Solicited</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stats?.panStats.solicited.total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                With Image: {stats?.panStats.solicited.withImage.toLocaleString()} | Without:{" "}
                {stats?.panStats.solicited.withoutImage.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">PANs Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stats?.panStats.received.total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                With Image: {stats?.panStats.received.withImage.toLocaleString()} | Without:{" "}
                {stats?.panStats.received.withoutImage.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">PANs Consumed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stats?.panStats.consumed.total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Processing completed</div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">PANs Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stats?.panStats.pending.total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Awaiting processing</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 md:h-80 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

interface StatusCardProps {
  title: string
  count: number
  icon: React.ReactNode
  color: "blue" | "yellow" | "green" | "orange" | "red"
}

function StatusCard({ title, count, icon, color }: StatusCardProps) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
    yellow: "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
    green: "text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
    orange: "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800",
    red: "text-red-600 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
  }

  return (
    <Card className={`${colorClasses[color]} border-2 transition-all hover:shadow-lg hover:scale-[1.02]`}>
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-lg md:text-2xl font-bold">{count?.toLocaleString()}</p>
          </div>
          <div className={`p-2 rounded-full ${colorClasses[color]}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
