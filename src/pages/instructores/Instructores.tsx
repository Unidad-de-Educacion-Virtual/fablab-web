import InstructorModal from "../../components/modals/InstructorModal";
import { API_INSTRUCTOR_PATH } from "../../config";
import { GridColDef } from "@mui/x-data-grid";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";

export default function Instructores() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 2,
    },
    {
      field: "documento",
      headerName: "Documento",
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      apiPath={API_INSTRUCTOR_PATH}
      columns={columns}
      title="Instructores"
      EntityModal={InstructorModal}
    />
  );
}
