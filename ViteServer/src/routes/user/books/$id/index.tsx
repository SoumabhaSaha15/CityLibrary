import bookQueryOptionsById from "@/hooks/fetchBookById";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/books/$id/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params }) =>
    await queryClient.ensureQueryData(bookQueryOptionsById(Number(params.id))),
});

function RouteComponent() {
  return <div></div>;
}
