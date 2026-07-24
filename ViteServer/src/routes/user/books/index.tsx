import { useRef } from "react";
import { MdSearch } from "react-icons/md";
import BookCard from "@/components/BookCard";
import { useForm } from "@tanstack/react-form";
import Pagination from "@/components/Pagination";
import booksQueryOptions from "@/hooks/fetchBook";
import { useHotkey } from "@tanstack/react-hotkeys";
import RippleButton from "@/components/RippleButton";
import NoRecordFound from "@/components/NoRecordFound";
import Modal, { type ModalHandle } from "@/components/Modal";
import {
  BookQuerySchema,
  type BookQuery,
  BookQueryFilter,
} from "@/validators/book";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user/books/")({
  loaderDeps: ({ search }) => ({ ...search }),
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
  loader: ({ deps, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      booksQueryOptions({ ...deps, page: deps.page || 1 }),
    ),
  validateSearch: BookQuerySchema,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const filterModalRef = useRef<ModalHandle>(null);
  const { page: _, ...restDeps } = Route.useLoaderDeps();

  const filterSchema = BookQuerySchema.omit({ page: true });

  const form = useForm({
    defaultValues: restDeps satisfies Omit<BookQuery, "page">,
    validators: {
      onChange: filterSchema,
    },
    onSubmit: ({ value }) => {
      filterModalRef.current?.close();
      navigate({
        search: () => ({ ...BookQueryFilter.parse(value), page: 1 }),
      });
    },
  });

  useHotkey("Mod+K", (_e, _ctx) => filterModalRef.current?.open(), {
    conflictBehavior: "error",
  });

  return (
    <>
      <div className="page-height w-full flex flex-col custom-grad">
        {data.results.length == 0 ? (
          <div className="min-h-[calc(100dvh-4rem)] overflow-y-auto overflow-x-clip grid place-items-center gap-2 p-2">
            <NoRecordFound className="bg-base-300 hover:scale-105 transition-transform hover:shadow-accent-content shadow-lg" />
          </div>
        ) : (
          <div className="min-h-[calc(100dvh-4rem)] overflow-y-auto overflow-x-clip grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-[64vh] sm:auto-rows-[56vh] gap-2 p-2">
            {data?.results.map((item) => (
              <BookCard book={item} key={`book[${item.book_id}]`} />
            ))}
          </div>
        )}
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
          onClick={() => filterModalRef.current?.open()}
        >
          <MdSearch className="size-8" />
        </RippleButton>
      </div>

      <Modal ref={filterModalRef}>
        <div className="modal-box">
          <div className="card w-full shrink-0 mx-auto border-base-300 p-2">
            <form
              className="card-body p-0"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {/* Book name */}
              <form.Field name="book_name">
                {(field) => {
                  const errorMessage = field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined;
                  return (
                    <div className="form-control mb-3">
                      <label className="label rounded-lg" htmlFor="book_name">
                        {errorMessage ? (
                          <span className="label-text text-error">
                            {errorMessage}
                          </span>
                        ) : (
                          <span className="label-text">Book name</span>
                        )}
                      </label>
                      <input
                        id="book_name"
                        type="text"
                        name={field.name}
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Genre Field */}
              <form.Field name="genre_name">
                {(field) => {
                  const errorMessage = field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined;
                  return (
                    <div className="form-control mb-3">
                      <label className="label" htmlFor="genre_name">
                        {errorMessage ? (
                          <span className="label-text text-error">
                            {errorMessage}
                          </span>
                        ) : (
                          <span className="label-text">Book genre</span>
                        )}
                      </label>
                      <input
                        id="genre_name"
                        type="text"
                        name={field.name}
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Language Field */}
              <form.Field name="book_language">
                {(field) => {
                  const errorMessage = field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined;
                  return (
                    <div className="form-control mb-3">
                      <label
                        className="label rounded-full"
                        htmlFor="book_language"
                      >
                        {errorMessage ? (
                          <span className="label-text text-error">
                            {errorMessage}
                          </span>
                        ) : (
                          <span className="label-text">Book language</span>
                        )}
                      </label>
                      <input
                        id="book_language"
                        type="text"
                        name={field.name}
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Author field */}
              <form.Field name="author_name">
                {(field) => {
                  const errorMessage = field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined;
                  return (
                    <div className="form-control">
                      <label
                        className="label rounded-full"
                        htmlFor="author_name"
                      >
                        {errorMessage ? (
                          <span className="label-text text-error">
                            {errorMessage}
                          </span>
                        ) : (
                          <span className="label-text">Author name</span>
                        )}
                      </label>
                      <input
                        id="author_name"
                        type="text"
                        name={field.name}
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                      />
                    </div>
                  );
                }}
              </form.Field>

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
        </div>
      </Modal>
    </>
  );
}
