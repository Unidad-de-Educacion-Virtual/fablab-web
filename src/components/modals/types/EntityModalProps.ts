export default interface EntityModalProps {
  open: boolean;
  mode: "edit" | "create";
  enableDelete?: boolean;
  id?: number;
  parentId?: number;
  setOpen: (open: boolean) => void;
  triggerRefresh?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onCreate?: () => void;
}
