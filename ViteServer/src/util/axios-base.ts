import Cookies from "js-cookie";
import { type ZodType } from "zod";
import axios, { type AxiosResponse } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    schema?: ZodType<any>;
  }
}

const base = axios.create({
  baseURL: "/api",
  withCredentials: true,
  // validateStatus: (_) => true,
});

const customFormSerializer = (data: object): FormData => {
  const formData = new FormData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appendRecursive = (key: string, value: any) => {
    if (value instanceof FileList)
      [...value].forEach((file) => formData.append(key, file)); // 1. Handle FileList (Preserved from your fix)
    else if (value instanceof File || value instanceof Blob)
      formData.append(key, value); // 2. Handle Files/Blobs (Base case)
    else if (Array.isArray(value))
      value.forEach((item, index) => appendRecursive(`${key}[${index}]`, item)); // 3. Handle Arrays (RECURSIVE)
    else if (
      value !== null &&
      typeof value === "object" &&
      !(value instanceof Date)
    )
      Object.entries(value).forEach(([subKey, subValue]) =>
        appendRecursive(`${key}[${subKey}]`, subValue),
      );
    // 4. Handle Objects (RECURSIVE) - Instead of JSON.stringify
    else if (value !== undefined && value !== null) formData.append(key, value); // 5. Handle Primitives
  };
  Object.entries(data).forEach(([key, value]) => appendRecursive(key, value));
  return formData;
};

base.interceptors.request.use(
  (config) => {
    const unsafeMethods = ["POST", "PUT", "PATCH", "DELETE"];
    if (unsafeMethods.includes(config.method?.toUpperCase() || "")) {
      const csrfToken = Cookies.get("csrftoken"); // Read the cookie using js-cookie
      if (csrfToken) config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

base.interceptors.request.use(
  (config) => {
    const contentType = config.headers?.["Content-Type"];
    if (contentType === "multipart/form-data")
      if (config.data && !(config.data instanceof FormData))
        config.data = customFormSerializer(config.data);
    // If we have data that isn't already FormData (like a plain object with FileList)
    return config;
  },
  (error) => Promise.reject(error),
);

base.interceptors.response.use(
  (response: AxiosResponse) => {
    const schema = response.config.schema;
    if (schema) {
      try {
        const validated = schema.parse(response.data);
        response.data = validated;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return response;
  },
  (error) => Promise.reject(error),
);

export default base;
