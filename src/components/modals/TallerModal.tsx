import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { API_TALLER_PATH } from "../../config";
import { TallerForm } from "../../types/Taller";
import FormModal from "./FormModal";

interface TallerModalProps {
  open: boolean;
  mode: "edit" | "create";
  id?: number;
  enableDelete?: boolean;
  setOpen: (open: boolean) => void;
  triggerRefresh?: () => void;
}

export default function TallerModal({
  open,
  mode,
  enableDelete,
  setOpen,
  triggerRefresh,
  id,
}: TallerModalProps) {
  const formMethods = useForm<TallerForm>();

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_TALLER_PATH}
      createSucessMsg="Taller creado con éxito"
      editSucessMsg="Taller editado con éxito"
      deleteSucessMsg="Taller eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Taller"
          : mode === "create"
          ? "Crear Taller"
          : ""
      }
    >
      <Input label="Nombre" name="nombre" />
      <Input name="descripcion" label="Descripción" type="textarea" />
    </FormModal>
  );
}
