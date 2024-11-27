import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import {
  API_INSTRUCTOR_PATH,
  API_SESION_PATH,
  API_UBICACION_PATH,
} from "../../config";
import { useService } from "../../hooks/useService";
import { getEntity, getEntityById } from "../../services/BackendService";
import Select from "../Select";
import { useEffect } from "react";
import { Instructor } from "../../types/Instructor";
import { Ubicacion } from "../../types/Ubicacion";
import EntityModalProps from "./types/EntityModalProps";
import { Sesion, SesionForm } from "../../types/Sesion";
import { useAuth } from "../../providers/AuthProvider";

export default function SesionModal({
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

  const { data: sesion } = useService(async () => {
    if (id) {
      return await getEntityById<Sesion>(API_SESION_PATH, id, token);
    }
  }, [API_SESION_PATH, id]);

  const { data: instructores } = useService(async () => {
    return await getEntity<Instructor>(API_INSTRUCTOR_PATH, "", token);
  }, [API_INSTRUCTOR_PATH]);

  const { data: ubicaciones } = useService(async () => {
    return await getEntity<Ubicacion>(API_UBICACION_PATH, "", token);
  }, [API_UBICACION_PATH]);

  const formMethods = useForm<SesionForm>();

  useEffect(() => {
    if (sesion) {
      formMethods.reset({
        fecha: sesion.fecha,
        hora: sesion.hora,
        instructorId: sesion.instructor.id,
        programacionId: sesion.programacion.id,
        ubicacionId: sesion.ubicacion.id,
      });
    } else if (parentId) {
      formMethods.reset({
        programacionId: parentId,
      });
    }
  }, [sesion]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_SESION_PATH}
      createSucessMsg="Sesión creada con éxito"
      editSucessMsg="Sesión editada con éxito"
      deleteSucessMsg="Sesión eliminada con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Sesión"
          : mode === "create"
          ? "Crear Sesión"
          : ""
      }
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    >
      <Input label="Fecha" name="fecha" type="date" />
      <Input label="Hora" name="hora" type="time" />
      <Select name="instructorId" label="Instructor">
        {instructores?.map((instructor, i) => {
          return (
            <option value={instructor.id} key={i}>
              {instructor.nombre}
            </option>
          );
        })}
      </Select>
      <Select name="ubicacionId" label="Ubicación">
        {ubicaciones?.map((ubicacion, i) => {
          return (
            <option value={ubicacion.id} key={i}>
              {ubicacion.nombre}
            </option>
          );
        })}
      </Select>
    </FormModal>
  );
}
