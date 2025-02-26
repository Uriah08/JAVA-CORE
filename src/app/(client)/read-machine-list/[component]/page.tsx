"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, Plus, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { symbols } from "@/schema";
import { Dialog } from "@/components/ui/dialog";
import ExportClient from "@/components/container/dialogs/ExportClient";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddDetails from "@/components/container/form/AddDetails";
import ViewDetails from "@/components/container/analysis/ViewDetails";

const symbol1 = [
  {symbol: '/severity/C.png'},
  {symbol: '/severity/M.png'},
  {symbol: '/severity/C.png'},
  {symbol: '/severity/N.png'},
  {symbol: '/severity/X.png'},
  {symbol: '/severity/S.png'},
  {symbol: '/severity/S.png'},
  {symbol: '/severity/C.png'},
  {symbol: '/severity/N.png'},
  {symbol: '/severity/X.png'}
]

const ComponentPage = () => {
  const [detailsActive, setDetailsActive] = useState('add')
  const router = useRouter()
  const machinesPage = () => {
    router.push("/read-machine-list")
  }
  const params = useParams();
  console.log(params);
  
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full h-full p-5 flex xl:flex-row flex-col gap-5">
            <div className="w-full xl:w-1/3 p-5 bg-white rounded-xl shadow-lg">
            <div className='flex flex-row gap-5 items-center'>
              <ArrowLeft onClick={machinesPage} className='text-main hover:text-follow cursor-pointer'/>
              <h1 className="text-2xl font-bold">Equipment List</h1>
            </div>
            <div className="relative w-full mt-5">
            <Input className="rounded-full pl-10" placeholder="Search equipments..."/>
            <Search className="text-zinc-500 absolute top-2 left-3" size={20}/>
            </div>
            </div>
            <div className="w-full xl:w-2/3 p-5 bg-white rounded-xl shadow-lg">
              <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Severity History</h1>
              <Button onClick={() => setOpen(!open)} className="bg-main hover:bg-follow text-white">Export</Button>
              <Dialog open={open} onOpenChange={setOpen}>
              <ExportClient onClose={() => setOpen(false)}/>
              </Dialog>
              </div>
              <div className="flex gap-3 flex-wrap mt-3">
                {symbols.map((symbol) => (
                  <div key={symbol.image} className="flex gap-1">
                    <Image
                      src={`/severity/${symbol.image}.png`}
                      width={40}
                      height={40}
                      alt="Symbol"
                      className="w-5 object-cover"
                    />
                    <h1 className="text-sm text-zinc-600">{symbol.label}</h1>
                  </div>
                ))}
              </div>
              <div className="border rounded-lg mt-5 flex overflow-auto">
                {symbol1.map((symbol, i) => (
                  <div key={i} className="p-3 min-w-[100px] w-full flex justify-center border-r">
                  <Image src={symbol.symbol} width={40} height={40} alt="symbol" className='w-8 object-cover'/>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 w-full mt-5">
               <h1 className="text-sm font-medium">
                 Recommendations
               </h1>
               <div className="border rounded-lg p-3">
                 <h1 className="font-semibold">Previous Recommendations</h1>
                 <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
                   <p className="text-sm text-zinc-600 indent-10">
                     Lorem ipsum dolor sit amet consectetur, adipisicing
                     elit. Asperiores est laboriosam temporibus aliquam
                     tempore itaque nihil atque, ducimus quibusdam placeat
                     illum, maiores eveniet pariatur quia, ex aut tenetur
                     dignissimos! Sequi? Asperiores est laboriosam
                     temporibus aliquam tempore itaque nihil atque, ducimus
                     quibusdam placeat illum, maiores eveniet pariatur
                     quia, ex aut tenetur dignissimos! Sequi? Asperiores
                     est laboriosam temporibus aliquam tempore itaque nihil
                     atque, ducimus quibusdam placeat illum, maiores
                     eveniet pariatur quia, ex aut tenetur dignissimos!
                     Sequi?
                   </p>
                   <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                     Jan 1, 2025
                   </h1>
                 </div>
               </div>
             </div>
             <div className="flex w-full gap-5 xl:flex-row flex-col">
             <div className="flex flex-col gap-3 w-full mt-5">
               <h1 className="text-sm font-medium">
                 Action
               </h1>
               <div className="border rounded-lg p-3">
                 <h1 className="font-semibold">Previous Action</h1>
                 <div className="border rounded-lg p-3 mt-2 max-h-[160px] overflow-auto">
                   <p className="text-sm text-zinc-600 indent-10">
                     Lorem ipsum dolor sit amet consectetur, adipisicing
                     elit. Asperiores est laboriosam temporibus aliquam
                     tempore itaque nihil atque, ducimus quibusdam placeat
                     illum, maiores eveniet pariatur quia, ex aut tenetur
                     dignissimos! Sequi? Asperiores est laboriosam
                     temporibus aliquam tempore itaque nihil atque, ducimus
                     quibusdam placeat illum, maiores eveniet pariatur
                     quia, ex aut tenetur dignissimos! Sequi? Asperiores
                     est laboriosam temporibus aliquam tempore itaque nihil
                     atque, ducimus quibusdam placeat illum, maiores
                     eveniet pariatur quia, ex aut tenetur dignissimos!
                     Sequi?
                   </p>
                   <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                     Jan 1, 2025
                   </h1>
                 </div>
                 <div className="flex gap-3 mt-3 items-center">
                 <Input placeholder="Comment here..."/>
                  <Button className="bg-main hover:bg-follow">Send</Button>
                 </div>
               </div>
             </div>
             <div className="flex flex-col gap-3 w-full mt-5">
               <h1 className="text-sm font-medium">
                 Notes
               </h1>
               <div className="border rounded-lg p-3">
                 <h1 className="font-semibold">Analyst Note</h1>
                 <div className="border rounded-lg p-3 mt-2 max-h-[112px] overflow-auto">
                   <p className="text-sm text-zinc-600 indent-10">
                     Lorem ipsum dolor sit amet consectetur, adipisicing
                     elit. Asperiores est laboriosam temporibus aliquam
                     tempore itaque nihil atque, ducimus quibusdam placeat
                     illum, maiores eveniet pariatur quia, ex aut tenetur
                     dignissimos! Sequi? Asperiores est laboriosam
                     temporibus aliquam tempore itaque nihil atque, ducimus
                     quibusdam placeat illum, maiores eveniet pariatur
                     quia, ex aut tenetur dignissimos! Sequi? Asperiores
                     est laboriosam temporibus aliquam tempore itaque nihil
                     atque, ducimus quibusdam placeat illum, maiores
                     eveniet pariatur quia, ex aut tenetur dignissimos!
                     Sequi?
                   </p>
                   <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                     Jan 1, 2025
                   </h1>
                 </div>
                 <Select>
                    <SelectTrigger className="mt-3">
                      <SelectValue placeholder='Select Analyst'/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyst 1">Analyst 1</SelectItem>
                      <SelectItem value="analyst 2">Analyst 2</SelectItem>
                      <SelectItem value="analyst 3">Analyst 3</SelectItem>
                    </SelectContent>
                  </Select>
                 <div className="flex gap-3 mt-3 items-center">
                 <Input placeholder="Input analyst note here..."/>
                  <Button className="bg-main hover:bg-follow">Send</Button>
                 </div>
               </div>
             </div>
             </div>
             <div className="flex flex-col gap-3 w-full mt-5">
               <h1 className="text-sm font-medium">
                 Details
               </h1>
               <div className="border rounded-lg p-3">
                 {/* <div className="relative">
                  <Search className="absolute top-2 left-3 text-zinc-400" size={20}/>
                  <Input className="w-full pl-9" placeholder="Search equipment details..."/>
                 </div>
                 <div className="w-full py-10">
                  <h1 className="text-zinc-300 font-bold text-2xl text-center">No details</h1>
                 </div> */}
                 <div className="flex gap-5 items-center">
                  <Button onClick={() => setDetailsActive('add')} variant={'outline'}>
                    <Plus size={20} className="text-zinc-400"/>
                    <span className="text-zinc-500">Add Details</span>
                  </Button>
                  <Button onClick={() => setDetailsActive('view')} variant={'outline'}>
                    <Eye size={20} className="text-zinc-400"/>
                    <span className="text-zinc-500">View Details</span>
                  </Button>
                 </div>
                 <div className="bg-zinc-200 h-[1px] w-full my-3"/>
                 {detailsActive === 'add' ? (
                  <AddDetails/>
                 ) : (
                  <ViewDetails/>
                 )}
               </div>
             </div>
            </div>
        </div>
  )
}

export default ComponentPage;
