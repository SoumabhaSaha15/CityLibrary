import { createContext, useContext, type Context, type ReactNode } from "react";
import { z } from "zod";

export const ToastOptionsValidator = z.strictObject({
  toastVariant: z.enum([
    "alert-info",
    "alert-success",
    "alert-warning",
    "alert-error",
  ]),
  toastPosition: z
    .tuple([
      z.enum(["", "toast-start", "toast-end", "toast-center"]),
      z.enum(["", "toast-top", "toast-bottom", "toast-middle"]),
    ])
    .refine(
      (v) => (v[0] === "" && v[1] === "") || (v[0] !== "" && v[1] !== ""),
      {
        message: "Both position values must be empty or both must be defined.",
      }
    ),
});

export type ToastOptionsType = z.infer<typeof ToastOptionsValidator>;

export type ToastContextProps = {
  /**
   * @param component ReactNode message or component to be displayed in the toast
   * @param autoClose? boolean if true, the toast will close automatically after the timeout
   * @param timeout? number the time in ms after which the toast will close default is 3000ms
   * @param toastOptions? ToastOptionsType the options for the toast customization alert-info is the default variant
   * @returns string - toast ID that can be used to manually close the toast
   */
  open: (
    component: ReactNode,
    autoClose?: boolean,
    timeout?: number,
    toastOptions?: ToastOptionsType
  ) => string;
  close: (id: string) => void;
};

export const ToastContext: Context<ToastContextProps> =
  createContext<ToastContextProps>({
    open: () => {
      console.warn("ToastContext.open called outside of ToastProvider");
      return "";
    },
    close: () => {
      console.warn("ToastContext.close called outside of ToastProvider");
    },
  });

export const useToast = () => useContext(ToastContext);

export const DefaultToastPosition: [
  "" | "toast-start" | "toast-end" | "toast-center",
  "" | "toast-top" | "toast-bottom" | "toast-middle",
] = ["toast-end", "toast-bottom"];

export type DefaultOptionsType = Record<
  "error" | "success" | "info" | "warning",
  ToastOptionsType
>;

export const DefaultOptions: DefaultOptionsType = {
  error: { toastPosition: DefaultToastPosition, toastVariant: "alert-error" },
  success: {
    toastPosition: DefaultToastPosition,
    toastVariant: "alert-success",
  },
  info: { toastPosition: DefaultToastPosition, toastVariant: "alert-info" },
  warning: {
    toastPosition: DefaultToastPosition,
    toastVariant: "alert-warning",
  },
};
