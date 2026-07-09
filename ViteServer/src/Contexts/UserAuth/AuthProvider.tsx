import React from "react";
import base from "@/util/axios-base";
import { UserAuthContext } from "./AuthContext";
import { useToast, DefaultOptions } from "../Toast/ToastContext";
import { responseSchema, type ResponseSchema } from "@/validators/user-auth";

async function performLogin(): Promise<ResponseSchema> {
  const raw = window.localStorage.getItem("loginData") || "";
  const data = responseSchema.parse(JSON.parse(raw));
  window.localStorage.removeItem("loginData");
  return data;
}

async function performLogout(
  userDetails: ResponseSchema | null,
): Promise<void> {
  if (userDetails == null) throw new Error("No user logged in!!!");
  const response = await base.get("/user/logout");
  if (response.status !== 204)
    throw new Error(
      `Error in logging out status message: ${response.statusText}`,
    );
}

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
      setUserDetails(await performLogin());
      toast.open("Login Successful", true, 3000, DefaultOptions.success);
      onSuccess();
    } catch {
      toast.open("Login Failed", true, 3000, DefaultOptions.error);
      onError();
    }
  };

  const logout = async (
    onSuccess: () => void = () => {},
    onError: () => void = () => {},
  ) => {
    try {
      await performLogout(userDetails);
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
