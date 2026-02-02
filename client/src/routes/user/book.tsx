import { createFileRoute } from "@tanstack/react-router";

function Book() {
  return <div className="p-4">hello world</div>;
}
export const Route = createFileRoute("/user/book")({
  component: Book,
});
