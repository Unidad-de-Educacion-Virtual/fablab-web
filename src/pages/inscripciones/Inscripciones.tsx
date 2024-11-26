import { GridColDef } from "@mui/x-data-grid";
import { API_INSCRIPCION_PATH } from "../../config";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { Participante } from "../../types/Participante";
import InscripcionModal from "../../components/modals/InscripcionModal";

export default function Inscripciones() {
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
      flex: 3,
    },
    {
      field: "programacion",
      headerName: "Programación",
      valueGetter: (programacion: any) => programacion.valor,
      flex: 4,
    },
    {
      field: "fecha",
      headerName: "Fecha de Inscripción",
      type: "date",
      valueGetter: (value) => new Date(value),
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      apiPath={API_INSCRIPCION_PATH}
      columns={columns}
      title="Inscripciones"
      EntityModal={InscripcionModal}
    />
  );
}
