import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
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
import { useAuth } from "../../providers/AuthProvider";
import SelectSearch from "../SelectSearch";

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
  const { token } = useAuth();

  const { data: inscripcion } = useService(async () => {
    if (id) {
      return await getEntityById<Inscripcion>(API_INSCRIPCION_PATH, id, token);
    }
  }, [API_INSCRIPCION_PATH, id]);

  const { data: inscritos } = useService(async () => {
    return await getEntity<Inscripcion>(API_INSCRIPCION_PATH, `programacionId=${parentId}`, token);
  }, [API_PARTICIPANTE_PATH]);

  const { data: programaciones } = useService(async () => {
    return await getEntity<Programacion>(API_PROGRAMACION_PATH, "", token);
  }, [API_PROGRAMACION_PATH]);

  const { data: participantes } = useService(async () => {
    return await getEntity<Participante>(API_PARTICIPANTE_PATH, "", token);
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
      <SelectSearch name="participanteId" label="Participante">
        {participantes?.filter((participante) => {
          return inscritos?.find(inscrito => inscrito.participante.id === participante.id) === undefined;
        }).map((participante, i) => {
          return (
            <option value={participante.id} key={i}>
              {participante.nombre}
            </option>
          );
        })}
      </SelectSearch>
    </FormModal>
  );
}
