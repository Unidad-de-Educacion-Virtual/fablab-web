import { GridColDef } from "@mui/x-data-grid";
import { API_SESION_PATH } from "../../config";
import { useService } from "../../hooks/useService";
import { useAuth } from "../../providers/AuthProvider";
import { getEntity } from "../../services/BackendService";
import { useMemo } from "react";
import DataTable from "../../components/DataTable";
import { Sesion } from "../../types/Sesion";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Taller } from "../../types/Taller";
import { Instructor } from "../../types/Instructor";

export default function UltimasSesiones() {
  const { token } = useAuth();
  const { data: sesiones } = useService(
    async () => await getEntity<Sesion>(API_SESION_PATH, "reciente=true", token)
  );

  const columns: GridColDef[] = [
    {
      field: "taller",
      headerName: "Taller",
      valueGetter: (taller: Taller) => taller.nombre,
      flex: 2,
    },
    {
      field: "fechaHora",
      headerName: "Fecha",
      type: "dateTime",
      flex: 2,
    },
    {
      field: "instructor",
      headerName: "Instructor",
      valueGetter: (instructor: Instructor) => instructor.nombre,
      flex: 2,
    },
    {
      field: "cantidadEvidencias",
      headerName: "Evidencias",
      type: "number",
      flex: 1,
    },
    {
      field: "totalAsistentes",
      headerName: "Asistentes",
      type: "number",
      flex: 1,
    },
    {
      field: "",
      headerName: "Acción",
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => (
        <Link
          to={`/talleres/${params.row.taller.id}/programaciones/${params.row.programacion.id}/sesiones/${params.row.id}`}
        >
          <Button
            text="Ver"
            icon="ic:outline-remove-red-eye"
            variant="no-background"
          />
        </Link>
      ),
      flex: 1,
    },
  ];

  const rows = useMemo(() => {
    if (!sesiones) {
      return [];
    }

    return sesiones.map((sesion: Sesion) => {
      return {
        ...sesion,
        fechaHora: new Date(`${sesion.fecha}T${sesion.hora}:00`),
      };
    });
  }, [sesiones]);

  return (
    <div className="grid w-full gap-4">
      <h2 className="font-bold text-xl">Últimas Sesiones</h2>
      <div className="w-full flex justify-center">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}
