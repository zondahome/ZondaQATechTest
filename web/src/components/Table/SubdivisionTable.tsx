import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import {Subdivision, SubdivisionStatusCode} from "../../../../Shared/models/subdivison";

interface TableProps {
  subdivisions: Subdivision[];
  pageNumber: number;
  limit: number;
  subdivisionsCount: number;
  setPageNumber: (pageNumber: number) => void;
  setLimit: (limit: number) => void;
}

const columnHelper = createColumnHelper<Subdivision>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>
  }),
  columnHelper.accessor("marketName", {
    header: () => "Market name",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("subdivisionStatusCode", {
    header: () => "Subdivision status",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("longitude", {
    header: () => "Longitude",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("latitude", {
    header: () => "Latitude",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("totalLots", {
    header: () => "Total Lots",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("county", {
    header: () => "County",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("marketName", {
    header: () => "Market Name",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("subdivisionStatusCode", {
    header: () => "Subdivision status",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("community", {
    header: () => "Community",
    cell: (info) => info.renderValue()
  })
];

export const SubdivisionTableComponent: React.FC<TableProps> = ({
  subdivisions,
  pageNumber,
  limit,
  subdivisionsCount,
  setPageNumber,
  setLimit
}): JSX.Element => {
  const table = useReactTable({
    data: subdivisions,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber == 1}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={subdivisionsCount - pageNumber * limit < 0}
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page {pageNumber}</div>
          <strong>
            {pageNumber} of {Math.round(subdivisionsCount / limit)}
          </strong>
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            setLimit(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
