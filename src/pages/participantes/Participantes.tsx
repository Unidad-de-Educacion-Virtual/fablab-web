import { GridColDef } from "@mui/x-data-grid";
import { API_PARTICIPANTE_PATH, ROLE } from "../../config";
import BasicCrudLayout from "../../layouts/BasicCrudLayout";
import ParticipanteModal from "../../components/modals/ParticipanteModal";
import { useAuth } from "../../providers/AuthProvider";

export default function Participantes() {
  const { claims } = useAuth();

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
      field: "tipoDocumento",
      headerName: "Tipo de Documento",
      valueGetter: (tipoDocumento: any) => tipoDocumento.descripcion,
      flex: 2,
    },
    {
      field: "colegio",
      headerName: "Colegio",
      valueGetter: (colegio: any) => colegio.nombre,
      flex: 2,
    },
  ];

  return (
    <BasicCrudLayout
      apiPath={API_PARTICIPANTE_PATH}
      columns={columns}
      title="Participantes"
      EntityModal={ParticipanteModal}
      enableCreate={claims ? [ROLE.ADMIN].includes(claims.rol) : false}
      enableDelete={claims ? [ROLE.ADMIN].includes(claims.rol) : false}
    />
  );
}
