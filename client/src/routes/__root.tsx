import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import NotFoundPage from "@/NotFound";
import LoadingPage from "@/Loader";
import ErrorPage from "@/Error";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  pendingComponent: LoadingPage,
  errorComponent: ErrorPage,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
