"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

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

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  analysis: {
    label: "Analysis",
    color: "#b70000",
  },
  submitted: {
    label: "Submitted",
    color: "#22C55E",
  },
  analysed: {
    label: "Analysed",
    color: "#F97316",
  },
  reviewed: {
    label: "Reviewed",
    color: "#EAB308",
  },
} satisfies ChartConfig

export function PieCharts({chartDatas}: {chartDatas: string[]}) {
  const statusColors: { [key: string]: string } = {
    "Submitted": "var(--color-submitted)",
    "Analysed": "var(--color-analysed)",
    "Reviewed": "var(--color-reviewed)",
    "Analysis": "var(--color-analysis)",
  }

  const statusCount = chartDatas.reduce((acc, status) => {
    const cleanStatus = status.replace("Report ", "").replace("Being ", "").replace("Waiting for ","");
    acc[cleanStatus] = (acc[cleanStatus] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = Object.entries(statusCount).map(([status, count]) => ({
    browser: status.toLowerCase().replace(/\s+/g, ''), 
    visitors: count,
    fill: statusColors[status] || "var(--color-default)", 
  }));
  

  return (
    <Card className="flex flex-col md:w-1/2 w-full shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut Active</CardTitle>
        <CardDescription>All - Time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Status statistics of all client <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing client status
        </div>
      </CardFooter>
    </Card>
  )
}
