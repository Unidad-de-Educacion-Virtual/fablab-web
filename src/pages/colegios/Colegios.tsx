import { GridColDef } from "@mui/x-data-grid";
import { API_COLEGIO_PATH } from "../../config";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import ColegioModal from "../../components/modals/ColegioModal";

export default function Colegios() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 2,
    },
    {
      field: "dane",
      headerName: "Dane",
      flex: 2,
    },
    {
      field: "municipio",
      headerName: "Municipio",
      valueGetter: (municipio: any) => municipio.nombre,
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      apiPath={API_COLEGIO_PATH}
      columns={columns}
      title="Colegios"
      entityModal={
        <ColegioModal open={false} mode={"edit"} setOpen={() => {}} />
      }
    />
  );
}
