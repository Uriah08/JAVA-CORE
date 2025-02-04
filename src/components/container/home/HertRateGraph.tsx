import React from "react";

interface HeartRateGraphProps {
  data: number[];
}

const HeartRateGraph: React.FC<HeartRateGraphProps> = ({ data }) => {
  const maxHeartRate = Math.max(...data);
  const pathData = data
    .map((heartRate, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (heartRate / maxHeartRate) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full h-96 flex items-center justify-center relative ">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -20 100 80"
      >
        <polyline fill="none" stroke="red" strokeWidth="2" points={pathData} />
      </svg>
    </div>
  );
};

export default HeartRateGraph;
