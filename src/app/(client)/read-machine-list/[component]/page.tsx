"use client";

import { useParams } from "next/navigation";

const ComponentPage = () => {
  const params = useParams();

  console.log(params.component);

  return <div className="w-full h-screen p-5 flex md:flex-row flex-col gap-5">
    <div className="w-2/3 min-h-[90vh] p-5 bg-white rounded-xl shadow-lg">
    <h1 className="text-2xl font-bold">{params.component}</h1>
    </div>
  </div>;
};

export default ComponentPage;
