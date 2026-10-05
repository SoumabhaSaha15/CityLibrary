import ErrorPage from "@/shared/Error";
import LoadingPage from "@/shared/Loader";
import { routeTree } from "@/routeTree.gen";
import NotFoundPage from "@/shared/NotFound";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000,
    },
  },
});

export const router = createRouter({
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

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
