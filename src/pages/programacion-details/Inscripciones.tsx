import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_INSCRIPCION_PATH, ROLE } from "../../config";
import { Participante } from "../../types/Participante";
import InscripcionModal from "../../components/modals/InscripcionModal";
import { useAuth } from "../../providers/AuthProvider";

interface InscripcionesProps {
  programacionId?: number;
}

export default function Inscripciones({ programacionId }: InscripcionesProps) {
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
    {
      field: "fecha",
      headerName: "Fecha",
      type: "date",
      valueGetter: (value) => new Date(`${value}T00:00:00`),
      flex: 2,
    },
  ];

  const enableDelete = claims ? [ROLE.ADMIN].includes(claims.rol) : false;

  return (
    <BasicCrudLayout
      parentId={programacionId}
      action={enableDelete ? "delete" : null}
      queryParams={programacionId ? `programacionId=${programacionId}` : ""}
      apiPath={API_INSCRIPCION_PATH}
      columns={columns}
      title="Inscripciones"
      EntityModal={InscripcionModal}
    />
  );
}
