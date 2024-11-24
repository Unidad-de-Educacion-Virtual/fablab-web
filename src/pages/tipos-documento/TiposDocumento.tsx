import { useMemo, useState } from "react";
import Button from "../../components/Button";
import { useService } from "../../hooks/useService";
import ContentLayout from "../../layouts/ContentLayout";
import { getEntity } from "../../services/BackendService";
import { API_TIPO_DOCUMENTO_PATH } from "../../config";
import { TipoDocumento } from "../../types/TipoDocumento";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable";
import TipoDocumentoModal from "../../components/modals/TipoDocumentoModal";

export default function TiposDocumento() {
  const { data: tiposDocumento, refresh } = useService(
    async () => await getEntity<TipoDocumento>(API_TIPO_DOCUMENTO_PATH)
  );
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(0);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 2,
    },
    {
      field: "",
      headerName: "Acción",
      sortable: false,
      filterable: false,
      hideable: false,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center">
          <Button
            text="Editar"
            onClick={() => handleEdit(params.row.id)}
            icon="material-symbols:edit-outline-rounded"
            variant="no-background"
          />
        </div>
      ),
    },
  ];

  const rows = useMemo(() => {
    if (!tiposDocumento) {
      return [];
    }

    return tiposDocumento.map((tipoDocumento) => {
      return {
        ...tipoDocumento,
      };
    });
  }, [tiposDocumento]);

  function handleEdit(id: number) {
    setEditItemId(id);
    setEditModal(true);
  }

  return (
    <ContentLayout
      title="Tipos de Documento"
      button={
        <Button
          text="Crear"
          icon="material-symbols:add-rounded"
          onClick={() => setCreateModal(true)}
        />
      }
    >
      <TipoDocumentoModal
        mode="create"
        open={createModal}
        setOpen={setCreateModal}
        triggerRefresh={refresh}
      />

      <TipoDocumentoModal
        mode="edit"
        open={editModal}
        setOpen={setEditModal}
        triggerRefresh={refresh}
        enableDelete={true}
        id={editItemId}
      />

      <DataTable columns={columns} rows={rows} />
    </ContentLayout>
  );
}
