"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import { useUser } from "@/features/user/hooks/use-user";

const chartConfig = {
  storage: { label: "Storage", color: "hsl(var(--chart-1))" },
  notes: { label: "Notes", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export function UserCard() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  const chartData = [
    {
      key: "storage",
      value: Number((user?.storageUsed / (1024 * 1024)).toFixed(2)),
      max: Number(process.env.NEXT_PUBLIC_FILES_LIMIT),
    },
    {
      key: "notes",
      value: user?.notesUsed,
      max: Number(process.env.NEXT_PUBLIC_NOTES_LIMIT),
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Usage Details</CardTitle>
        <CardDescription>Current quota usage</CardDescription>
      </CardHeader>

      <CardContent className="flex gap-6 justify-center pb-0">
        {chartData.map((item) => {
          const config = chartConfig[item.key as keyof typeof chartConfig];

          return (
            <ChartContainer
              key={item.key}
              config={chartConfig}
              className="aspect-square max-h-[250px] flex-1"
            >
              <RadialBarChart
                data={[item]}
                startAngle={0}
                endAngle={(item.value / item.max) * 360}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  fill={config.color}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {item.value}
                              {item.key === "storage" ? " MB" : ""}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-muted-foreground text-sm"
                            >
                              {config.label}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          );
        })}
      </CardContent>
    </Card>
  );
}
