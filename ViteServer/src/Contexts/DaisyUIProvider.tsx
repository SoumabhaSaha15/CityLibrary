import ToastProvider from "@/contexts/Toast/ToastProvider";
const DaisyUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ToastProvider>{children}</ToastProvider>;
};
export default DaisyUIProvider;
