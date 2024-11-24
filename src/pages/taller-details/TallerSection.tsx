import { useState } from "react";
import Button from "../../components/Button";
import { useService } from "../../hooks/useService";
import TallerModal from "../../components/modals/TallerModal";
import ContentLayout from "../../layouts/ContentLayout";
import { getEntityById } from "../../services/BackendService";
import { API_TALLER_PATH } from "../../config";
import { Taller } from "../../types/Taller";

interface TallerSectionProps {
  id: number;
}

export default function TallerSection({ id }: TallerSectionProps) {
  const { data: taller, refresh } = useService(
    async () => await getEntityById<Taller>(API_TALLER_PATH, id),
    [id]
  );

  const [editModal, setEditModal] = useState(false);

  return (
    <ContentLayout
      title="Información"
      button={
        <Button
          text="Editar"
          icon="material-symbols:edit-outline-rounded"
          onClick={() => setEditModal(true)}
        />
      }
    >
      <TallerModal
        mode="edit"
        open={editModal}
        id={id}
        enableDelete={true}
        setOpen={setEditModal}
        triggerRefresh={refresh}
      />

      <div>
        <p>Nombre: {taller?.nombre}</p>
        <p>Descripcion: {taller?.descripcion}</p>
      </div>
    </ContentLayout>
  );
}
