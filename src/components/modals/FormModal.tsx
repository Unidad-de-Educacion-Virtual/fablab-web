import { Toaster, toast } from "sonner";
import Button from "../../components/Button";
import CustomModal from "./CustomModal";
import {
  SubmitHandler,
  FieldValues,
  UseFormReset,
  UseFormHandleSubmit,
} from "react-hook-form";

import {
  createEntity,
  deleteEntity,
  getEntityById,
  updateEntity,
} from "../../services/BackendService";
import { ReactNode, useEffect } from "react";
import { useService } from "../../hooks/useService";

interface FormModalProps<T extends FieldValues> {
  open: boolean;
  baseApiPath: string;
  mode: "edit" | "create";
  title: string;
  createSucessMsg: string;
  editSucessMsg: string;
  deleteSucessMsg?: string;
  children: ReactNode;
  setOpen: (open: boolean) => void;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
  entityId?: number;
  enableDelete?: boolean;
  triggerRefresh?: () => void;
}

export default function FormModal<T extends FieldValues, U>({
  open,
  setOpen,
  mode,
  entityId,
  triggerRefresh,
  children,
  baseApiPath,
  editSucessMsg,
  createSucessMsg,
  deleteSucessMsg,
  title,
  handleSubmit,
  reset,
  enableDelete,
}: FormModalProps<T>) {
  const { data: entity } = useService(async () => {
    if (!entityId) {
      return;
    }

    return await getEntityById<U>(baseApiPath, entityId);
  }, [baseApiPath, entityId]);

  useEffect(() => {
    if (entityId) {
      console.log(entity);
      reset(entity as T);
    }
  }, [entity]);

  async function handleEvent(
    operation: "edit" | "create" | "delete",
    data?: T
  ) {
    try {
      let entity = null;

      if (operation === "create" && data) {
        entity = await createEntity<T, U>(baseApiPath, data);
      }

      if (operation === "edit" && entityId && data) {
        entity = await updateEntity<T, U>(baseApiPath, entityId, data);
      }

      if (operation === "delete" && entityId) {
        entity = await deleteEntity<T>(baseApiPath, entityId);
      }

      if (entity) {
        if (operation == "create") {
          toast.success(createSucessMsg);
        }

        if (operation == "edit") {
          toast.success(editSucessMsg);
        }

        if (operation == "delete") {
          toast.success(deleteSucessMsg);
        }

        setOpen(false);
        reset();

        if (triggerRefresh) {
          triggerRefresh();
        }
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  const onSubmit: SubmitHandler<T> = async (data) => {
    handleEvent(mode, data);
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <CustomModal open={open} setOpen={setOpen}>
        <h2 className="text-xl font-bold mb-6">{title}</h2>

        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          {children}
          <div className="flex justify-end gap-4">
            {enableDelete ? (
              <Button
                text="Borrar"
                icon="material-symbols:delete-outline-rounded"
                variant="light"
                onClick={() => handleEvent("delete")}
              />
            ) : (
              ""
            )}
            <Button
              type="submit"
              text="Guardar"
              icon="material-symbols:save-outline-rounded"
            />
          </div>
        </form>
      </CustomModal>
    </>
  );
}
