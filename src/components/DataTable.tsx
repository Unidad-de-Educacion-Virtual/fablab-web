import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface DataTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
}

export default function DataTable({ rows, columns }: DataTableProps) {
  const pageSizeOptions = [5, 10, 25].filter((size) => size < rows.length);
  pageSizeOptions.push(rows.length);

  return (
    <div className="w-11/12">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={pageSizeOptions}
        disableRowSelectionOnClick
        disableMultipleRowSelection
        disableColumnResize
        slotProps={{
          row: {
            className: "[&:nth-child(even)]:bg-gray-100",
          },
          pagination: {
            labelRowsPerPage: "Mostrar filas por página:",
            labelDisplayedRows: (pagination) =>
              `${pagination.from}-${pagination.to} de ${pagination.count}`,
          },
        }}
      />
    </div>
  );
}
