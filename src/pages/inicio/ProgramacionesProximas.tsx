import { GridColDef } from "@mui/x-data-grid";
import { API_PROGRAMACION_PATH } from "../../config";
import { useService } from "../../hooks/useService";
import { useAuth } from "../../providers/AuthProvider";
import { getEntity } from "../../services/BackendService";
import { Taller } from "../../types/Taller";
import { Instructor } from "../../types/Instructor";
import { Colegio } from "../../types/Colegio";
import { useMemo } from "react";
import DataTable from "../../components/DataTable";
import { Programacion } from "../../types/Programacion";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function ProgramacionesProximas() {
  const { token } = useAuth();
  const { data: programaciones } = useService(
    async () =>
      await getEntity<Programacion>(
        API_PROGRAMACION_PATH,
        "proximas=true",
        token
      )
  );

  const columns: GridColDef[] = [
    {
      field: "taller",
      headerName: "Taller",
      valueGetter: (taller: Taller) => taller.nombre,
      flex: 2,
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
      type: "date",
      flex: 2,
      valueGetter: (value) => new Date(`${value}T00:00:00`),
    },
    {
      field: "fechaFin",
      headerName: "Fecha de Fin",
      type: "date",
      flex: 2,
      valueGetter: (value) => new Date(`${value}T00:00:00`),
    },
    {
      field: "cantidadInscritos",
      headerName: "Inscripciones",
      type: "number",
      flex: 1,
    },
    {
      field: "colegio",
      headerName: "Colegio",
      valueGetter: (colegio: Colegio) => colegio.nombre,
      flex: 2,
    },
    {
      field: "",
      headerName: "Acción",
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => (
        <Link
          to={`/talleres/${params.row.taller.id}/programaciones/${params.row.id}/`}
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
    if (!programaciones) {
      return [];
    }

    return programaciones.map((entity: Programacion) => {
      return {
        ...entity,
      };
    });
  }, [programaciones]);

  return (
    <div className="grid w-full gap-4">
      <h2 className="font-bold text-xl">Programaciones Próximas y en Curso</h2>
      <div className="w-full flex justify-center">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}
