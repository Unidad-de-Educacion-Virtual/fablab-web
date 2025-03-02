import { useService } from "../../hooks/useService";
import { getEntityById } from "../../services/BackendService";
import { API_SESION_PATH, ROLE } from "../../config";
import PropertyValue from "../../components/PropertyValue";
import InformationLayout from "../../layouts/Informationlayout";
import { Sesion } from "../../types/Sesion";
import SesionModal from "../../components/modals/SesionModal";
import { useAuth } from "../../providers/AuthProvider";

interface SesionSectionProps {
  id: number;
}

export default function SesionSection({ id }: SesionSectionProps) {
  const { token, claims } = useAuth();
  const { data: sesion, refresh } = useService(
    async () => await getEntityById<Sesion>(API_SESION_PATH, id, token),
    [id]
  );

  return (
    <InformationLayout
      entityId={id}
      EntityModal={SesionModal}
      refresh={refresh}
      enableEdit={claims ? [ROLE.ADMIN].includes(claims.rol) : false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        <div className="flex gap-4">
          <PropertyValue
            name="Fecha"
            value={sesion?.fecha}
            icon="material-symbols:calendar-clock-rounded"
            color="text-red-600"
          />
          <PropertyValue name="Hora" value={sesion?.hora} />
        </div>
        <PropertyValue
          name="Instructor"
          value={sesion?.instructor.nombre}
          icon="material-symbols:person-rounded"
          color="text-orange-600"
        />
        <PropertyValue
          name="Ubicación"
          value={sesion?.ubicacion.nombre}
          icon="material-symbols:location-city-rounded"
          color="text-amber-600"
        />
        <PropertyValue
          name="Total de Asistentes"
          value={sesion?.totalAsistentes}
          icon="material-symbols:chair-alt-rounded"
          color="text-yellow-600"
        />
      </div>
    </InformationLayout>
  );
}
