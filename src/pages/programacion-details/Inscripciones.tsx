import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_INSCRIPCION_PATH } from "../../config";
import { Participante } from "../../types/Participante";
import InscripcionModal from "../../components/modals/InscripcionModal";

interface InscripcionesProps {
  programacionId?: number;
}

export default function Inscripciones({ programacionId }: InscripcionesProps) {
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
      valueGetter: (value) => new Date(value),
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      parentId={programacionId}
      action="delete"
      queryParams={programacionId ? `programacionId=${programacionId}` : ""}
      apiPath={API_INSCRIPCION_PATH}
      columns={columns}
      title="Inscripciones"
      EntityModal={InscripcionModal}
    />
  );
}
