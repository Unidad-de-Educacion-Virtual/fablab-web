import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import { API_MUNICIPIO_PATH } from "../../config";
import { Municipio, MunicipioForm } from "../../types/Municipio";
import { useService } from "../../hooks/useService";
import { getEntityById } from "../../services/BackendService";
import { useEffect } from "react";
import EntityModalProps from "./types/EntityModalProps";

export default function MunicipioModal({
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
  const { data: municipio } = useService(async () => {
    if (id) {
      return await getEntityById<Municipio>(API_MUNICIPIO_PATH, id);
    }
  }, [API_MUNICIPIO_PATH, id]);

  const formMethods = useForm<MunicipioForm>();

  useEffect(() => {
    if (municipio) {
      formMethods.reset({
        nombre: municipio.nombre,
        dane: municipio.dane,
      });
    }
  }, [municipio]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_MUNICIPIO_PATH}
      createSucessMsg="Municipio creado con éxito"
      editSucessMsg="Municipio editado con éxito"
      deleteSucessMsg="Municipio eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Municipio"
          : mode === "create"
          ? "Crear Municipio"
          : ""
      }
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    >
      <Input label="Nombre" name="nombre" />
      <Input label="Dane" name="dane" />
    </FormModal>
  );
}
