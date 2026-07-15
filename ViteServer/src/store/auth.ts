import base from "@/util/axios-base";
import { Store } from "@tanstack/react-store";
import { useSelector } from "@tanstack/react-store";
import {
  type ResponseSchema,
  responseSchema,
  type LoginSchema,
  type SignupSchema,
} from "@/validators/user-auth";

export type AuthActions = {
  isSessionActive: () => Promise<boolean>;
  loginWithCred: (data: LoginSchema) => Promise<void>;
  /**
   * @throws Error
   * @param data
   */
  signup: (data: SignupSchema) => Promise<void>;
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

export const authActions: AuthActions = {
  isSessionActive: async () => {
    try {
      const res = await base.get<ResponseSchema>("/user/login", {
        schema: responseSchema,
      });

      if (res.status === 200) {
        authStore.setState((state) => ({
          ...state,
          isAuthenticated: true,
          user: res.data,
          error: null,
        }));
        return true;
      } else {
        authStore.setState((state) => ({
          ...state,
          isAuthenticated: false,
          user: null,
          error: res.statusText,
        }));
      }
    } catch (err) {
      authStore.setState((state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        error: "network_error",
      }));
    }
    return false;
  },

  loginWithCred: async (data: LoginSchema) => {
    const res = await base.post<ResponseSchema>("/user/login", data, {
      schema: responseSchema,
    });

    if (res.status === 200)
      authStore.setState((state) => ({
        ...state,
        isAuthenticated: true,
        user: res.data,
        error: null,
      }));
    else {
      authStore.setState((state) => ({ ...state, error: res.statusText }));
      throw new Error(res.statusText, { cause: res.data });
    }
  },
  signup: async (data: SignupSchema) => {
    const res = await base.postForm<ResponseSchema>("/user/signup", data, {
      schema: responseSchema,
    });

    if (res.status === 201 || res.status === 200)
      authStore.setState((state) => ({
        ...state,
        isAuthenticated: true,
        user: res.data,
        error: null,
      }));
    else {
      authStore.setState((state) => ({ ...state, error: res.statusText }));
      throw new Error(res.statusText, { cause: res.data });
    }
  },

  logout: async () => {
    const res = await base.get("/user/logout");
    if (res.status === 204) {
      window.localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
      authStore.setState((state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      }));
    } else throw new Error(res.statusText, { cause: res.data });
  },
};

export const useAuth = () => {
  const authState = useSelector(authStore, (state) => state);
  return { ...authState, ...authActions };
};
