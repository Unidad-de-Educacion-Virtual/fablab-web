import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import { API_COLEGIO_PATH, API_MUNICIPIO_PATH } from "../../config";
import { Colegio, ColegioForm } from "../../types/Colegio";
import { useService } from "../../hooks/useService";
import { getEntity, getEntityById } from "../../services/BackendService";
import { Municipio } from "../../types/Municipio";
import Select from "../Select";
import { useEffect } from "react";
import EntityModalProps from "./types/EntityModalProps";

export default function ColegioModal({
  open,
  mode,
  enableDelete,
  id,
  setOpen,
  triggerRefresh,
}: EntityModalProps) {
  const { data: colegio } = useService(async () => {
    if (id) {
      return await getEntityById<Colegio>(API_COLEGIO_PATH, id);
    }
  }, [API_COLEGIO_PATH, id]);

  const { data: municipios } = useService(async () => {
    return await getEntity<Municipio>(API_MUNICIPIO_PATH);
  }, [API_MUNICIPIO_PATH]);

  const formMethods = useForm<ColegioForm>();

  useEffect(() => {
    if (colegio) {
      formMethods.reset({
        nombre: colegio.nombre,
        dane: colegio.dane,
        municipioId: colegio.municipio.id,
      });
    }
  }, [colegio]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_COLEGIO_PATH}
      createSucessMsg="Colegio creado con éxito"
      editSucessMsg="Colegio editado con éxito"
      deleteSucessMsg="Colegio eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Colegio"
          : mode === "create"
          ? "Crear Colegio"
          : ""
      }
    >
      <Input label="Nombre" name="nombre" />
      <Input label="Dane" name="dane" />
      <Select name="municipioId" label="Municipio">
        {municipios?.map((municipio, i) => {
          return (
            <option value={municipio.id} key={i}>
              {municipio.nombre}
            </option>
          );
        })}
      </Select>
    </FormModal>
  );
}
