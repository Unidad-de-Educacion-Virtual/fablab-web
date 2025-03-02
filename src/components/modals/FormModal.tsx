import { toast } from "sonner";
import Button from "../../components/Button";
import CustomModal from "./CustomModal";
import {
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";

import {
  createEntity,
  deleteEntity,
  updateEntity,
} from "../../services/BackendService";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";

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
  entityId?: number;
  enableDelete?: boolean;
  triggerRefresh?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onCreate?: () => void;
  type?: "formData" | "json";
  formMethods: UseFormReturn<T>;
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
  enableDelete,
  formMethods,
  type = "json",
  onDelete = () => {},
  onEdit = () => {},
  onCreate = () => {},
}: FormModalProps<T>) {
  const { token } = useAuth();

  useEffect(() => {
    if (entityId) {
      formMethods.reset();
    }
  }, [entityId]);

  async function handleEvent(
    operation: "edit" | "create" | "delete",
    data?: T
  ) {
    try {
      let entity = null;

      if (operation === "create" && data) {
        entity = await createEntity<T, U>(baseApiPath, data, token);
      }

      if (operation === "edit" && entityId && data) {
        entity = await updateEntity<T, U>(baseApiPath, entityId, data, token);
      }

      if (operation === "delete" && entityId) {
        entity = await deleteEntity<T>(baseApiPath, entityId, token);
      }

      if (entity) {
        if (operation == "create") {
          toast.success(createSucessMsg);
          onCreate();
        }

        if (operation == "edit") {
          toast.success(editSucessMsg);
          onEdit();
        }

        if (operation == "delete") {
          toast.success(deleteSucessMsg);
          onDelete();
        }

        setOpen(false);
        formMethods.reset();

        if (triggerRefresh) {
          triggerRefresh();
        }
      }
    } catch (error: any) {
      if (error.message) {
        toast.error(`${error}`);
      }
    }
  }

  const onSubmit: SubmitHandler<T> = async (data) => {
    if (type === "formData") {
      const formData = new FormData();

      for (const key in data) {
        if ((data[key] as any) instanceof FileList) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      handleEvent(mode, formData as unknown as T);
    } else {
      handleEvent(mode, data);
    }
  };

  return (
    <>
      <CustomModal open={open} setOpen={setOpen}>
        <h2 className="text-xl font-bold mb-6">{title}</h2>

        <FormProvider {...formMethods}>
          <form
            className="grid gap-5"
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            {children}
            <div className="flex gap-4 justify-end">
              {enableDelete && (
                <Button
                  text="Borrar"
                  icon="material-symbols:delete-outline-rounded"
                  variant="light"
                  onClick={() => handleEvent("delete")}
                />
              )}
              <Button
                type="submit"
                text="Guardar"
                icon="material-symbols:save-outline-rounded"
              />
            </div>
          </form>
        </FormProvider>
      </CustomModal>
    </>
  );
}
