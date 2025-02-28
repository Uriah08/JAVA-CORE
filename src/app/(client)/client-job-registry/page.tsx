'use client'

import { useGetClientJobsQuery } from '@/store/api';
import React from 'react'
import { useSession } from 'next-auth/react';
import { useColumns } from '@/components/container/tables/job-registry/columns'
import { DataTable } from '@/components/container/tables/job-registry/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { PieCharts } from '@/components/container/charts/pie-chart';
import { BarCharts } from '@/components/container/charts/bar-chart';
import { WaveChart } from '@/components/container/charts/date-surveryed-chart';

const JobRegistry = () => {

  const { data: session } = useSession();

  const columns = useColumns()

  const { data, isLoading: jobsLoading } = useGetClientJobsQuery(session?.user.id ?? '', {
    skip:!session?.user?.id,
  });
  const jobs = data?.jobs || []

  const chart1 = jobs
  .map(job => job.dateSurveyed)
  .filter(date => date)

  const chart2 = jobs.map(job => job.status).filter(status => status)
  

  return (
    <div className='w-full p-5 flex xl:flex-row flex-col gap-5'>
        <div className='w-full h-full gap-5 flex flex-col'>
            <div className='w-full h-full p-5 bg-white rounded-xl flex flex-col shadow-lg'>
            <h1 className='text-2xl font-bold'>Job Registry</h1>
            <DataTable columns={columns} data={jobs} loading={jobsLoading}/>
            </div>
            {jobsLoading ? <Skeleton className='w-full h-[320px] shadow-lg'/> : <WaveChart chartDatas={chart1}/>}
        <div className='flex md:flex-row flex-col gap-5'>
          {jobsLoading ? (<>
            <Skeleton className='md:w-1/2 w-full h-[400px] shadow-lg' />
            <Skeleton className='md:w-1/2 w-full h-[400px] shadow-lg' />
            </>
          ) : (<>
            <PieCharts chartDatas={chart2}/>
            <BarCharts/>
          </>)}
        </div>
        </div>
    </div>
  )
}

export default JobRegistry