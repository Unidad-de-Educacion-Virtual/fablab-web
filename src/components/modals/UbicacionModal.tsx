import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import { API_UBICACION_PATH } from "../../config";
import { UbicacionForm } from "../../types/Ubicacion";

interface UbicacionModalProps {
  open: boolean;
  mode: "edit" | "create";
  enableDelete?: boolean;
  id?: number;
  setOpen: (open: boolean) => void;
  triggerRefresh?: () => void;
}

export default function UbicacionModal({
  open,
  mode,
  enableDelete,
  id,
  setOpen,
  triggerRefresh,
}: UbicacionModalProps) {
  const { register, handleSubmit, reset } = useForm<UbicacionForm>();

  return (
    <FormModal
      handleSubmit={handleSubmit}
      reset={reset}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_UBICACION_PATH}
      createSucessMsg="Ubicación creada con éxito"
      editSucessMsg="Ubicación editada con éxito"
      deleteSucessMsg="Ubicación eliminada con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Ubicación"
          : mode === "create"
          ? "Crear Ubicación"
          : ""
      }
    >
      <Input label="Nombre" name="nombre" registerData={register("nombre")} />
    </FormModal>
  );
}
