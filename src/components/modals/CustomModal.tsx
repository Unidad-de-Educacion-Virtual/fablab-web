import { Modal } from "@mui/base";
import { ReactNode } from "react";

interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

export default function CustomModal({
  open,
  setOpen,
  children,
}: CustomModalProps) {
  return (
    <Modal
      open={open}
      slots={{ backdrop: "div" }}
      slotProps={{
        root: {
          className: "fixed inset-0 flex items-center justify-center p-6",
        },
        backdrop: {
          onClick: () => setOpen(false),
          className: "fixed inset-0 bg-black bg-opacity-50 -z-10",
        },
      }}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-fit max-h-full overflow-scroll`}
      >
        {children}
      </div>
    </Modal>
  );
}
