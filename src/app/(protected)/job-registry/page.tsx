"use client"

import { BarCharts } from '@/components/container/charts/bar-chart';
import { WaveChart } from '@/components/container/charts/date-surveryed-chart';
import { PieCharts } from '@/components/container/charts/pie-chart';
import { columns } from '@/components/container/tables/job-registry/columns'
import { DataTable } from '@/components/container/tables/job-registry/data-table'
import Image from 'next/image';
import React from 'react'

import { useGetJobsQuery } from '@/store/api';

// {
//       id: "1",
//       status: "Being Analysed",
//       client: "ABC Corp",
//       area: "Site A",
//       dateSurveyed: "2024-01-01",
//       jobNo: "JOB123",
//       poNo: "PO456",
//       woNo: "WO789",
//       reportNo: "RPT001",
//       jobDescription: "Inspection of pipeline integrity lorem ipsum dolor sit amet consectetur adipiscing elit",
//       method: "Ultrasonic Testing",
//       inspector: "John Doe",
//       analyst: "Jane Smith",
//       reviewer: "Alice Brown",
//       dateFinished: "2024-01-15",
//     },

const JobRegistry = () => {

  const { data, isLoading: jobsLoading } = useGetJobsQuery();
  const jobs = data?.jobs || []

  return (
    <div className='w-full p-5 flex md:flex-row flex-col gap-5'>
      <div className='w-full md:w-2/3 h-full gap-5 flex flex-col'>
      <div className='w-full md:hidden rounded-xl bg-white flex justify-end p-3 shadow-lg'>
          <div className='flex items-center gap-3'>
            <h1 className='text-sm font-semibold'>Username</h1>
            <Image src={'/logoo.png'} width={50} height={50} alt='profile' className='rounded-full'/>
          </div>
        </div>
        <div className='w-full h-full p-5 bg-white rounded-xl flex flex-col shadow-lg'>
        <h1 className='text-2xl font-bold'>Job Registry</h1>
          <DataTable columns={columns} data={jobs} loading={jobsLoading}/>
        </div>
        <WaveChart/>
        <div className='flex md:flex-row flex-col gap-5'>
          <PieCharts/>
          <BarCharts/>
        </div>
      </div>
      <div className='w-full md:w-1/3 md:sticky md:top-5 h-full flex flex-col gap-5'>
        <div className='w-full rounded-xl bg-white hidden md:flex justify-end p-3 shadow-lg'>
          <div className='flex items-center gap-3'>
            <h1 className='text-sm font-semibold'>Username</h1>
            <Image src={'/logoo.png'} width={50} height={50} alt='profile' className='rounded-full'/>
          </div>
        </div>
        <div className='bg-main h-[200px] w-full rounded-xl shadow-lg'></div>
        <div className='w-full rounded-xl bg-white flex flex-col justify-end p-5 gap-3 shadow-lg'>
          <h1 className='text-xl font-semibold'>Sample Data Chart</h1>
          <div className='flex gap-3'>
            <div className='bg-main rounded-lg w-1/2 h-[100px]'></div>
            <div className='bg-main rounded-lg w-1/2 h-[100px]'></div>
          </div>
        </div>
        <div className='w-full rounded-xl bg-white flex flex-col justify-end p-5 gap-3 shadow-lg h-[500px]'>
          <h1 className='text-xl font-semibold'>Recently Added</h1>
          <h1>Sample</h1>
        </div>
      </div>
    </div>
  )
}

export default JobRegistry