"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Text } from "recharts";

const data = [
    { label: "Normal", previous: 28, current: 21, previousColor: "#90EE90", currentColor: "#006400" },
    { label: "Moderate", previous: 6, current: 9, previousColor: "#FFFF99", currentColor: "#FFD700" },
    { label: "Severe", previous: 1, current: 2, previousColor: "#FFD580", currentColor: "#FF8C00" },
    { label: "Critical", previous: 0, current: 0, previousColor: "#FF9999", currentColor: "#FF0000" },
    { label: "Missed Points", previous: 6, current: 9, previousColor: "#000000", currentColor: "#808080" },
    { label: "Total Count", total: 41, previousColor: "#A9A9A9", currentColor: "#696969" },
  ];
  

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

const CustomBarChart = () => {
  return (
    <div className="h-96 flex justify-center items-center py-5 border border-zinc-400 min-w-[900px] max-w-[900px]  flex-col">
        <h1 className="text-xl text-center text-zinc-500">Machinery Condition Summary</h1>
      <ResponsiveContainer width="95%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis 
            tickCount={12} 
            domain={[0, 60]} 
            tick={{ fontSize: 12 }} 
            interval="preserveEnd" 
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
            fill={data.find((item) => item.label === "Previous")?.previousColor || "#90EE90"}
          />

          {/* Current Data Bars */}
          <Bar
            dataKey="current"
            name="Current"
            label={CustomLabel}
            fill={data.find((item) => item.label === "Current")?.currentColor || "#006400"}
          />

          {/* Total Count Bar */}
          <Bar
            dataKey="total"
            name="Total Count"
            label={CustomLabel}
            fill="#A9A9A9"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
