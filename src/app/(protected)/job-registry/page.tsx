"use client"

import { BarCharts } from '@/components/container/charts/bar-chart';
import { WaveChart } from '@/components/container/charts/date-surveryed-chart';
import { PieCharts } from '@/components/container/charts/pie-chart';
import { columns } from '@/components/container/tables/job-registry/columns'
import { DataTable } from '@/components/container/tables/job-registry/data-table'
import React from 'react'

import { useGetJobsQuery } from '@/store/api';

const JobRegistry = () => {

  const { data, isLoading: jobsLoading } = useGetJobsQuery();
  const jobs = data?.jobs || []

  const chart1 = jobs
  .map(job => job.dateSurveyed)
  .filter(date => date)

  const chart2 = jobs.map(job => job.status).filter(status => status)

  console.log(chart2);
  
  return (
    <div className='w-full p-5 flex md:flex-row flex-col gap-5'>
      <div className='w-full md:w-2/3 h-full gap-5 flex flex-col'>
        <div className='w-full h-full p-5 bg-white rounded-xl flex flex-col shadow-lg'>
        <h1 className='text-2xl font-bold'>Job Registry</h1>
          <DataTable columns={columns} data={jobs} loading={jobsLoading}/>
        </div>
        <WaveChart chartDatas={chart1}/>
        <div className='flex md:flex-row flex-col gap-5'>
          <PieCharts chartDatas={chart2}/>
          <BarCharts/>
        </div>
      </div>
      <div className='w-full md:w-1/3 md:sticky md:top-5 h-full flex flex-col gap-5'>
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