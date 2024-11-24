import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import { API_SESION_PATH } from "../../config";
import { Instructor } from "../../types/Instructor";
import { Ubicacion } from "../../types/Ubicacion";
import SesionModal from "../../components/modals/SesionModal";

interface SesionesProps {
  programacionId?: number;
}

export default function Sesiones({ programacionId }: SesionesProps) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 2,
    },
    {
      field: "hora",
      headerName: "Hora",
      flex: 2,
    },
    {
      field: "instructor",
      headerName: "Instructor",
      valueGetter: (instructor: Instructor) => instructor.nombre,
      flex: 2,
    },
    {
      field: "ubicacion",
      headerName: "Ubicación",
      valueGetter: (ubicacion: Ubicacion) => ubicacion.nombre,
      flex: 2,
    },
    {
      field: "totalAsistentes",
      headerName: "Asistentes",
      flex: 1,
    },
  ];

  return (
    <BasicCrudLayout
      parentId={programacionId}
      action="view"
      viewBasePath="sesiones/"
      queryParams={programacionId ? `programacionId=${programacionId}` : ""}
      apiPath={API_SESION_PATH}
      columns={columns}
      title="Sesiones"
      EntityModal={SesionModal}
    />
  );
}
