import { ReactElement, ReactNode, useState } from "react";
import ContentLayout from "./ContentLayout";
import Button from "../components/Button";
import EntityModalProps from "../components/modals/types/EntityModalProps";

interface InformationLayoutProps {
  children: ReactNode;
  entityId: number;
  EntityModal: (props: EntityModalProps) => ReactElement;
  refresh: () => void;
}

export default function InformationLayout({
  children,
  entityId,
  EntityModal,
  refresh,
}: InformationLayoutProps) {
  const [editModal, setEditModal] = useState(false);

  return (
    <ContentLayout
      title="Información"
      button={
        <Button
          text="Editar"
          icon="material-symbols:edit-outline-rounded"
          onClick={() => setEditModal(true)}
        />
      }
    >
      <EntityModal
        mode="edit"
        open={editModal}
        id={entityId}
        enableDelete={true}
        setOpen={setEditModal}
        triggerRefresh={refresh}
      />

      <div className="w-full">{children}</div>
    </ContentLayout>
  );
}
