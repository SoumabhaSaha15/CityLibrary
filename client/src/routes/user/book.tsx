import { MdSearch } from "react-icons/md";
import BookCard from "@/Components/BookCard";
import Pagination from "@/Components/Pagination";
import { useQuery } from "@tanstack/react-query";
import booksQueryOptions from "@/hooks/fetchBook";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

function Book() {
  const search = Route.useSearch();
  const { data } = useQuery(booksQueryOptions(search));
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <>
      <div className="page-height w-full flex flex-col">
        <div className="max-h-[calc(100dvh-104px)] overflow-y-auto overflow-x-clip grid place-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-[33vh] gap-2 p-2">
          {data?.results.map((item, index) => (
            <BookCard book={item} key={`book[${index}]`} />
          ))}
        </div>
        <Pagination
          currentPage={data?.current_page || 0}
          totalPages={data?.page_count || 0}
          onPageChange={(newPage) => {
            if (newPage !== 1)
              navigate({ search: (prev) => ({ ...prev, page: newPage }) });
            else
              navigate({
                search: (prev) => {
                  //@ts-ignore
                  const { page, ...page_removed } = prev;
                  return page_removed;
                },
              });
          }}
        />
      </div>
      <div className="fab">
        <button className="btn btn-lg btn-circle btn-primary">
          <MdSearch className="size-8" />
        </button>
      </div>
    </>
  );
}
export const Route = createFileRoute("/user/book")({
  component: Book,
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(booksQueryOptions(params)),
});
