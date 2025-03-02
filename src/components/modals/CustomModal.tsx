import { Dialog } from "@base-ui-components/react/dialog";
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
    <Dialog.Root open={open}>
      <Dialog.Portal keepMounted>
        <Dialog.Backdrop
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setOpen(false)}
        />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-1/2 bg-white p-6 rounded-lg  shadow-lg w-fit max-h-full overflow-scroll z-20">
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>

    /*
    
    
    <Dialog
      open={open}
      slots={{ backdrop: "div" }}
      slotProps={{
        root: {
          className: "fixed inset-0 flex items-center justify-center p-6",
        },
        backdrop: {
          onClick: () => setOpen(false),
          className: "fixed inset-0 bg-black/50 -z-10",
        },
      }}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-fit max-h-full overflow-scroll`}
      >
        {children}
      </div>
    */
  );
}
