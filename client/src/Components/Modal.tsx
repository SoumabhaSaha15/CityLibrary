import { type FC } from "react";
import { useModal } from "@/Contexts/Modal/ModalContext";
// import { ModalProvider } from "@/Contexts/Modal/ModalProvider";
const Modal: FC<{ children: React.ReactNode; className: string }> = (
  { children, className } = { className: "", children: "" }
) => {
  const { modalRef } = useModal();
  return (
    // <ModalProvider>
    <dialog className={"modal" + " " + className} ref={modalRef}>
      {children}
    </dialog>
    // </ModalProvider>
  );
};
export default Modal;
