import { MdSearch } from "react-icons/md";
import BookCard from "@/Components/BookCard";
import Pagination from "@/Components/Pagination";
import { useQuery } from "@tanstack/react-query";
import booksQueryOptions from "@/hooks/fetchBook";
import RippleButton from "@/Components/RippleButton";
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/user/books")({
  component: Book,
  beforeLoad: ({ search }) => {
    console.log(search);
    if (!(search as any).page) {
      throw redirect({
        to: "/user/books",
        search: { page: 1 },
        replace: true, // Replaces history so hitting 'back' works properly
      });
    }
  },
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(booksQueryOptions(params)),
});

function Book() {
  const search = Route.useSearch();
  const { data } = useQuery(booksQueryOptions(search));
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <>
      <div className="page-height w-full flex flex-col bg-base-200">
        <div className="max-h-[calc(100dvh-120px)] overflow-y-auto overflow-x-clip grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[60vh] sm:auto-rows-[50vh] gap-2 p-2">
          {data?.results.map((item) => (
            <BookCard book={item} key={`book[${item.book_id}]`} />
          ))}
        </div>
        <Pagination
          currentPage={data?.current_page || 0}
          totalPages={data?.page_count || 0}
          onPageChange={(newPage) =>
            navigate({ search: (prev) => ({ ...prev, page: newPage }) })
          }
        />
      </div>
      <div className="fab">
        <RippleButton className="btn btn-lg btn-circle btn-primary">
          <MdSearch className="size-8" />
        </RippleButton>
      </div>
    </>
  );
}
