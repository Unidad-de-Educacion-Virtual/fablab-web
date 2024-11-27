import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_EVIDENCIA_PATH, ROLE } from "../../config";
import EvidenciaModal from "../../components/modals/EvidenciaModal";
import { useAuth } from "../../providers/AuthProvider";

interface EvidenciasProps {
  sesionId?: number;
}

export default function Evidencias({ sesionId }: EvidenciasProps) {
  const { claims } = useAuth();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      type: "date",
      valueGetter: (value) => new Date(`${value}T00:00:00`),
      flex: 2,
    },
    {
      field: "observacion",
      headerName: "Observación",
      flex: 2,
    },
    {
      field: "url",
      headerName: "Archivo",
      flex: 2,
    },
  ];

  const action = claims ? [ROLE.ADMIN].includes(claims.rol) : false;

  return (
    <BasicCrudLayout
      parentId={sesionId}
      action={action ? "edit" : null}
      queryParams={sesionId ? `sesionId=${sesionId}` : ""}
      apiPath={API_EVIDENCIA_PATH}
      columns={columns}
      title="Evidencias"
      EntityModal={EvidenciaModal}
    />
  );
}
