import React from "react";

interface HeartRateGraphProps {
  data: number[];
}

const HeartRateGraph: React.FC<HeartRateGraphProps> = ({ data }) => {
  const maxHeartRate = Math.max(...data);

  // Create the path for the line graph
  const pathData = data
    .map((heartRate, index) => {
      const x = (index / (data.length - 1)) * 100; // Spread across the width
      const y = 100 - (heartRate / maxHeartRate) * 100; // Scale based on max heart rate
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full h-96 flex items-center justify-center relative ">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polyline
          fill="none"
          stroke="green"
          strokeWidth="2"
          points={pathData}
        />
      </svg>
    </div>
  );
};

export default HeartRateGraph;
