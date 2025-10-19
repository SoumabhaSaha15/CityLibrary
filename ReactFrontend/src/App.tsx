import { lazy, Suspense } from "react";
import Loading from "./Loading";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
const App: React.FC = () => {
  return (<BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" Component={lazy(() => import('./Landing'))} />
      </Routes>
    </Suspense>
  </BrowserRouter>);
}
export default App