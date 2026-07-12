import ToastProvider from "./Toast/ToastProvider";
import ModalProvider from "./Modal/ModalProvider";
const DaisyUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ModalProvider>
      <ToastProvider>{children}</ToastProvider>
    </ModalProvider>
  );
};
export default DaisyUIProvider;
