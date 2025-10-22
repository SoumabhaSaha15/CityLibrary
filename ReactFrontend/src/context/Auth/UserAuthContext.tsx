import React from 'react';
import { type ResponseSchema } from "../../validator/user-auth";
export type AuthContextProps = {
  login: (onSuccess?: () => void, onError?: () => void) => Promise<void>;
  logout: (onSuccess?: () => void, onError?: () => void) => Promise<void>;
  userDetails: ResponseSchema | null;
};
export const UserAuthContext = React.createContext<AuthContextProps>({
  login: async () => { },
  logout: async () => { },
  userDetails: null,
});
export const useUserAuth = () => React.useContext(UserAuthContext);