import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  ToastContext,
  ToastOptionsValidator,
  type ToastOptionsType,
  DefaultToastPosition,
} from "./ToastContext";

interface Toast {
  id: string;
  component: ReactNode;
  options: ToastOptionsType;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, number>>(new Map());

  const close = (id: string) => {
    const timer = timeoutsRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timeoutsRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const open = (
    component: ReactNode,
    autoClose = true,
    timeout = 3000,
    toastOptions: ToastOptionsType = {
      toastPosition: DefaultToastPosition,
      toastVariant: "alert-info",
    },
  ): string => {
    const validated = ToastOptionsValidator.safeParse(toastOptions);
    const options = validated.success
      ? validated.data
      : {
          toastPosition: DefaultToastPosition,
          toastVariant: "alert-info" as const,
        };

    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, component, options }]);
    if (autoClose) {
      const timer = window.setTimeout(() => close(id), timeout);
      timeoutsRef.current.set(id, timer);
    }
    return id;
  };

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []); // Cleanup on unmount

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className="toast toast-end toast-bottom">
        {toasts.map(({ id, component, options }) => (
          <div
            key={id}
            className={`alert ${options.toastVariant} rounded-full`}
            onClick={() => close(id)}
          >
            {component}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
