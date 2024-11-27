import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import { API_EVIDENCIA_PATH } from "../../config";
import { useService } from "../../hooks/useService";
import { getEntityById } from "../../services/BackendService";
import { useEffect } from "react";
import EntityModalProps from "./types/EntityModalProps";
import { Evidencia, EvidenciaForm } from "../../types/Evidencia";
import Input from "../Input";
import { useAuth } from "../../providers/AuthProvider";

export default function EvidenciaModal({
  open,
  mode,
  enableDelete,
  id,
  parentId,
  setOpen,
  triggerRefresh,
  onCreate,
  onDelete,
  onEdit,
}: EntityModalProps) {
  const { token } = useAuth();

  const { data: evidencia } = useService(async () => {
    if (id) {
      return await getEntityById<Evidencia>(API_EVIDENCIA_PATH, id, token);
    }
  }, [API_EVIDENCIA_PATH, id]);

  const formMethods = useForm<EvidenciaForm>();

  useEffect(() => {
    if (evidencia) {
      formMethods.reset({
        sesionId: evidencia.sesion.id,
        observacion: evidencia.observacion,
        url: evidencia.url,
      });
    } else if (parentId) {
      formMethods.reset({
        sesionId: parentId,
      });
    }
  }, [evidencia]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_EVIDENCIA_PATH}
      createSucessMsg="Evidencia agregada con éxito"
      editSucessMsg="Evidencia editada con éxito"
      deleteSucessMsg="Evidencia eliminada con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Evidencia"
          : mode === "create"
          ? "Agregar Evidencia"
          : ""
      }
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    >
      <Input label="Archivo" name="url" />
      <Input label="Observación" name="observacion" type="textarea" />
    </FormModal>
  );
}
