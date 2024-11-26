import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_EVIDENCIA_PATH } from "../../config";
import EvidenciaModal from "../../components/modals/EvidenciaModal";

interface EvidenciasProps {
  sesionId?: number;
}

export default function Evidencias({ sesionId }: EvidenciasProps) {
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
      valueGetter: (value) => new Date(value),
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

  return (
    <BasicCrudLayout
      parentId={sesionId}
      action="edit"
      queryParams={sesionId ? `sesionId=${sesionId}` : ""}
      apiPath={API_EVIDENCIA_PATH}
      columns={columns}
      title="Evidencias"
      EntityModal={EvidenciaModal}
    />
  );
}
