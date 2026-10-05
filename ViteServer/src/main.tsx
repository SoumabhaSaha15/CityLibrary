import "@/index.css";
import App from "@/App";
import { queryClient } from "@/router";
import ReactDOM from "react-dom/client";
import ToastProvider from "@/contexts/Toast/ToastProvider";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const persister = createAsyncStoragePersister({ storage: window.localStorage });
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ToastProvider>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <App />
    </PersistQueryClientProvider>
  </ToastProvider>,
);
