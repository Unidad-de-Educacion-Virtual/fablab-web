import { useMemo, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useService } from "../../hooks/useService";
import { Link } from "react-router-dom";
import TallerModal from "../../components/modals/TallerModal";
import ContentLayout from "../../layouts/ContentLayout";
import { getEntity } from "../../services/BackendService";
import { API_TALLER_PATH } from "../../config";
import { Taller } from "../../types/Taller";

export default function Talleres() {
  const {
    data: talleres,
    loading,
    refresh,
  } = useService(async () => getEntity<Taller>(API_TALLER_PATH));
  const [createModal, setCreateModal] = useState(false);

  const tableHead = ["id", "Nombre", "Descripción", "Acción"];
  const tableData = useMemo(() => {
    if (!talleres) {
      return [];
    }

    return talleres.map((taller) => [
      taller.id,
      taller.nombre,
      taller.descripcion,
      <Link to={`${taller.id}`}>
        <Button text="Ver" icon="ic:outline-remove-red-eye" variant="light" />
      </Link>,
    ]);
  }, [talleres]);

  return (
    <ContentLayout
      button={
        <Button
          text="Crear"
          icon="material-symbols:add-rounded"
          onClick={() => setCreateModal(true)}
        />
      }
      title="Talleres"
    >
      <TallerModal
        mode="create"
        open={createModal}
        setOpen={setCreateModal}
        triggerRefresh={refresh}
      />

      <Table head={tableHead} data={tableData} loading={loading} />
    </ContentLayout>
  );
}
