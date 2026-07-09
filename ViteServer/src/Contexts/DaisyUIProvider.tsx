import ToastProvider from "./Toast/ToastProvider";
import ThemeProvider from "./Theme/ThemeProvider";
import ModalProvider from "./Modal/ModalProvider";
const DaisyUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ModalProvider>
      <ToastProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ToastProvider>
    </ModalProvider>
  );
};
export default DaisyUIProvider;
