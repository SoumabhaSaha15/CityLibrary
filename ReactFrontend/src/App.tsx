import { lazy, Suspense } from "react";
import Loading from "./pages/Loading";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./layout/UserLayout";
import AuthFormsLayout from "./layout/AuthFormsLayout";
const App: React.FC = () => {
  return (<BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" Component={lazy(() => import('./pages/Landing'))} />
        <Route path="/forms" Component={AuthFormsLayout} >
          <Route path="user-signup" Component={lazy(()=>import('./pages/UserSignup'))} />
          <Route path="user-login" Component={lazy(()=>import('./pages/UserLogin'))} />
        </Route>
        <Route path="/user" Component={UserLayout} >
          <Route index Component={()=><>Hello</>} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>);
}
export default App