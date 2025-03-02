import { useService } from "../../hooks/useService";
import TallerModal from "../../components/modals/TallerModal";
import { getEntityById } from "../../services/BackendService";
import { API_TALLER_PATH, ROLE } from "../../config";
import { Taller } from "../../types/Taller";
import PropertyValue from "../../components/PropertyValue";
import InformationLayout from "../../layouts/Informationlayout";
import { useAuth } from "../../providers/AuthProvider";

interface TallerSectionProps {
  id: number;
}

export default function TallerSection({ id }: TallerSectionProps) {
  const { token, claims } = useAuth();
  const { data: taller, refresh } = useService(
    async () => await getEntityById<Taller>(API_TALLER_PATH, id, token),
    [id]
  );

  return (
    <InformationLayout
      entityId={id}
      EntityModal={TallerModal}
      refresh={refresh}
      enableEdit={claims ? [ROLE.ADMIN].includes(claims.rol) : false}
    >
      <div className="grid gap-4">
        <PropertyValue
          name="Nombre"
          value={taller?.nombre}
          icon="material-symbols:book-2-rounded"
          color="text-red-600"
        />

        <PropertyValue
          name="Descripción"
          value={taller?.descripcion}
          icon="material-symbols:chat-rounded"
          color="text-orange-600"
        />
      </div>
    </InformationLayout>
  );
}
