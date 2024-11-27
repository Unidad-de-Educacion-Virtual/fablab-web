import { GridColDef } from "@mui/x-data-grid";
import { API_TALLER_PATH, ROLE } from "../../config";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import TallerModal from "../../components/modals/TallerModal";
import { useAuth } from "../../providers/AuthProvider";

export default function Talleres() {
  const { claims } = useAuth();
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
      action="view"
      apiPath={API_TALLER_PATH}
      columns={columns}
      title="Talleres"
      EntityModal={TallerModal}
      enableCreate={claims ? [ROLE.ADMIN].includes(claims.rol) : false}
    />
  );
}
