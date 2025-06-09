import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import DeleteModal from "@/components/modal/DeleteModal";
import { Button } from "@/components/ui/Button";
import UpdateProjectModal from "@/components/modal/UpdateProjectModal";
import AddProjectModal from "@/components/modal/AddProjectModal";

export const ProjectTable = ({ data, totalProject }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleEditClick = (id) => {
    setSelectedProjectId(id);
    setOpenUpdateModal(true);
  };

  const colorMap = {
    completed: "bg-blue-100 text-blue-800",
    pending: "bg-orange-100 text-orange-800",
    Active: "bg-green-100 text-green-800",
  };

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
    columnHelper.accessor("startedDate", {
      header: "Date",
      cell: (info) => {
        const dateValue = info.getValue();
        if (!dateValue) {
          return "N/A"; 
        }
        try {
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) {
            return "Invalid Date";
          }
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch (error) {
          console.error("Error formatting date:", dateValue, error);
          return "Invalid Date";
        }
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-x-2 items-center justify-start">
          <Button
            variant="outline"
            className="bg-[var(--button-primary)] text-secondary hover:text-secondary hover:bg-[var(--button-primary)]/70 "
            onClick={() => handleEditClick(row.original._id)}
          >
            Edit
          </Button>
          <DeleteModal
            className="bg-destructive text-secondary hover:bg-destructive/70"
            id={row.original._id}
            keys="projects"
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: data ?? [],
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
        {/* Add button */}
        <AddProjectModal />
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
                          colorMap[status] || "bg-background text-gray-500"
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
      {openUpdateModal && (
        <UpdateProjectModal
          id={selectedProjectId}
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
        />
      )}
    </div>
  );
};
