import React, {
  createContext,
  use,
  // useContext,
  // useRef,
  // type FC,
  type ReactNode,
} from "react";

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

// export const Modal: FC<{ children: ReactNode }> = (
//   { children } = { children: "" }
// ) => {
//   const { modalRef, closeModal } = useModal();

//   return (
//     <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
//       <div className="modal-box">
//         {children}
//         <button className="btn" onClick={closeModal}>
//           Close
//         </button>
//       </div>
//     </dialog>
//   );
// };
