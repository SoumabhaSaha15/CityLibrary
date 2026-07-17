import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import BookCard from "@/components/BookCard";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import booksQueryOptions from "@/hooks/fetchBook";
import { useHotkey } from "@tanstack/react-hotkeys";
import RippleButton from "@/components/RippleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal, { type ModalHandle } from "@/components/Modal";
import {
  BookQuerySchema,
  type BookQuery,
  BookQueryFilter,
} from "@/validators/book";
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user/books/")({
  component: RouteComponent,
  beforeLoad: ({ search, params }) => {
    if (!search.page) {
      console.log(params);
      throw redirect({
        to: "/user/books",
        search: { page: 1 },
        replace: true,
      });
    }
  },
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      booksQueryOptions({ ...params, page: (params as any).page || 1 }),
    ),
  validateSearch: BookQuerySchema,
});

function RouteComponent() {
  const search = Route.useSearch();
  const filterModalRef = useRef<ModalHandle>(null);
  const { data } = useQuery(booksQueryOptions(search));
  const navigate = useNavigate({ from: Route.fullPath });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Omit<BookQuery, "page">>({
    resolver: zodResolver(BookQuerySchema.omit({ page: true })),
  });

  useHotkey("Mod+K", (_e, _ctx) => filterModalRef.current?.open(), {
    conflictBehavior: "error",
  });

  return (
    <>
      <div className="page-height w-full flex flex-col bg-base-200">
        <div className="min-h-[calc(100dvh-4rem)] overflow-y-auto overflow-x-clip grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 auto-rows-[64vh] sm:auto-rows-[56vh] gap-2 p-2">
          {data?.results.map((item) => (
            <BookCard book={item} key={`book[${item.book_id}]`} />
          ))}
        </div>
        <div className="fixed bottom-0 min-w-full bg-linear-to-br from-base-100/20 via-base-200/20 to-base-300/20 backdrop-blur-xs grid place-items-center">
          <Pagination
            currentPage={data?.current_page || 0}
            totalPages={data?.page_count || 0}
            onPageChange={(newPage) =>
              navigate({ search: (prev) => ({ ...prev, page: newPage }) })
            }
          />
        </div>
      </div>

      <div className="fab">
        <RippleButton
          className="btn btn-primary btn-lg btn-circle"
          onClick={filterModalRef.current?.open}
        >
          <MdSearch className="size-8" />
        </RippleButton>
      </div>

      <Modal ref={filterModalRef}>
        <div className="modal-box">
          <div className="card w-full shrink-0 mx-auto border-base-300 p-2">
            <form
              className="card-body p-0"
              // method="dialog"
              onSubmit={handleSubmit((data) => {
                filterModalRef.current?.close();
                navigate({
                  search: () => ({ ...BookQueryFilter.parse(data), page: 1 }),
                });
              })}
            >
              {/* Book name */}
              <div className="form-control mb-3">
                <label className="label rounded-lg" htmlFor="book_name">
                  {errors.book_name ? (
                    <span className="label-text text-error">
                      {errors.book_name.message}
                    </span>
                  ) : (
                    <span className="label-text">Book name</span>
                  )}
                </label>
                <input
                  id="book_name"
                  type="text"
                  {...register("book_name")}
                  className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                />
              </div>

              {/* Genre Field */}
              <div className="form-control mb-3">
                <label className="label" htmlFor="genre_name">
                  {errors.genre_name ? (
                    <span className="label-text text-error">
                      {errors.genre_name.message}
                    </span>
                  ) : (
                    <span className="label-text">Book genre</span>
                  )}
                </label>
                <input
                  id="genre_name"
                  type="text"
                  {...register("genre_name")}
                  className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                />
              </div>

              {/* Language Field */}
              <div className="form-control mb-3">
                <label className="label rounded-full" htmlFor="book_language">
                  {errors.book_language ? (
                    <span className="label-text text-error">
                      {errors.book_language.message}
                    </span>
                  ) : (
                    <span className="label-text">Book language</span>
                  )}
                </label>
                <input
                  id="book_language"
                  type="text"
                  {...register("book_language")}
                  className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                />
              </div>

              {/* Author field */}
              <div className="form-control">
                <label className="label rounded-full" htmlFor="author_name">
                  {errors.author_name ? (
                    <span className="label-text text-error">
                      {errors.author_name.message}
                    </span>
                  ) : (
                    <span className="label-text">Author name</span>
                  )}
                </label>
                <input
                  id="author_name"
                  type="text"
                  {...register("author_name")}
                  className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                />
              </div>
              {/* Submit */}
              <div className="form-control mt-2 flex justify-center">
                <RippleButton
                  type="submit"
                  className="btn btn-primary rounded-lg w-full"
                >
                  filter book
                </RippleButton>
              </div>
            </form>
          </div>
          {/* <div className="modal-action place-items-center"></div> */}
        </div>
      </Modal>
    </>
  );
}
