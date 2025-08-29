'use client';

import { useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"; // shadcn/ui
import { StatDataPoint } from "@/types/stat-data-point";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  drinks: {
    label: "Drinks",
    color: "var(--primary)",
  },
} satisfies ChartConfig

// Interval options
const INTERVALS = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
];

export default function StatChart({ history } : { history : StatDataPoint[] }) {
  const [selectedInterval, setSelectedInterval] = useState(INTERVALS[0]);

  // Generate daily counts
  const chartData = useMemo(() => {
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - selectedInterval.days + 1);
    startDate.setHours(0, 0, 0, 0);

    // Initialize an array with all dates in the interval
    const data: { date: string; drinks: number }[] = [];
    for (let i = 0; i < selectedInterval.days; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      data.push({ date: day.toISOString().slice(0, 10), drinks: 0 });
    }

    // Count drinks per day
    history.forEach(entry => {
      const entryDate = new Date(entry.drunk_at);
      entryDate.setHours(0, 0, 0, 0);
      const index = Math.floor((entryDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (index >= 0 && index < data.length) {
        data[index].drinks += 1;
      }
    });

    return data;
  }, [history, selectedInterval]);

  return (
    <div className="w-80 md:w-200 bg-white rounded-lg">
      {/* Interval selector */}
      <div className="flex flex-row gap-2 items-center justify-center flex-wrap mb-4">
        {INTERVALS.map(interval => (
          <Button
            key={interval.days}
            variant={interval.days === selectedInterval.days ? "default" : "outline"}
            onClick={() => setSelectedInterval(interval)}
          >
            {interval.label}
          </Button>
        ))}
      </div>

      <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => 
                new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
                dataKey="drinks"
                type="monotone"
                fill="var(--primary)"
                fillOpacity={0.25}
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
            />
          </AreaChart>
        </ChartContainer>
    </div>
  );
}
