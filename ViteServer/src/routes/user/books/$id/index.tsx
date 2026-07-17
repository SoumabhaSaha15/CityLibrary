import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/user/books/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/user/books/$id"!
      <Outlet />
    </div>
  );
}
