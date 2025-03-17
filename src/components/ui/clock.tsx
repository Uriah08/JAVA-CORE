"use client";

import { useState, useEffect } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState({
    date: "",
    day: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        date: now.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        day: now.toLocaleDateString("en-US", { weekday: "short" }),
        hours: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0"),
        seconds: now.getSeconds().toString().padStart(2, "0"),
      });
    };

    const interval = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-base sm:text-lg font-semibold text-white mb-4">
        {time.date}
      </p>

      <div className="flex xl:gap-5 sm:gap-10 gap-8 text-white">
        <ClockColumn label="Day" value={time.day} />
        <ClockColumn label="Hours" value={time.hours} />
        <ClockColumn label="Minutes" value={time.minutes} />
        <ClockColumn label="Seconds" value={time.seconds} />
      </div>
    </div>
  );
};

const ClockColumn = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center relative w-18">
    <p className="text-2xl sm:text-5xl xl:text-4xl font-bold">{value}</p>
    <p className="text-zinc-200 text-xs uppercase mt-2">{label}</p>
  </div>
);

export default AnalogClock;

