import React from "react";
import base from "../../utils/base";
import { addToast } from "@heroui/react";
import { ZodError, prettifyError } from "zod";
import { UserAuthContext } from "./UserAuthContext";
import { responseSchema, type ResponseSchema } from "../../validator/user-auth";

const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = React.useState<ResponseSchema | null>(null);

  const login = async (onSuccess: () => void = () => { }, onError: () => void = () => { }) => {
    try {
      const response = await base.get('/user/login');
      if (response.status != 200) throw new Error(`error in fetching profile status message:${response.statusText}`);
      const parsedData = responseSchema.parse(response.data);
      setUserDetails(parsedData);
      onSuccess();
    } catch (e) {
      if (e instanceof ZodError) addToast({
        title: "Validation Error",
        description: prettifyError(e),
        color: "danger",
      });
      else {
        addToast({
          title: "Login Error",
          description: e instanceof Error ? e.message : "An unknown error occurred during login",
          color: "danger",
        });
      }
      console.error(e);
      onError();
    }
  };

  const logout = async (onSuccess: () => void = () => { }, onError: () => void = () => { }) => {
    try {
      if (userDetails == null) throw new Error(`No user logged in!!!`);
      const response = await base.get('/user/logout');
      if (response.status != 204) throw new Error(`Error in logging out status message:${response.statusText}`);
      addToast({
        title: response.status,
        description: "Logout Successful",
        color: "success",
      });
      setUserDetails(null);
      onSuccess()
    } catch (err) {
      addToast({
        title: "Logout Error",
        description: err instanceof Error ? err.message : "An unknown error occurred during logout",
        color: "danger",
      });
      console.error(err);
      onError();
    }
  };

  return (
    <UserAuthContext.Provider value={{ login, logout, userDetails }}>
      {children}
    </UserAuthContext.Provider>
  );
}
export default UserAuthProvider;