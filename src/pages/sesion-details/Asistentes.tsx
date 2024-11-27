import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_ASISTENTE_PATH, ROLE } from "../../config";
import { Participante } from "../../types/Participante";
import AsistenteModal from "../../components/modals/AsistenteModal";
import { useAuth } from "../../providers/AuthProvider";

interface AsistentesProps {
  sesionId?: number;
}

export default function Asistentes({ sesionId }: AsistentesProps) {
  const { claims } = useAuth();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "participante",
      headerName: "Participante",
      valueGetter: (participante: Participante) => participante.nombre,
      flex: 2,
    },
  ];

  const action = claims ? [ROLE.ADMIN].includes(claims.rol) : false;

  return (
    <BasicCrudLayout
      parentId={sesionId}
      action={action ? "delete" : null}
      queryParams={sesionId ? `sesionId=${sesionId}` : ""}
      apiPath={API_ASISTENTE_PATH}
      columns={columns}
      title="Asistentes"
      EntityModal={AsistenteModal}
    />
  );
}
