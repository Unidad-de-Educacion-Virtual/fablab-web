import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_PROGRAMACION_PATH } from "../../config";
import ProgramacionModal from "../../components/modals/ProgramacionModal";
import { Instructor } from "../../types/Instructor";
import { Ubicacion } from "../../types/Ubicacion";

interface ProgramacionesProps {
  tallerId?: number;
}

export default function Programaciones({ tallerId }: ProgramacionesProps) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "instructor",
      headerName: "Instructor",
      valueGetter: (instructor: Instructor) => instructor.nombre,
      flex: 2,
    },
    {
      field: "fechaInicio",
      headerName: "Fecha de Inicio",
      flex: 2,
    },
    {
      field: "fechaFin",
      headerName: "Fecha de Fin",
      flex: 2,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      flex: 1,
    },
    {
      field: "ubicacion",
      headerName: "Ubicación",
      valueGetter: (ubicacion: Ubicacion) => ubicacion.nombre,
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      parentId={tallerId}
      action="view"
      viewBasePath="programaciones/"
      queryParams={tallerId ? `tallerId=${tallerId}` : ""}
      apiPath={API_PROGRAMACION_PATH}
      columns={columns}
      title="Programaciones"
      EntityModal={ProgramacionModal}
    />
  );
}
