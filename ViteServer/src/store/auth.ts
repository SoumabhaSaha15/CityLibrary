import base from "@/util/axios-base";
import { type AxiosResponse } from "axios";
import { Store } from "@tanstack/react-store";
import { useSelector } from "@tanstack/react-store";
import {
  type ResponseSchema,
  responseSchema,
  type LoginSchema,
  type SignupSchema,
} from "@/validators/user-auth";

export type AuthActions = {
  verifySession: () => Promise<void>;
  login: (data: {
    username: string;
    password: string;
  }) => Promise<AxiosResponse<ResponseSchema, any, {}>>;
  signup: (data: SignupSchema) => Promise<AxiosResponse<any, any, {}>>;
  logout: () => Promise<void>;
};

export interface AuthState {
  isAuthenticated: boolean;
  user: ResponseSchema | null;
  error: string | null;
}

export const authStore = new Store<AuthState>({
  isAuthenticated: false,
  user: null,
  error: null,
});

let sessionCheckPromise: Promise<void> | null = null;

export const authActions: AuthActions = {
  verifySession: async () => {
    if (!sessionCheckPromise) {
      sessionCheckPromise = base
        .get<ResponseSchema>("/user/login", { schema: responseSchema })
        .then((res) => {
          // Explicitly check status because Axios won't throw on 401/403
          if (res.status === 200) {
            authStore.setState((state) => ({
              ...state,
              isAuthenticated: true,
              user: res.data,
              error: null,
            }));
          } else {
            authStore.setState((state) => ({
              ...state,
              isAuthenticated: false,
              user: null,
              error: res.statusText,
            }));
          }
        })
        .catch(() => {
          // This catch now only triggers on complete network failure or Zod schema rejection
          authStore.setState((state) => ({
            ...state,
            isAuthenticated: false,
            user: null,
            error: "Network error",
          }));
        });
    }
    return sessionCheckPromise;
  },

  login: async (data: LoginSchema) => {
    try {
      const res = await base.post<ResponseSchema>("/user/login", data, {
        schema: responseSchema,
      });

      if (res.status === 200) {
        authStore.setState((state) => ({
          ...state,
          isAuthenticated: true,
          user: res.data,
          error: null,
        }));
        return res;
      } else {
        // Handle 400/401 manually
        const errorMsg = res.statusText;
        authStore.setState((state) => ({ ...state, error: errorMsg }));
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      // Catch Zod rejections or network issues
      if (!authStore.state.error) {
        authStore.setState((state) => ({
          ...state,
          error: "Network or validation error",
        }));
      }
      throw err;
    }
  },

  signup: async (data: SignupSchema) => {
    try {
      const res = await base.postForm<SignupSchema>("/user/signup", data);
      if (res.status === 201) {
        return res;
      } else {
        const errorMsg = res.statusText;
        authStore.setState((state) => ({ ...state, error: errorMsg }));
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      throw err;
    }
  },

  logout: async () => {
    await base.get("/user/logout");
    sessionCheckPromise = null;
    authStore.setState((state) => ({
      ...state,
      isAuthenticated: false,
      user: null,
      error: null,
    }));
  },
};

export const useAuth = () => {
  const authState = useSelector(authStore, (state) => state);
  return { ...authState, ...authActions };
};
