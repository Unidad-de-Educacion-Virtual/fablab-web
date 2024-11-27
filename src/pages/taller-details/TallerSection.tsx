import { useService } from "../../hooks/useService";
import TallerModal from "../../components/modals/TallerModal";
import { getEntityById } from "../../services/BackendService";
import { API_TALLER_PATH } from "../../config";
import { Taller } from "../../types/Taller";
import PropertyValue from "../../components/PropertyValue";
import InformationLayout from "../../layouts/Informationlayout";
import { useAuth } from "../../providers/AuthProvider";

interface TallerSectionProps {
  id: number;
}

export default function TallerSection({ id }: TallerSectionProps) {
  const { token } = useAuth();
  const { data: taller, refresh } = useService(
    async () => await getEntityById<Taller>(API_TALLER_PATH, id, token),
    [id]
  );

  return (
    <InformationLayout
      entityId={id}
      EntityModal={TallerModal}
      refresh={refresh}
    >
      <PropertyValue name="Nombre" value={taller?.nombre} />
      <PropertyValue name="Descripción" value={taller?.descripcion} />
    </InformationLayout>
  );
}
