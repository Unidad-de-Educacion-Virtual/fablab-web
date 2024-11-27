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
      <PropertyValue name="Fecha" value={sesion?.fecha} />
      <PropertyValue name="Hora" value={sesion?.hora} />
      <PropertyValue name="Instructor" value={sesion?.instructor.nombre} />
      <PropertyValue name="Ubicación" value={sesion?.ubicacion.nombre} />
      <PropertyValue
        name="Total de Asistentes"
        value={sesion?.totalAsistentes}
      />
    </InformationLayout>
  );
}
