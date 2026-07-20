import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/books/$id/borrow")({
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
