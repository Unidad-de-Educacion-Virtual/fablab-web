import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import Input from "../../components/Input";
import { API_INSTRUCTOR_PATH } from "../../config";
import { InstructorForm } from "../../types/Instructor";

interface InstructorModalProps {
  open: boolean;
  mode: "edit" | "create";
  enableDelete?: boolean;
  id?: number;
  setOpen: (open: boolean) => void;
  triggerRefresh?: () => void;
}

export default function InstructorModal({
  open,
  mode,
  enableDelete,
  id,
  setOpen,
  triggerRefresh,
}: InstructorModalProps) {
  const { register, handleSubmit, reset } = useForm<InstructorForm>();

  return (
    <FormModal
      handleSubmit={handleSubmit}
      reset={reset}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_INSTRUCTOR_PATH}
      createSucessMsg="Instructor creado con éxito"
      editSucessMsg="Instructor editado con éxito"
      deleteSucessMsg="Instructor eliminado con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Instructor"
          : mode === "create"
          ? "Crear Instructor"
          : ""
      }
    >
      <Input label="Nombre" name="nombre" registerData={register("nombre")} />
      <Input
        label="Documento"
        name="documento"
        registerData={register("documento")}
      />
    </FormModal>
  );
}
