import { type AuthState } from "@/store/auth";
import type { QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthState | undefined;
}>()({ component: RootComponent });

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition="top-left" />
      <TanStackRouterDevtools position="top-left" /> */}
    </>
  );
}
