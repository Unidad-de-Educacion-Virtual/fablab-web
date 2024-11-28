import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_DOWNLOAD_FILE_PATH, API_EVIDENCIA_PATH, ROLE } from "../../config";
import EvidenciaModal from "../../components/modals/EvidenciaModal";
import { useAuth } from "../../providers/AuthProvider";
import Button from "../../components/Button";
import { getEntityByIdAsBlob } from "../../services/BackendService";

interface EvidenciasProps {
  sesionId?: number;
}

export default function Evidencias({ sesionId }: EvidenciasProps) {
  const { claims, token } = useAuth();

  async function handleDownload(url: string) {
    try {
      const blob = await getEntityByIdAsBlob(
        API_DOWNLOAD_FILE_PATH,
        url,
        token
      );
      const objUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objUrl;
      link.download = url.split("/").pop() || "Archivo";
      link.click();

      URL.revokeObjectURL(objUrl);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  }

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
      renderCell: (params) => {
        return (
          <Button
            text="Descargar"
            variant="no-background"
            icon="material-symbols:download-rounded"
            onClick={() => handleDownload(params.row.url)}
          />
        );
      },
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
