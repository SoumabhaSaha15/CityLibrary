import { type AuthState } from "@/store/auth";
import type { ThemeOptionsType } from "@/store/theme";
import type { QueryClient } from "@tanstack/react-query";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { HotkeysDevtoolsPanel } from "@tanstack/react-hotkeys-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { PacerDevtoolsPanel } from "@tanstack/react-pacer-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthState | undefined;
  theme: ThemeOptionsType | undefined;
}>()({ component: RootComponent });

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        plugins={[
          {
            name: "Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Hotkey",
            render: <HotkeysDevtoolsPanel theme="dark" devtoolsOpen={false} />,
          },
          {
            name: "Form",
            render: <FormDevtoolsPanel theme="dark" devtoolsOpen={false} />,
          },
          {
            name: "Pacer",
            render: <PacerDevtoolsPanel theme="dark" devtoolsOpen={false} />,
          },
        ]}
      />
    </>
  );
}
