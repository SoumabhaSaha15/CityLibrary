import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { cn } from "@/util/cn";
// import ModalProvider from "@/contexts/Modal/ModalProvider";
// import { useModal } from "@/contexts/Modal/ModalContext";
export interface ModalHandle {
  open(): void;
  close(): void;
  toggle(): void;
}
export type ModalProps = React.ComponentPropsWithoutRef<"dialog">;
const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ children, className, ...props }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open() {
        dialogRef.current?.showModal();
      },

      close() {
        dialogRef.current?.close();
      },

      toggle() {
        const dialog = dialogRef.current;

        if (!dialog) return;

        dialog.open ? dialog.close() : dialog.showModal();
      },
    }));

    return (
      <dialog ref={dialogRef} className={cn("modal", className)} {...props}>
        {children}
      </dialog>
    );
  },
);
export default Modal;
