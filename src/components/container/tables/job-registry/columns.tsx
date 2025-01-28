"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { ArrowUpDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"

export type Registry = {
  id: string
  status: "Waiting for Analysis" | "Being Analysed" | "Being Reviewed" | "Report Submitted"
  client: string
  area: string
  dateSurveyed: string
  jobNo: string
  poNo: string
  woNo: string
  reportNo: string
  jobDescription: string
  method: string
  inspector: string
  analyst: string
  reviewer: string
  dateFinished: string
}

export const columns: ColumnDef<Registry>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
      className="mx-2 bg-white border-main data-[state=checked]:bg-main data-[state=checked]:text-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mx-2 border-main data-[state=checked]:bg-main data-[state=checked]:text-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const bgColor =
      status === "Waiting for Analysis"
      ? "bg-red-500"
      : status === "Being Analysed" ? "bg-orange-500" : status === "Being Reviewed" ? "bg-yellow-500":"bg-green-500";
      return (
        <div className={`w-fit h-full p-2 rounded-full ${bgColor}`}></div>
      )
    }
  },
  {
    accessorKey: "client",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-follow hover:text-white"
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
    {
        accessorKey: "area",
        header: "Area",
        cell: ({ row }) => {
          const area = row.getValue("area") as string;
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {area}
            </h1>
          )
        }
    },
    {
        accessorKey: "dateSurveyed",
        header: () => <div className="whitespace-nowrap">Date Surveyed</div>,
        cell: ({ row }) => {
          const dateSurveyed = row.getValue("dateSurveyed") as string;
          const formattedDate = new Date(dateSurveyed).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {formattedDate}
            </h1>
          )
        }
    },
    {
        accessorKey: "jobNo",
        header: () => <div className="whitespace-nowrap">Job Number</div>,
    },
    {
        accessorKey: "poNo",
        header: () => <div className="whitespace-nowrap">PO Number</div>,
    },
    {
        accessorKey: "woNo",
        header: () => <div className="whitespace-nowrap">WO Number</div>,
    },
    {
        accessorKey: "reportNo",
        header: () => <div className="whitespace-nowrap">Report Number</div>,
    },
    {
        accessorKey: "jobDescription",
        header: () => <div className="whitespace-nowrap">Job Description</div>,
        cell: ({ row }) => {
          const jobDescription = row.getValue("jobDescription") as string;
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {jobDescription.length > 40 ? `${jobDescription.substring(0, 37)}...` : jobDescription}
            </h1>
          )
        }
    },
    {
        accessorKey: "method",
        header: "Method",
        cell: ({ row }) => {
          const method = row.getValue("method") as string;
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {method}
            </h1>
          )
        }
    },
    {
        accessorKey: "inspector",
        header: "Inspector",
        cell: ({ row }) => {
          const inspector = row.getValue("inspector") as string;
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {inspector}
            </h1>
          )
        }
    },
    {
        accessorKey: "analyst",
        header: "Analyst",
        cell: ({ row }) => {
          const analyst = row.getValue("analyst") as string;
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {analyst}
            </h1>
          )
        }
    },
    {
        accessorKey: "reviewer",
        header: "Reviewer",
        cell: ({ row }) => {
          const reviewer = row.getValue("reviewer") as string;
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {reviewer}
            </h1>
          )
        }
    },
    {
        accessorKey: "dateFinished",
        header: () => <div className="whitespace-nowrap">Date Finished</div>,
        cell: ({ row }) => {
          const dateFinished = row.getValue("dateFinished") as string;
          const formattedDate = new Date(dateFinished).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          return (
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
              {formattedDate}
            </h1>
          )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const registry = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(registry.id)}
                >
                  Copy regsitry ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Routes</DropdownMenuItem>
                <DropdownMenuItem>View Other</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
