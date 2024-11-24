import { useMemo, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useService } from "../../hooks/useService";
import ContentLayout from "../../layouts/ContentLayout";
import { getEntity } from "../../services/BackendService";
import InstructorModal from "../../components/modals/InstructorModal";
import { API_INSTRUCTOR_PATH } from "../../config";
import { Instructor } from "../../types/Instructor";

export default function Instructores() {
  const {
    data: instructores,
    loading,
    refresh,
  } = useService(async () => await getEntity<Instructor>(API_INSTRUCTOR_PATH));
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(0);

  const tableHead = ["id", "Nombre", "Documento", "Acción"];
  const tableData = useMemo(() => {
    if (!instructores) {
      return [];
    }

    return instructores.map((instructor) => [
      instructor.id,
      instructor.nombre,
      instructor.documento,
      <Button
        text="Editar"
        onClick={() => handleEdit(instructor.id)}
        icon="material-symbols:edit-outline-rounded"
        variant="light"
      />,
    ]);
  }, [instructores]);

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
      title="Instructores"
    >
      <InstructorModal
        mode="create"
        open={createModal}
        setOpen={setCreateModal}
        triggerRefresh={refresh}
      />

      <InstructorModal
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
