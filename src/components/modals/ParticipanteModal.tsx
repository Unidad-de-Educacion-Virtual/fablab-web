import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import {
  API_COLEGIO_PATH,
  API_PARTICIPANTE_PATH,
  API_TIPO_DOCUMENTO_PATH,
} from "../../config";
import { Colegio } from "../../types/Colegio";
import { useService } from "../../hooks/useService";
import { getEntity, getEntityById } from "../../services/BackendService";
import { Participante, ParticipanteForm } from "../../types/Participante";
import Select from "../Select";
import { useEffect } from "react";
import { TipoDocumento } from "../../types/TipoDocumento";
import EntityModalProps from "./types/EntityModalProps";
import { useAuth } from "../../providers/AuthProvider";

export default function ParticipanteModal({
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
  const { token } = useAuth();

  const { data: participante } = useService(async () => {
    if (id) {
      return await getEntityById<Participante>(
        API_PARTICIPANTE_PATH,
        id,
        token
      );
    }
  }, [API_PARTICIPANTE_PATH, id]);

  const { data: colegios } = useService(async () => {
    return await getEntity<Colegio>(API_COLEGIO_PATH, "", token);
  }, [API_COLEGIO_PATH]);

  const { data: tiposDocumento } = useService(async () => {
    return await getEntity<TipoDocumento>(API_TIPO_DOCUMENTO_PATH, "", token);
  }, [API_TIPO_DOCUMENTO_PATH]);

  const formMethods = useForm<ParticipanteForm>();

  useEffect(() => {
    if (participante) {
      formMethods.reset({
        nombre: participante.nombre,
        colegioId: participante.colegio.id,
        tipoDocumentoId: participante.tipoDocumento.id,
      });
    }
  }, [participante]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_PARTICIPANTE_PATH}
      createSucessMsg="Participante creado con éxito"
      editSucessMsg="Participante editado con éxito"
      deleteSucessMsg="Participante eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Participante"
          : mode === "create"
          ? "Crear Participante"
          : ""
      }
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    >
      <Input label="Nombre" name="nombre" />
      <Select label="Tipo de Documento" name="tipoDocumentoId">
        {tiposDocumento?.map((tipoDocumento, i) => {
          return (
            <option value={tipoDocumento.id} key={i}>
              {tipoDocumento.descripcion}
            </option>
          );
        })}
      </Select>
      <Select label="Colegio" name="colegioId">
        {colegios?.map((colegio, i) => {
          return (
            <option value={colegio.id} key={i}>
              {colegio.nombre}
            </option>
          );
        })}
      </Select>
    </FormModal>
  );
}
