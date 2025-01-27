import { BarCharts } from '@/components/container/charts/bar-chart';
import { WaveChart } from '@/components/container/charts/date-surveryed-chart';
import { PieCharts } from '@/components/container/charts/pie-chart';
import { columns, Registry } from '@/components/container/tables/job-registry/columns'
import { DataTable } from '@/components/container/tables/job-registry/data-table'
import Image from 'next/image';
import React from 'react'

async function getData(): Promise<Registry[]> {
  return [
    {
      id: "1",
      status: "Being Analysed",
      client: "ABC Corp",
      area: "Site A",
      dateSurveyed: "2024-01-01",
      jobNo: "JOB123",
      poNo: "PO456",
      woNo: "WO789",
      reportNo: "RPT001",
      jobDescription: "Inspection of pipeline integrity",
      method: "Ultrasonic Testing",
      inspector: "John Doe",
      analyst: "Jane Smith",
      reviewer: "Alice Brown",
      dateFinished: "2024-01-15",
    },
    {
      id: "2",
      status: "Waiting for Analysis",
      client: "XYZ Ltd",
      area: "Site B",
      dateSurveyed: "2024-02-05",
      jobNo: "JOB124",
      poNo: "PO457",
      woNo: "WO790",
      reportNo: "RPT002",
      jobDescription: "Material strength evaluation",
      method: "Tensile Testing",
      inspector: "Bob Johnson",
      analyst: "Emily Davis",
      reviewer: "Chris Wilson",
      dateFinished: "2024-02-20",
    },
    {
      id: "3",
      status: "Report Submitted",
      client: "LMN Inc",
      area: "Site C",
      dateSurveyed: "2024-03-10",
      jobNo: "JOB125",
      poNo: "PO458",
      woNo: "WO791",
      reportNo: "RPT003",
      jobDescription: "Structural integrity assessment",
      method: "Radiographic Testing",
      inspector: "Steve Rogers",
      analyst: "Natasha Romanoff",
      reviewer: "Bruce Banner",
      dateFinished: "2024-03-25",
    },
    {
      id: "4",
      status: "Being Reviewed",
      client: "DEF Group",
      area: "Site D",
      dateSurveyed: "2024-04-12",
      jobNo: "JOB126",
      poNo: "PO459",
      woNo: "WO792",
      reportNo: "RPT004",
      jobDescription: "Welding quality inspection",
      method: "Visual Inspection",
      inspector: "Tony Stark",
      analyst: "Pepper Potts",
      reviewer: "Nick Fury",
      dateFinished: "2024-04-30",
    },
    {
      id: "5",
      status: "Waiting for Analysis",
      client: "GHI Solutions",
      area: "Site E",
      dateSurveyed: "2024-05-18",
      jobNo: "JOB127",
      poNo: "PO460",
      woNo: "WO793",
      reportNo: "RPT005",
      jobDescription: "Corrosion resistance testing",
      method: "Electrochemical Testing",
      inspector: "Clark Kent",
      analyst: "Diana Prince",
      reviewer: "Barry Allen",
      dateFinished: "2024-05-30",
    },
    {
      id: "6",
      status: "Being Analysed",
      client: "JKL Services",
      area: "Site F",
      dateSurveyed: "2024-06-22",
      jobNo: "JOB128",
      poNo: "PO461",
      woNo: "WO794",
      reportNo: "RPT006",
      jobDescription: "Load testing of beams",
      method: "Load Testing",
      inspector: "Peter Parker",
      analyst: "Bruce Wayne",
      reviewer: "Clark Kent",
      dateFinished: "2024-07-05",
    },
    {
      id: "7",
      status: "Report Submitted",
      client: "MNO Industries",
      area: "Site G",
      dateSurveyed: "2024-07-15",
      jobNo: "JOB129",
      poNo: "PO462",
      woNo: "WO795",
      reportNo: "RPT007",
      jobDescription: "Environmental impact assessment",
      method: "Chemical Analysis",
      inspector: "Lois Lane",
      analyst: "Lex Luthor",
      reviewer: "Harvey Dent",
      dateFinished: "2024-08-01",
    },
    {
      id: "8",
      status: "Being Reviewed",
      client: "PQR Enterprises",
      area: "Site H",
      dateSurveyed: "2024-08-10",
      jobNo: "JOB130",
      poNo: "PO463",
      woNo: "WO796",
      reportNo: "RPT008",
      jobDescription: "Electrical safety testing",
      method: "Insulation Resistance Test",
      inspector: "Hal Jordan",
      analyst: "Arthur Curry",
      reviewer: "Oliver Queen",
      dateFinished: "2024-08-25",
    },
    {
      id: "9",
      status: "Waiting for Analysis",
      client: "STU Tech",
      area: "Site I",
      dateSurveyed: "2024-09-05",
      jobNo: "JOB131",
      poNo: "PO464",
      woNo: "WO797",
      reportNo: "RPT009",
      jobDescription: "Soil compaction testing",
      method: "Proctor Test",
      inspector: "Wanda Maximoff",
      analyst: "Vision",
      reviewer: "Doctor Strange",
      dateFinished: "2024-09-20",
    },
    {
      id: "10",
      status: "Being Analysed",
      client: "VWX Corp",
      area: "Site J",
      dateSurveyed: "2024-10-11",
      jobNo: "JOB132",
      poNo: "PO465",
      woNo: "WO798",
      reportNo: "RPT010",
      jobDescription: "Fire resistance assessment",
      method: "Fire Testing",
      inspector: "Scott Lang",
      analyst: "Hope Van Dyne",
      reviewer: "Hank Pym",
      dateFinished: "2024-10-30",
    },
    {
      id: "11",
      status: "Report Submitted",
      client: "YZA Associates",
      area: "Site K",
      dateSurveyed: "2024-11-20",
      jobNo: "JOB133",
      poNo: "PO466",
      woNo: "WO799",
      reportNo: "RPT011",
      jobDescription: "Noise pollution measurement",
      method: "Sound Level Testing",
      inspector: "Sam Wilson",
      analyst: "Bucky Barnes",
      reviewer: "Nick Fury",
      dateFinished: "2024-12-05",
    },
    {
      id: "12",
      status: "Being Reviewed",
      client: "BCD Ltd",
      area: "Site L",
      dateSurveyed: "2024-12-15",
      jobNo: "JOB134",
      poNo: "PO467",
      woNo: "WO800",
      reportNo: "RPT012",
      jobDescription: "Air quality analysis",
      method: "Gas Chromatography",
      inspector: "T'Challa",
      analyst: "Shuri",
      reviewer: "Okoye",
      dateFinished: "2025-01-01",
    },
  ];
}

const JobRegistry = async () => {
  const data = await getData()
  return (
    <div className='w-full p-5 flex md:flex-row flex-col pr-8 gap-5'>
      <div className='w-full md:w-2/3 h-full gap-5 flex flex-col'>
        <div className='w-full h-full p-5 bg-white rounded-xl flex flex-col shadow-lg'>
        <h1 className='text-2xl font-bold'>Job Registry</h1>
          <DataTable columns={columns} data={data}/>
        </div>
        <WaveChart/>
        <div className='flex md:flex-row flex-col gap-5'>
          <PieCharts/>
          <BarCharts/>
        </div>
      </div>
      <div className='w-full md:w-1/3 md:sticky md:top-5 h-full flex flex-col gap-5'>
        <div className='w-full rounded-xl bg-white flex justify-end p-3 shadow-lg'>
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