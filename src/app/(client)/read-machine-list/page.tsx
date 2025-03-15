"use client"

import List from '@/components/container/list/machine-list/List'
// import { Input } from '@/components/ui/input'
// import { Search } from 'lucide-react'
import React from 'react'
import { useGetMachinesCountQuery } from "@/store/api";


const DatabasePage = () => {

  const { data: machines } = useGetMachinesCountQuery();

  return (
    <div className="w-full md:h-full p-3 sm:p-5 flex md:flex-row flex-col gap-3 sm:gap-5">
        <div className="w-full md:w-2/3 h-full p-5 bg-white rounded-xl shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold">Machine list</h1>
            <List/>
        </div>
        <div className="w-full md:w-1/3 md:sticky md:top-5 h-full flex flex-col gap-3 sm:gap-5">
        {/* <div className="bg-white min-h-1/3 h-full w-full rounded-xl shadow-lg p-5">
        <h1 className="text-xl sm:text-2xl font-bold">Search Components</h1>
        <div className="relative w-full mt-5">
            <Input className="rounded-full pl-10" placeholder="Search equipments..."/>
            <Search className="text-zinc-500 absolute top-2 left-3" size={20}/>
            </div>
        </div> */}
        <div className="bg-white min-h-2/3 h-full w-full rounded-xl shadow-lg p-5">
        <h1 className="text-xl sm:text-2xl font-bold">Machine list</h1>
        <div className="grid grid-cols-1 gap-3 mt-3">
        <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Areas</h1>
              <h1 className="text-4xl font-bold text-white">{machines?.areas || 0}</h1>
            </div>
            <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Equipment Group</h1>
              <h1 className="text-4xl font-bold text-white">{machines?.equipmentGroup || 0}</h1>
            </div>
            <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Equipments</h1>
              <h1 className="text-4xl font-bold text-white">{machines?.equipmentName || 0}</h1>
            </div>
            <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Components</h1>
              <h1 className="text-4xl font-bold text-white">{machines?.components || 0}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatabasePage