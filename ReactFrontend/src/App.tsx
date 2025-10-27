import React from "react";
import Loading from "./pages/global/Loading";
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
          <Route
            path="/"
            Component={lazy(() => import("./pages/global/Landing"))}
          />
          <Route path="/forms" Component={AuthFormsLayout}>
            <Route
              index
              Component={lazy(() => import("./pages/forms/UserLogin"))}
            />
            <Route
              path="user-login"
              Component={lazy(() => import("./pages/forms/UserLogin"))}
            />
            <Route
              path="user-signup"
              Component={lazy(() => import("./pages/forms/UserSignup"))}
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
            <Route
              path="authors"
              Component={lazy(() => import("./pages/user/Authors"))}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default App;
