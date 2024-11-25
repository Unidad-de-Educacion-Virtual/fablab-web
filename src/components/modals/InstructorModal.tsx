import { useForm } from "react-hook-form";

import Input from "../../components/Input";
import { API_INSTRUCTOR_PATH } from "../../config";
import { Instructor, InstructorForm } from "../../types/Instructor";
import FormModal from "./FormModal";
import { getEntityById } from "../../services/BackendService";
import { useService } from "../../hooks/useService";
import { useEffect } from "react";
import EntityModalProps from "./types/EntityModalProps";

export default function InstructorModal({
  open,
  mode,
  enableDelete,
  id,
  setOpen,
  triggerRefresh,
  onCreate,
  onDelete,
  onEdit,
}: EntityModalProps) {
  const { data: instructor } = useService(async () => {
    if (id) {
      return await getEntityById<Instructor>(API_INSTRUCTOR_PATH, id);
    }
  }, [API_INSTRUCTOR_PATH, id]);

  const formMethods = useForm<InstructorForm>();

  useEffect(() => {
    if (instructor) {
      formMethods.reset({
        nombre: instructor.nombre,
        documento: instructor.documento,
      });
    }
  }, [instructor]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_INSTRUCTOR_PATH}
      createSucessMsg="Instructor creado con éxito"
      editSucessMsg="Instructor editado con éxito"
      deleteSucessMsg="Instructor eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Instructor"
          : mode === "create"
          ? "Crear Instructor"
          : ""
      }
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    >
      <Input label="Nombre" name="nombre" />
      <Input label="Documento" name="documento" />
    </FormModal>
  );
}
