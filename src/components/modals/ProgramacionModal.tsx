import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import {
  API_COLEGIO_PATH,
  API_INSTRUCTOR_PATH,
  API_PROGRAMACION_PATH,
  API_UBICACION_PATH,
} from "../../config";
import { Colegio } from "../../types/Colegio";
import { useService } from "../../hooks/useService";
import { getEntity, getEntityById } from "../../services/BackendService";
import Select from "../Select";
import { useEffect } from "react";
import { Programacion, ProgramacionForm } from "../../types/Programacion";
import { Instructor } from "../../types/Instructor";
import { Ubicacion } from "../../types/Ubicacion";
import EntityModalProps from "./types/EntityModalProps";

export default function ProgramacionModal({
  open,
  mode,
  enableDelete,
  id,
  parentId,
  setOpen,
  triggerRefresh,
}: EntityModalProps) {
  const { data: programacion } = useService(async () => {
    if (id) {
      return await getEntityById<Programacion>(API_PROGRAMACION_PATH, id);
    }
  }, [API_PROGRAMACION_PATH, id]);

  const { data: colegios } = useService(async () => {
    return await getEntity<Colegio>(API_COLEGIO_PATH);
  }, [API_COLEGIO_PATH]);

  const { data: instructores } = useService(async () => {
    return await getEntity<Instructor>(API_INSTRUCTOR_PATH);
  }, [API_INSTRUCTOR_PATH]);

  const { data: ubicaciones } = useService(async () => {
    return await getEntity<Ubicacion>(API_UBICACION_PATH);
  }, [API_UBICACION_PATH]);

  const formMethods = useForm<ProgramacionForm>();

  useEffect(() => {
    if (programacion) {
      formMethods.reset({
        tallerId: programacion.taller.id,
        fechaInicio: programacion.fechaInicio,
        fechaFin: programacion.fechaFin,
        cantidad: programacion.cantidad,
        grado: programacion.grado,
        grupo: programacion.grupo,
        observaciones: programacion.observaciones,
        colegioId: programacion.colegio.id,
        instructorId: programacion.instructor.id,
        ubicacionId: programacion.ubicacion.id,
      });
    } else if (parentId) {
      formMethods.reset({
        tallerId: parentId,
      });
    }
  }, [programacion]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_PROGRAMACION_PATH}
      createSucessMsg="Programación creada con éxito"
      editSucessMsg="Programación editada con éxito"
      deleteSucessMsg="Programación eliminada con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Programación"
          : mode === "create"
          ? "Crear Programación"
          : ""
      }
    >
      <div className="grid lg:grid-cols-3 gap-5">
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
        <Input label="Fecha de Inicio" name="fechaInicio" />
        <Input label="Fecha de Fin" name="fechaFin" />
        <Input label="Cantidad" name="cantidad" />
        <Select name="colegioId" label="Colegio">
          {colegios?.map((colegio, i) => {
            return (
              <option value={colegio.id} key={i}>
                {colegio.nombre}
              </option>
            );
          })}
        </Select>
        <Input label="Grado" name="grado" />
        <Input label="Grupo" name="grupo" />
      </div>
      <Input label="Observaciones" name="observaciones" type="textarea" />
    </FormModal>
  );
}
