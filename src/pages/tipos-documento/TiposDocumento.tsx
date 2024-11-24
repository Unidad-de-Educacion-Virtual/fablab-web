import { API_TIPO_DOCUMENTO_PATH } from "../../config";
import { GridColDef } from "@mui/x-data-grid";
import TipoDocumentoModal from "../../components/modals/TipoDocumentoModal";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";

export default function TiposDocumento() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      apiPath={API_TIPO_DOCUMENTO_PATH}
      columns={columns}
      title="Tipos de Documento"
      entityModal={
        <TipoDocumentoModal open={false} mode={"edit"} setOpen={() => {}} />
      }
    />
  );
}
