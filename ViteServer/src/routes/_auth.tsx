import { authActions } from "@/store/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async ({ context: { auth } }) => {
    if (auth && auth.isAuthenticated) throw redirect({ to: "/user" });
    const res = await authActions.isSessionActive();
    if (res) throw redirect({ to: "/user" });
  },
});

function RouteComponent() {
  return <Outlet />;
}
