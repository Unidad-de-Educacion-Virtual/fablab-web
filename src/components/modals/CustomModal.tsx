import { Modal } from "@mui/base";
import { ReactNode } from "react";

interface CuctomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

export default function CustomModal({
  open,
  setOpen,
  children,
}: CuctomModalProps) {
  return (
    <Modal
      open={open}
      slots={{ backdrop: "div" }}
      slotProps={{
        root: {
          className: "fixed inset-0 flex items-center justify-center",
        },
        backdrop: {
          onClick: () => setOpen(false),
          className: "fixed inset-0 bg-black bg-opacity-50 -z-10",
        },
      }}
    >
      <div className={`bg-white p-6 rounded-lg shadow-lg w-fit`}>
        {children}
      </div>
    </Modal>
  );
}
