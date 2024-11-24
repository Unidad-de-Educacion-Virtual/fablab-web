import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { API_TIPO_DOCUMENTO_PATH } from "../../config";
import { TipoDocumento, TipoDocumentoForm } from "../../types/TipoDocumento";
import { getEntityById } from "../../services/BackendService";
import { useService } from "../../hooks/useService";
import { useEffect } from "react";
import FormModal from "./FormModal";
import EntityModalProps from "./types/EntityModalProps";

export default function TipoDocumentoModal({
  open,
  mode,
  enableDelete,
  id,
  setOpen,
  triggerRefresh,
}: EntityModalProps) {
  const { data: tipoDocumento } = useService(async () => {
    if (id) {
      return await getEntityById<TipoDocumento>(API_TIPO_DOCUMENTO_PATH, id);
    }
  }, [API_TIPO_DOCUMENTO_PATH, id]);

  const formMethods = useForm<TipoDocumentoForm>();

  useEffect(() => {
    if (tipoDocumento) {
      formMethods.reset({
        descripcion: tipoDocumento.descripcion,
      });
    }
  }, [tipoDocumento]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_TIPO_DOCUMENTO_PATH}
      createSucessMsg="Tipo de Documento creado con éxito"
      editSucessMsg="Tipo de Documento editado con éxito"
      deleteSucessMsg="Tipo de Documento eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Tipo de Documento"
          : mode === "create"
          ? "Crear Tipo de Documento"
          : ""
      }
    >
      <Input type="textarea" label="Descripcion" name="descripcion" />
    </FormModal>
  );
}
