import { cloneElement, type ReactElement, type FC } from "react";
import { useModal } from "@/Contexts/Modal/ModalContext";

const Modal: FC<{ children: React.ReactNode; className?: string }> = (
  { children, className } = { className: "", children: "" }
) => {
  const { modalRef } = useModal();

  return (
    <dialog className={`modal ${className}`} ref={modalRef}>
      {children}
    </dialog>
  );
};

type ClickableChildProps = {
  onClick: React.MouseEventHandler;
  style?: React.CSSProperties;
};

interface ModalTriggerProps {
  children: ReactElement<ClickableChildProps>;
}

export const ModalTrigger: FC<ModalTriggerProps> = ({
  children,
}: ModalTriggerProps) => {
  const { openModal } = useModal();
  return cloneElement(children, {
    onClick: openModal,
    style: { cursor: "pointer", ...children.props.style },
  });
};

export default Modal;
