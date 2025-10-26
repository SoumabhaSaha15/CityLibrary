import React from "react";
import Loading from "./pages/Loading";
import { lazy, Suspense } from "react";
import UserLayout from "./layout/UserLayout";
import AuthFormsLayout from "./layout/AuthFormsLayout";

import UserAuthProvider from "./context/Auth/UserAuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" Component={lazy(() => import("./pages/Landing"))} />
          <Route path="/forms" Component={AuthFormsLayout}>
            <Route index Component={lazy(() => import("./pages/UserLogin"))} />
            <Route
              path="user-login"
              Component={lazy(() => import("./pages/UserLogin"))}
            />
            <Route
              path="user-signup"
              Component={lazy(() => import("./pages/UserSignup"))}
            />
          </Route>
          <Route
            path="/user"
            Component={() => <UserAuthProvider children={<UserLayout />} />}
          >
            <Route
              index
              Component={lazy(() => import("./pages/user/Authors"))}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default App;
