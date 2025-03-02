import { useService } from "../../hooks/useService";
import { getEntityById } from "../../services/BackendService";
import { API_PROGRAMACION_PATH, ROLE } from "../../config";
import PropertyValue from "../../components/PropertyValue";
import InformationLayout from "../../layouts/Informationlayout";
import { Programacion } from "../../types/Programacion";
import ProgramacionModal from "../../components/modals/ProgramacionModal";
import { useAuth } from "../../providers/AuthProvider";

interface ProgramacionSectionProps {
  id: number;
}

export default function ProgramacionSection({ id }: ProgramacionSectionProps) {
  const { token, claims } = useAuth();

  const { data: programacion, refresh } = useService(
    async () =>
      await getEntityById<Programacion>(API_PROGRAMACION_PATH, id, token),
    [id]
  );

  return (
    <InformationLayout
      entityId={id}
      EntityModal={ProgramacionModal}
      refresh={refresh}
      enableEdit={claims ? [ROLE.ADMIN].includes(claims.rol) : false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        <PropertyValue
          name="Taller"
          value={programacion?.taller?.nombre}
          icon="material-symbols:book-2-rounded"
          color="text-red-600"
        />
        <PropertyValue
          name="Instructor"
          value={programacion?.instructor.nombre}
          icon="material-symbols:person-rounded"
          color="text-orange-600"
        />
        <PropertyValue
          name="Ubicación"
          value={programacion?.ubicacion.nombre}
          icon="material-symbols:location-city-rounded"
          color="text-amber-600"
        />
        <div className="flex gap-4">
          <PropertyValue
            name="Inicio"
            value={programacion?.fechaInicio}
            icon="material-symbols:calendar-clock-rounded"
            color="text-yellow-600"
          />
          <PropertyValue name="Fin" value={programacion?.fechaFin} />
        </div>
        <PropertyValue
          name="Cantidad de Cupos"
          value={programacion?.cantidad}
          icon="material-symbols:chair-alt-rounded"
          color="text-lime-600"
        />
        <div className="flex gap-4">
          <PropertyValue
            name="Colegio"
            value={programacion?.colegio.nombre}
            icon="material-symbols:school-rounded"
            color="text-green-600"
          />
          <PropertyValue name="Grado" value={programacion?.grado} />
          <PropertyValue name="Grupo" value={programacion?.grupo} />
        </div>

        <PropertyValue
          className="col-span-1 md:col-span-2 xl:col-span-3 2xl:col-span-4"
          name="Observaciones"
          value={programacion?.observacion}
          icon="material-symbols:chat-rounded"
          color="text-emerald-600"
        />
      </div>
    </InformationLayout>
  );
}
