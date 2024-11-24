import { GridColDef } from "@mui/x-data-grid";
import { API_TALLER_PATH } from "../../config";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import TallerModal from "../../components/modals/TallerModal";

export default function Talleres() {
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
      field: "descripcion",
      headerName: "Descripción",
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      mode="view"
      apiPath={API_TALLER_PATH}
      columns={columns}
      title="Talleres"
      entityModal={
        <TallerModal open={false} mode={"edit"} setOpen={() => {}} />
      }
    />
  );
}
