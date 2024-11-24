import { GridColDef } from "@mui/x-data-grid";
import { API_UBICACION_PATH } from "../../config";
import UbicacionModal from "../../components/modals/UbicacionModal";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";

export default function Ubicaciones() {
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
  ];

  return (
    <BasicCrudLayout
      apiPath={API_UBICACION_PATH}
      columns={columns}
      title="Ubicaciones"
      EntityModal={UbicacionModal}
    />
  );
}
