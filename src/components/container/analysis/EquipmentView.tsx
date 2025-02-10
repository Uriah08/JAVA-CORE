import * as React from "react"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { X } from "lucide-react"
import Image from "next/image"

export function EquipmentView({ isDelete } : { isDelete: boolean }) {
  return (
    <Carousel className="w-full max-w-xs mx-auto mt-3 h-[385px] pt-6">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center relative">
                  {isDelete && <X className="absolute top-2 right-2 cursor-pointer text-zinc-500" size={20}/>}
                  <Image src={'/machine1.jpg'} width={200} height={200} alt='machine' className="object-center object-cover rounded-lg w-[250px] h-[200px] mt-5"/>
                  <CardTitle className="absolute bottom-5 left-8">Image 1</CardTitle>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
