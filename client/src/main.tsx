import "./index.css";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import DaisyUIProvider from "@/Contexts/DaisyUIProvider";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import LoadingPage from "./Loader";
import NotFoundPage from "./NotFound";
import ErrorPage from "./Error";
const persister = createAsyncStoragePersister({ storage: window.localStorage });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000,
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPendingComponent: LoadingPage,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DaisyUIProvider>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  </DaisyUIProvider>,
);
