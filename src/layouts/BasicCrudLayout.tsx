import { ReactElement, useMemo, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { deleteEntity, getEntity } from "../services/BackendService";
import DataTable from "../components/DataTable";
import ContentLayout from "./ContentLayout";
import { useService } from "../hooks/useService";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import EntityModalProps from "../components/modals/types/EntityModalProps";
import { toast, Toaster } from "sonner";
import { useAuth } from "../providers/AuthProvider";

interface BasicCrudLayoutProps {
  apiPath: string;
  columns: GridColDef[];
  title: string;
  EntityModal: (props: EntityModalProps) => ReactElement;
  viewBasePath?: string;
  action?: "view" | "edit" | "delete" | null;
  queryParams?: string;
  parentId?: number;
  enableCreate?: boolean;
  enableDelete?: boolean;
}

export default function BasicCrudLayout<T>({
  apiPath,
  columns,
  title,
  EntityModal,
  viewBasePath = "",
  action = "edit",
  queryParams = "",
  parentId,
  enableCreate = true,
  enableDelete = true,
}: BasicCrudLayoutProps) {
  const { token } = useAuth();
  const { data: entities, refresh } = useService(
    async () => await getEntity<T>(apiPath, queryParams, token),
    [apiPath, queryParams]
  );
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(0);

  const cols: GridColDef[] = [...columns];

  if (action) {
    cols.push({
      field: "",
      headerName: "Acción",
      sortable: false,
      filterable: false,
      hideable: false,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center">
          {action === "edit" && (
            <Button
              text="Editar"
              onClick={() => handleEdit(params.row.id)}
              icon="material-symbols:edit-outline-rounded"
              variant="no-background"
            />
          )}
          {action === "view" && (
            <Link to={`${viewBasePath}${params.row.id}`}>
              <Button
                text="Ver"
                icon="ic:outline-remove-red-eye"
                variant="no-background"
              />
            </Link>
          )}
          {action === "delete" && (
            <Button
              text="Borrar"
              onClick={() => handleDelete(params.row.id)}
              icon="material-symbols:delete-outline-rounded"
              variant="no-background"
            />
          )}
        </div>
      ),
    });
  }

  const rows = useMemo(() => {
    if (!entities) {
      return [];
    }

    return entities.map((entity: any) => {
      return {
        ...entity,
      };
    });
  }, [entities]);

  async function handleDelete(id: number) {
    try {
      await deleteEntity<T>(apiPath, id, token);
      toast.success("Eliminado con éxito");
      refresh();
    } catch (error: any) {
      if (error.message) {
        toast.error(`${error}`);
      }
    }
  }

  function handleEdit(id: number) {
    setEditItemId(id);
    setEditModal(true);
  }

  return (
    <ContentLayout
      title={title}
      button={
        enableCreate && (
          <Button
            text="Crear"
            icon="material-symbols:add-rounded"
            onClick={() => setCreateModal(true)}
          />
        )
      }
    >
      <Toaster position="top-center" richColors />

      {enableCreate && (
        <EntityModal
          mode="create"
          open={createModal}
          setOpen={setCreateModal}
          triggerRefresh={refresh}
          parentId={parentId}
        />
      )}

      <EntityModal
        mode="edit"
        open={editModal}
        setOpen={setEditModal}
        triggerRefresh={refresh}
        enableDelete={enableDelete}
        id={editItemId}
        parentId={parentId}
      />

      <DataTable columns={cols} rows={rows} />
    </ContentLayout>
  );
}
