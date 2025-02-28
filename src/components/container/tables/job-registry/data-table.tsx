"use client"

import * as React from "react"

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { Filter, Trash } from "lucide-react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Skeleton } from "@/components/ui/skeleton"

import { useDeleteJobsMutation } from "@/store/api"

import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

import { useSession } from "next-auth/react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  loading: boolean
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  loading
}: DataTableProps<TData, TValue>) {

  const { data: session } = useSession()

  const { toast } = useToast()
  const [deleteJobs, { isLoading: deleteLoading }] = useDeleteJobsMutation();

  const [open, setOpen] = React.useState(false)

  const [fromDate, setFromDate] = React.useState<Date>()
  const [toDate, setToDate] = React.useState<Date>()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})
    const filteredData = React.useMemo(() => {
      if (!fromDate && !toDate) return data;
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.filter((item: any) => {
        const dateSurveyed = new Date(item.dateSurveyed);
        if (fromDate && dateSurveyed < fromDate) return false;
        if (toDate && dateSurveyed > toDate) return false;
        return true;
      });
    }, [data, fromDate, toDate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const deleteJob = async () => {
    try {
      const selectedIds = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => filteredData[parseInt(key)]?.id)
      .filter(Boolean);

      const response = await deleteJobs({id: selectedIds}).unwrap()
      if(!response.success) {
        throw new Error(response.message)
      }
      toast({
        title: "Success",
        description: response.message,
      });
      setOpen(false)
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast({
        title: "Error",
        description: err.data?.message || "An unexpected error occurred.",
      });
    }
  };
  

  return (
    <div className="mt-5">
      <div className="flex xl:flex-row flex-col gap-3 justify-between">
        <h1 className="text-xl font-semibold whitespace-nowrap">Date Range:</h1>
        <div className="flex sm:flex-row flex-col gap-5 w-full">
        <div className="flex flex-1 gap-2 items-center">
          <h1 className="text-sm text-zinc-600">From:</h1>
          <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={loading}
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !fromDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={setFromDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        </div>
        <div className="flex flex-1 gap-2 items-center">
          <h1 className="text-sm text-zinc-600 sm:mr-0 mr-[20px]">To:</h1>
          <Popover>
          <PopoverTrigger asChild>
            <Button
            disabled={loading}
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !toDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={setToDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        </div>
        </div>
      </div>
      <div className="flex items-center py-4 w-full justify-between gap-3">
        <Input
          disabled={loading}
          placeholder="Filter clients..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("user")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger disabled={deleteLoading || Object.keys(rowSelection).length === 0}>
            <div className={`bg-main rounded-md p-2 text-white ${deleteLoading || Object.keys(rowSelection).length === 0 ? 'bg-opacity-50': 'hover:bg-follow'} ${session?.user.role === 'user' && 'hidden'}`}>
              <Trash size={20}/>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure you want to delete {Object.keys(rowSelection).length} rows?</DialogTitle>
            <div className="flex gap-3 justify-end">
              <DialogClose asChild>
                <Button onClick={() => setRowSelection({})} variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button className="bg-main hover:bg-follow" onClick={deleteJob} disabled={deleteLoading || Object.keys(rowSelection).length === 0}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="bg-main rounded-md p-2 cursor-pointer text-white hover:bg-follow">
              <Filter size={20}/>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    {loading ? <Skeleton className="h-[500px] w-full rounded-lg"/> : (
      <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-main">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    )}


      <div className="flex xl:flex-row flex-col items-start xl:gap-0 gap-2 xl:items-center justify-between xl:space-x-2 py-4 w-full ">
        <div className="flex gap-2">
          <div className="flex gap-2">
            <div className="bg-red-500 p-2 rounded-full w-fit h-fit"></div>
            <h1 className="text-xs text-zinc-500">Waiting for Analysis</h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-orange-500 p-2 rounded-full w-fit h-fit"></div>
            <h1 className="text-xs text-zinc-500">Being Analysed</h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-yellow-500 p-2 rounded-full w-fit h-fit"></div>
            <h1 className="text-xs text-zinc-500">Being Reviewed</h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-green-500 p-2 rounded-full w-fit h-fit"></div>
            <h1 className="text-xs text-zinc-500">Report Submitted</h1>
          </div>
          </div>
        <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        </div>
        
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
    </div>
  )
}
