import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import {
  API_ASISTENTE_PATH,
  API_PARTICIPANTE_PATH,
  API_SESION_PATH,
} from "../../config";
import { useService } from "../../hooks/useService";
import { getEntity, getEntityById } from "../../services/BackendService";
import Select from "../Select";
import { useEffect } from "react";
import EntityModalProps from "./types/EntityModalProps";
import { Asistente, AsistenteForm } from "../../types/Asistente";
import { Participante } from "../../types/Participante";

export default function AsistenteModal({
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
  const { data: asistente } = useService(async () => {
    if (id) {
      return await getEntityById<Asistente>(API_ASISTENTE_PATH, id);
    }
  }, [API_ASISTENTE_PATH, id]);

  const { data: participantes } = useService(async () => {
    return await getEntity<Participante>(API_PARTICIPANTE_PATH);
  }, [API_PARTICIPANTE_PATH]);

  const formMethods = useForm<AsistenteForm>();

  useEffect(() => {
    if (asistente) {
      formMethods.reset({
        sesionId: asistente.sesion.id,
        participanteId: asistente.participante.id,
      });
    } else if (parentId) {
      formMethods.reset({
        sesionId: parentId,
      });
    }
  }, [asistente]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_SESION_PATH}
      createSucessMsg="Asistente agregado con éxito"
      editSucessMsg="Asistente editado con éxito"
      deleteSucessMsg="Asistente eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Asistente"
          : mode === "create"
          ? "Agregar Asistente"
          : ""
      }
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    >
      <Select name="participanteId" label="Participante">
        {participantes?.map((participante, i) => {
          return (
            <option value={participante.id} key={i}>
              {participante.nombre}
            </option>
          );
        })}
      </Select>
    </FormModal>
  );
}
