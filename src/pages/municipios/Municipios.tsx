import { GridColDef } from "@mui/x-data-grid";
import { API_MUNICIPIO_PATH } from "../../config";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import MunicipioModal from "../../components/modals/MunicipioModal";

export default function Municipios() {
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
  ];

  return (
    <BasicCrudLayout
      apiPath={API_MUNICIPIO_PATH}
      columns={columns}
      title="Municipios"
      EntityModal={MunicipioModal}
    />
  );
}
