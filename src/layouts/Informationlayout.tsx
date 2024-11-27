import { ReactElement, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "./ContentLayout";
import Button from "../components/Button";
import EntityModalProps from "../components/modals/types/EntityModalProps";

interface InformationLayoutProps {
  children: ReactNode;
  entityId: number;
  enableEdit?: boolean;
  EntityModal: (props: EntityModalProps) => ReactElement;
  refresh: () => void;
}

export default function InformationLayout({
  children,
  entityId,
  EntityModal,
  refresh,
  enableEdit = true,
}: InformationLayoutProps) {
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);

  return (
    <ContentLayout
      title="Información"
      button={
        enableEdit && (
          <Button
            text="Editar"
            icon="material-symbols:edit-outline-rounded"
            onClick={() => setEditModal(true)}
          />
        )
      }
    >
      {enableEdit && (
        <EntityModal
          mode="edit"
          open={editModal}
          id={entityId}
          enableDelete={true}
          setOpen={setEditModal}
          triggerRefresh={refresh}
          onDelete={() => setTimeout(() => navigate(-1), 1500)}
        />
      )}

      <div className="w-full">{children}</div>
    </ContentLayout>
  );
}
