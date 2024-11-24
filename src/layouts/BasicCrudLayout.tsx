import { ReactElement, useMemo, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getEntity } from "../services/BackendService";
import DataTable from "../components/DataTable";
import ContentLayout from "./ContentLayout";
import { useService } from "../hooks/useService";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import EntityModalProps from "../components/modals/types/EntityModalProps";

interface BasicCrudLayoutProps {
  apiPath: string;
  columns: GridColDef[];
  title: string;
  EntityModal: (props: EntityModalProps) => ReactElement;
  viewBasePath?: string;
  action?: "view" | "edit" | "delete";
  queryParams?: string;
  parentId?: number;
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
}: BasicCrudLayoutProps) {
  const { data: entities, refresh } = useService(
    async () => await getEntity<T>(apiPath, queryParams),
    [apiPath, queryParams]
  );
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(0);

  const cols: GridColDef[] = [
    ...columns,
    {
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
                onClick={() => handleEdit(params.row.id)}
                icon="ic:outline-remove-red-eye"
                variant="no-background"
              />
            </Link>
          )}
          {action === "delete" && (
            <Link to={`${params.row.id}`}>
              <Button
                text="Borrar"
                onClick={() => handleEdit(params.row.id)}
                icon="ic:delete-outline-rounded"
                variant="no-background"
              />
            </Link>
          )}
        </div>
      ),
    },
  ];

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

  function handleEdit(id: number) {
    setEditItemId(id);
    setEditModal(true);
  }

  return (
    <ContentLayout
      title={title}
      button={
        <Button
          text="Crear"
          icon="material-symbols:add-rounded"
          onClick={() => setCreateModal(true)}
        />
      }
    >
      <EntityModal
        mode="create"
        open={createModal}
        setOpen={setCreateModal}
        triggerRefresh={refresh}
        parentId={parentId}
      />

      <EntityModal
        mode="edit"
        open={editModal}
        setOpen={setEditModal}
        triggerRefresh={refresh}
        enableDelete={true}
        id={editItemId}
      />

      <DataTable columns={cols} rows={rows} />
    </ContentLayout>
  );
}
