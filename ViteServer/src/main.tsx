import "@/index.css";
import ErrorPage from "@/shared/Error";
import ReactDOM from "react-dom/client";
import { authStore } from "@/store/auth";
import LoadingPage from "@/shared/Loader";
import { themeStore } from "@/store/theme";
import { routeTree } from "@/routeTree.gen";
import NotFoundPage from "@/shared/NotFound";
import { useSelector } from "@tanstack/react-store";
import { QueryClient } from "@tanstack/react-query";
import ToastProvider from "@/contexts/Toast/ToastProvider";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

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
    auth: undefined,
    theme: undefined,
  },
  defaultViewTransition: true,
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
function App() {
  const auth = useSelector(authStore, (state) => state);
  const { theme } = useSelector(themeStore, (state) => state);
  return <RouterProvider router={router} context={{ auth, theme }} />;
}

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
