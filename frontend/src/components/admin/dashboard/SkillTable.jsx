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
import AddModal from "@/components/modal/addModal";
import UpdateSkillModal from "@/components/modal/UpdateSkillModal";
import { Button } from "@/components/ui/Button";

// const openEditModal = UpdateSkillModal();
export const SkillTable = ({ data, totalskill }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleEditClick = (id) => {
    setSelectedSkillId(id);
    setOpenUpdateModal(true);
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
    columnHelper.accessor("progress", {
      header: "Progess Percent",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-x-2 items-center justify-start">
          <Button
            variant="outline"
            className="bg-button-primary text-secondary hover:text-secondary hover:bg-button-primary"
            onClick={() => handleEditClick(row.original._id)}
          >
            Edit
          </Button>
          <DeleteModal
            className="bg-destructive text-secondary"
            id={row.original._id}
            keys="skills"
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
          My Skills
        </h1>
        <span className="bg-[#FFF5D9] text-[#815C00] px-3 py-1 rounded-full text-sm">
          {totalskill} Skills
        </span>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="mb-4 border-1 border-gray-200 rounded-md min-w-70 py-2 px-4"
        />
        <AddModal />
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
                  <div
                    className={`flex py-1 items-center justify-center rounded-full w-full h-full`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                    {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap text-sm text-center h-full"
                >
                  <div
                    className={`flex py-1 items-center justify-center rounded-full w-full h-full`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateModal && (
        <UpdateSkillModal
          id={selectedSkillId}
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
        />
      )}
    </div>
  );
};
