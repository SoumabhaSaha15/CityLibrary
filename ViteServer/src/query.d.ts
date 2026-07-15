/// <reference types="vite/client" />
import "@tanstack/react-query";
import { ZodError } from "zod";
import { AxiosError } from "axios";
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError | ZodError;
  }
}
