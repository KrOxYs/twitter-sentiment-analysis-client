"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateConfig, transformData } from "@/helpers/negative";

export const description = "A bar chart with sentiment data";

export function SentimenChart() {
  const [data, setData] = useState<any[]>([]);
  const [config, setConfig] = useState<ChartConfig | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, config] = await Promise.all([
          transformData("http://localhost:3000/api/sentiment/negative"),
          generateConfig("http://localhost:3000/api/sentiment/negative"),
        ]);
        setData(data);
        setConfig(config);
      } catch (error) {
        console.error("Failed to fetch data or config:", error);
      }
    };

    fetchData();
  }, []);

  // Show loading message if data or config is null
  if (!data.length || !config) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Popular Negative Keyword</CardTitle>
        <CardDescription>All of time sentiment</CardDescription>
      </CardHeader>
      <CardContent>
        {config && ( // Ensure config is not null before rendering ChartContainer
          <ChartContainer config={config}>
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="sentiment"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const label = config[value as keyof typeof config]?.label;
                  return label ? label : value; // Fallback to the value if label is not found
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="count"
                strokeWidth={2}
                radius={8}
                activeIndex={2}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
