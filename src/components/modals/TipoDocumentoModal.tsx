import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import { API_TIPO_DOCUMENTO_PATH } from "../../config";
import { TipoDocumentoForm } from "../../types/TipoDocumento";

interface TipoDocumentoModalProps {
  open: boolean;
  mode: "edit" | "create";
  enableDelete?: boolean;
  id?: number;
  setOpen: (open: boolean) => void;
  triggerRefresh?: () => void;
}

export default function TipoDocumentoModal({
  open,
  mode,
  enableDelete,
  id,
  setOpen,
  triggerRefresh,
}: TipoDocumentoModalProps) {
  const { register, handleSubmit, reset } = useForm<TipoDocumentoForm>();

  return (
    <FormModal
      handleSubmit={handleSubmit}
      reset={reset}
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
      <Input
        type="textarea"
        label="Descripcion"
        name="descripcion"
        registerData={register("descripcion")}
      />
    </FormModal>
  );
}
