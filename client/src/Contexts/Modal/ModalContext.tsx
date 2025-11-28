import React, { createContext, use, type ReactNode } from "react";

export type ModalContextType = {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  openModal: () => void;
  closeModal: () => void;
};

export type ModalProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext<ModalContextType>({
  modalRef: { current: null },
  openModal: () => {},
  closeModal: () => {},
});
export const useModal = (): ModalContextType => {
  const context = use(ModalContext);
  return context;
};
export default ModalContext;
