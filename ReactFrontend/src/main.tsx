// main.tsx or main.jsx
import "./index.css";
import App from "./App";
// import React from 'react'
import ReactDOM from "react-dom/client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HeroUIProvider>
    <ToastProvider />
    <App />
  </HeroUIProvider>
  // </React.StrictMode>,
);
