import { TablePagination } from "@mui/base";
import { ChangeEvent, ReactElement, useState } from "react";

type dataArr = (string | number | ReactElement)[][];

interface TableProps {
  head: string[];
  data: dataArr;
  loading: boolean;
}

export default function Table({ data, head, loading }: TableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <table>
        <thead className="bg-red-500 text-white">
          <tr>
            {head.map((col, i) => {
              return (
                <th className="px-4 py-2" key={i}>
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, i) => (
            <tr
              key={i}
              className="[&:nth-child(even)]:bg-gray-100 border-b-2 border-gray-200"
            >
              {row.map((col, j) => {
                return (
                  <td key={j} className="py-3 px-6">
                    {col}
                  </td>
                );
              })}
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr>
              <td
                colSpan={head.length}
                className="text-center py-5 text-gray-400 font-bold"
              >
                {loading ? "Cargando..." : "No hay datos"}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
              colSpan={5}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage={"Filas por página:"}
              labelDisplayedRows={(pagination) =>
                `${pagination.from}-${pagination.to} de ${pagination.count}`
              }
              slotProps={{
                select: {
                  className:
                    "px-2 py-1 rounded-xl bg-white border-2 border-neutral-300 outline outline-0 transition-all focus:border-gray-600 ",
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
