"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { handleFetch } from "@/helpers/fetchPieChart";

// Type definition for chart data
interface ChartData {
  browser: string;
  visitors: number;
  fill: string;
}

// Type definition for API response
interface ApiResponse {
  positive: number;
  negative: number;
  neutral: number;
}

export const description = "A simple pie chart";

// Chart configuration
const chartConfig: ChartConfig = {
  visitors: {
    label: "Visitors",
  },
  positive: {
    label: "positive",
    color: "#8B5CF6",
  },
  negative: {
    label: "negative",
    color: "#99F6E4",
  },
  neutral: {
    label: "neutral",
    color: "#EF4444",
  },
};

export function Overview() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await handleFetch(
          "http://localhost:3000/api/sentiment"
        );

        console.log("ini data dari function", response);

        // Validasi bahwa response sesuai dengan ApiResponse
        if (typeof response === "object" && response !== null) {
          const data = response as ApiResponse;

          // Transform the data into the format needed for PieChart
          const transformedData: ChartData[] = Object.entries(data).map(
            ([browser, visitors]) => {
              const fill =
                chartConfig[browser as keyof ApiResponse]?.color ?? "#000000";
              return { browser, visitors: Number(visitors), fill }; // Pastikan 'visitors' adalah number
            }
          );

          setChartData(transformedData);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
            <Pie data={chartData} dataKey="visitors" nameKey="browser">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <CardFooter>
          <div className="my-4 flex justify-center gap-4 mx-auto">
            <div className="flex items-center gap-2">
              <span className="block h-4 w-4 bg-[#8B5CF6]" />{" "}
              {/* Color box for desktop */}
              <span>Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-4 w-4 bg-[#99F6E4]" />{" "}
              {/* Color box for mobile */}
              <span>Negative</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-4 w-4 bg-[#EF4444]" />{" "}
              {/* Color box for tablet */}
              <span>Neutral</span>
            </div>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
