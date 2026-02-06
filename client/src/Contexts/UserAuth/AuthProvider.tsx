import React from "react";
import base from "@/util/axios-base";
import { UserAuthContext } from "./AuthContext";
import { useToast, DefaultOptions } from "../Toast/ToastContext";
import { responseSchema, type ResponseSchema } from "@/validators/user-auth";

const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = React.useState<ResponseSchema | null>(
    null,
  );
  const toast = useToast();
  const login = async (
    onSuccess: () => void = () => {},
    onError: () => void = () => {},
  ) => {
    try {
      const response = await base.get<ResponseSchema>("/user/login", {
        schema: responseSchema,
      });
      if (response.status != 200)
        throw new Error(
          `error in fetching profile status message:${response.statusText}`,
        );
      setUserDetails(response.data);
      toast.open("Login Successful", true, 3000, DefaultOptions.success);
      onSuccess();
    } catch (e) {
      toast.open("Login Failed", true, 3000, DefaultOptions.error);
      onError();
    }
  };

  const logout = async (
    onSuccess: () => void = () => {},
    onError: () => void = () => {},
  ) => {
    try {
      if (userDetails == null) throw new Error(`No user logged in!!!`);
      const response = await base.get("/user/logout");
      if (response.status != 204)
        throw new Error(
          `Error in logging out status message:${response.statusText}`,
        );
      setUserDetails(null);
      onSuccess();
    } catch (err) {
      console.error(err);
      onError();
    }
  };

  return (
    <UserAuthContext.Provider value={{ login, logout, userDetails }}>
      {children}
    </UserAuthContext.Provider>
  );
};
export default UserAuthProvider;
