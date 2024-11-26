import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import {
  API_INSCRIPCION_PATH,
  API_PARTICIPANTE_PATH,
  API_PROGRAMACION_PATH,
} from "../../config";
import { useService } from "../../hooks/useService";
import { getEntity, getEntityById } from "../../services/BackendService";
import Select from "../Select";
import { useEffect } from "react";
import EntityModalProps from "./types/EntityModalProps";
import { Inscripcion, InscripcionForm } from "../../types/Inscripcion";
import { Participante } from "../../types/Participante";
import { Programacion } from "../../types/Programacion";

export default function InscripcionModal({
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
  const { data: inscripcion } = useService(async () => {
    if (id) {
      return await getEntityById<Inscripcion>(API_INSCRIPCION_PATH, id);
    }
  }, [API_INSCRIPCION_PATH, id]);

  const { data: programaciones } = useService(async () => {
    return await getEntity<Programacion>(API_PROGRAMACION_PATH);
  }, [API_PROGRAMACION_PATH]);

  const { data: participantes } = useService(async () => {
    return await getEntity<Participante>(API_PARTICIPANTE_PATH);
  }, [API_PARTICIPANTE_PATH]);

  const formMethods = useForm<InscripcionForm>();

  useEffect(() => {
    if (inscripcion) {
      formMethods.reset({
        fecha: inscripcion.fecha,
        participanteId: inscripcion.participante.id,
        programacionId: inscripcion.programacion.id,
      });
    } else if (parentId) {
      formMethods.reset({
        programacionId: parentId,
      });
    }
  }, [inscripcion]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_INSCRIPCION_PATH}
      createSucessMsg="Inscripción creada con éxito"
      editSucessMsg="Inscripción editada con éxito"
      deleteSucessMsg="Inscripción eliminada con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Inscripción"
          : mode === "create"
          ? "Crear Inscripción"
          : ""
      }
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    >
      <Input label="Fecha" name="fecha" type="date" />
      {!parentId && (
        <Select name="programacionId" label="Programación">
          {programaciones?.map((programacion, i) => {
            return (
              <option value={programacion.id} key={i}>
                {programacion.taller.nombre} - {programacion.fechaInicio}
              </option>
            );
          })}
        </Select>
      )}
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
