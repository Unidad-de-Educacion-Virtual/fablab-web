import { useMemo, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useService } from "../../hooks/useService";
import ContentLayout from "../../layouts/ContentLayout";
import { getEntity } from "../../services/BackendService";
import { API_UBICACION_PATH } from "../../config";
import { Ubicacion } from "../../types/Ubicacion";
import UbicacionModal from "../../components/modals/UbicacionModal";

export default function Ubicaciones() {
  const {
    data: ubicaciones,
    loading,
    refresh,
  } = useService(async () => await getEntity<Ubicacion>(API_UBICACION_PATH));
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(0);

  const tableHead = ["id", "Nombre", "Acción"];
  const tableData = useMemo(() => {
    if (!ubicaciones) {
      return [];
    }

    return ubicaciones.map((ubicacion) => [
      ubicacion.id,
      ubicacion.nombre,
      <Button
        text="Editar"
        onClick={() => handleEdit(ubicacion.id)}
        icon="material-symbols:edit-outline-rounded"
        variant="light"
      />,
    ]);
  }, [ubicaciones]);

  function handleEdit(id: number) {
    setEditItemId(id);
    setEditModal(true);
  }

  return (
    <ContentLayout
      button={
        <Button
          text="Crear"
          icon="material-symbols:add-rounded"
          onClick={() => setCreateModal(true)}
        />
      }
      title="Ubicaciones"
    >
      <UbicacionModal
        mode="create"
        open={createModal}
        setOpen={setCreateModal}
        triggerRefresh={refresh}
      />

      <UbicacionModal
        mode="edit"
        enableDelete={true}
        open={editModal}
        setOpen={setEditModal}
        triggerRefresh={refresh}
        id={editItemId}
      />

      <Table head={tableHead} data={tableData} loading={loading} />
    </ContentLayout>
  );
}
