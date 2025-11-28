import { type FC, useRef } from "react";
import { type ModalProviderProps, ModalContext } from "./ModalContext";
const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = (): void =>
    void (modalRef.current && modalRef.current.showModal());

  const closeModal = (): void =>
    void (modalRef.current && modalRef.current.close());

  return (
    <ModalContext.Provider value={{ modalRef, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
