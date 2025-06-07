import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import DeleteModal from "../../modal/deleteModal";
import EditModal from "../../modal/editModal";
import AddModal from "../../modal/addModal";

const columnHelper = createColumnHelper();
const columns = [
  {
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("started_Date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center justify-center">
        <EditModal className="bg-blue-500 text-secondary" name="Edit"/>
        <DeleteModal className="bg-destructive text-secondary" />
      </div>
    ),
  }),
];

export const ProjectTable = ({ data, totalProject }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const colorMap = {
    completed: "bg-blue-100 text-blue-800",
    pending: "bg-orange-100 text-orange-800",
    Published: "bg-purple-100 text-purple-800",
    Active: "bg-green-100 text-green-800",
  };
  return (
    <div className="p-4 w-full">
      <div className="grid grid-cols-[auto_auto] justify-between items-center mb-4">
        <h1 className="text-3xl my-4 font-bold text-[#815C00] flex items-center">
          Projects
        </h1>
        <span className="bg-[#FFF5D9] text-[#815C00] px-3 py-1 rounded-full text-sm">
          {totalProject?.projectCount} Projects
        </span>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="mb-4 border-1 border-gray-200 rounded-md min-w-70 py-2 px-4"
        />
        <AddModal name="Add Project" className="border-border border-1"/>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="px-6 py-3 text-left text-lg font-bold text-gray-500 uppercase tracking-wider"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                  {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === "status") {
                  const status = row.original.status;
                  return (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap text-sm text-center h-full"
                    >
                      <div
                        className={`flex py-1 items-center justify-center rounded-full w-full h-full ${
                          colorMap[status] || "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm 
                      text-gray-500"
                    }`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
