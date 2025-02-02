import List from "@/components/container/list/machine-list/List";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-5">
      <div className="w-2/3 p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold">Machine list</h1>
        <List />
      </div>
    </div>
  );
};

export default page;
