"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { SeveritiesResponse } from "@/store/api"

const chartConfig = {
  count: {
    label: "Count",
  },
  chrome: {
    label: "Normal",
    color: "#1CA240",
  },
  safari: {
    label: "Moderate",
    color: "#CBD90B",
  },
  firefox: {
    label: "Severe",
    color: "#F48845",
  },
  edge: {
    label: "Crtical",
    color: "#E90D0D",
  },
  other: {
    label: "Missed Points",
    color: "#A8A8A8",
  },
} satisfies ChartConfig

export function BarCharts({ data } : SeveritiesResponse) {

  const severityColors: Record<string, string> = {
    Normal: "var(--color-chrome)",
    Moderate: "var(--color-safari)",
    Severe: "var(--color-firefox)",
    Critical: "var(--color-edge)",
    "Missed Points": "var(--color-other)",
  };

  const chartData = data.map((item) => ({
    severity: item.severity,
    count: item.count,
    fill: severityColors[item.severity] || "var(--color-default)",
  }));

  return (
    <Card className="md:w-1/2 w-full shadow-lg">
      <CardHeader>
        <CardTitle>Bar Chart - Severity</CardTitle>
        <CardDescription>All - Time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <YAxis
              dataKey="severity"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />

            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing Severity of all Equipments <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Severities
        </div>
      </CardFooter>
    </Card>
  )
}
