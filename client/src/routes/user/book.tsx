import { useQuery } from "@tanstack/react-query";
import booksQueryOptions from "@/hooks/fetchBook";
import { createFileRoute } from "@tanstack/react-router";

function Book() {
  const params = Route.useParams();
  const {
    data: { data },
  } = useQuery(booksQueryOptions(params));
  return <>{JSON.stringify(data, null, 2)}</>;
}
export const Route = createFileRoute("/user/book")({
  component: Book,
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(booksQueryOptions(params)),
});
