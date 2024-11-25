import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_ASISTENTE_PATH } from "../../config";
import { Participante } from "../../types/Participante";
import AsistenteModal from "../../components/modals/AsistenteModal";

interface AsistentesProps {
  sesionId?: number;
}

export default function Asistentes({ sesionId }: AsistentesProps) {
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

  return (
    <BasicCrudLayout
      parentId={sesionId}
      action="delete"
      queryParams={sesionId ? `sesionId=${sesionId}` : ""}
      apiPath={API_ASISTENTE_PATH}
      columns={columns}
      title="Asistentes"
      EntityModal={AsistenteModal}
    />
  );
}
