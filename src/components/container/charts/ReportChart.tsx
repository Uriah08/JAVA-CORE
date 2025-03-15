"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Text } from "recharts";
import { graphData, yAxisValues } from "@/schema";

interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  value: number;
}

const CustomLabel = ({ x, y, width, value }: CustomLabelProps) => {
  return (
    <Text
      x={x + width / 2}
      y={y - 5}
      fill="black"
      fontSize={12}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </Text>
  );
};

interface CustomBarChartProps {
  graphData: graphData;
  yAxisValues: yAxisValues;
}

const CustomBarChart = ({ graphData, yAxisValues }: CustomBarChartProps) => {
  const maxDataValue = Math.max(...graphData.map((item) => item.current), 10);

  return (
    <div className="h-96 flex justify-center items-center py-5 border border-zinc-400 min-w-[900px] max-w-[900px] flex-col">
      <h1 className="text-xl text-center text-zinc-500">Machinery Condition Summary</h1>
      <ResponsiveContainer width="95%" height="100%">
        <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis 
            domain={[0, maxDataValue]} 
            ticks={yAxisValues}
            tick={{ fontSize: 12 }} 
          />
          <Legend
            payload={[
              { value: "Previous", type: "square", color: "#90EE90" },
              { value: "Current", type: "square", color: "#006400" },
            ]}
          />
          <Bar
            dataKey="previous"
            name="Previous"
            label={CustomLabel}
            fill="#90EE90"
          />
          <Bar
            dataKey="current"
            name="Current"
            label={CustomLabel}
            fill="#006400"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;