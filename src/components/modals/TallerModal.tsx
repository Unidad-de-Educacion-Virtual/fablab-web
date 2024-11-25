import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { API_TALLER_PATH } from "../../config";
import { Taller, TallerForm } from "../../types/Taller";
import FormModal from "./FormModal";
import EntityModalProps from "./types/EntityModalProps";
import { getEntityById } from "../../services/BackendService";
import { useService } from "../../hooks/useService";
import { useEffect } from "react";

export default function TallerModal({
  open,
  mode,
  enableDelete,
  setOpen,
  triggerRefresh,
  id,
  onDelete,
  onCreate,
  onEdit,
}: EntityModalProps) {
  const { data: taller } = useService(async () => {
    if (id) {
      return await getEntityById<Taller>(API_TALLER_PATH, id);
    }
  }, [API_TALLER_PATH, id]);
  const formMethods = useForm<TallerForm>();

  useEffect(() => {
    if (taller) {
      formMethods.reset({
        nombre: taller.nombre,
        descripcion: taller.descripcion,
      });
    }
  }, [taller]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_TALLER_PATH}
      createSucessMsg="Taller creado con éxito"
      editSucessMsg="Taller editado con éxito"
      deleteSucessMsg="Taller eliminado con éxito"
      enableDelete={enableDelete}
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
      title={
        mode === "edit"
          ? "Editar Taller"
          : mode === "create"
          ? "Crear Taller"
          : ""
      }
    >
      <Input label="Nombre" name="nombre" />
      <Input name="descripcion" label="Descripción" type="textarea" />
    </FormModal>
  );
}
