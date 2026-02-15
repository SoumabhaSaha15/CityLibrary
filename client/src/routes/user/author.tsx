import useRipple from "use-ripple-hook";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/Components/Pagination";
import AuthorCard from "@/Components/AuthorCard";
import authorQueryoptions from "@/hooks/fetchAuthors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/Contexts/Modal/ModalContext";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthorQuerySchema, type AuthorQuery } from "@/validators/author";

function RouteComponent() {
  const searchFAB = useRipple({ color: "currentColor" });
  const filterBtn = useRipple({ color: "currentColor" });
  const search = Route.useSearch();
  const { data } = useQuery(authorQueryoptions(search));
  const navigate = useNavigate({ from: Route.fullPath });
  const { modalRef, openModal, closeModal } = useModal();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Omit<AuthorQuery, "page">>({
    resolver: zodResolver(AuthorQuerySchema.omit({ page: true })),
  });
  const genders = AuthorQuerySchema.shape.gender.unwrap().options;
  return (
    <>
      <div className="page-height w-full flex flex-col">
        <div className="max-h-[calc(100dvh-104px)] overflow-y-auto overflow-x-clip grid place-items-center grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 auto-rows-[33vh] gap-2 p-2">
          {data?.results.map((item) => (
            <AuthorCard author={item} key={`author[${item.author_id}]`} />
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
                  const { page, ...page_removed } = prev;
                  return page_removed;
                },
              });
          }}
        />
      </div>

      <div className="fab">
        <button
          className="btn btn-lg btn-circle btn-primary"
          ref={searchFAB[0]}
          onPointerDown={searchFAB[1]}
          onClick={openModal}
        >
          <MdSearch className="size-8" />
        </button>
      </div>

      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <div className="card w-full max-w-sm shrink-0 mx-auto border-base-300 p-2">
            <form
              className="card-body"
              // method="dialog"
              onSubmit={handleSubmit((data) => {
                closeModal();
                navigate({ search: (_) => data });
              })}
            >
              <div className="form-control mb-3">
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
                  className="input input-bordered w-full rounded-full focus:outline-none focus:ring-0 focus:ring-accent"
                />
              </div>

              {/* Nationality Field */}
              <div className="form-control mb-3">
                <label className="label" htmlFor="nationality">
                  {errors.nationality ? (
                    <span className="label-text text-error">
                      {errors.nationality.message}
                    </span>
                  ) : (
                    <span className="label-text">Nationality</span>
                  )}
                </label>
                <input
                  id="nationality"
                  type="text"
                  {...register("nationality")}
                  className="input input-bordered w-full rounded-full focus:outline-none focus:ring-0 focus:ring-accent"
                />
              </div>

              {/* Gender Field */}
              <div className="form-control">
                <label className="label rounded-full" htmlFor="gender">
                  {errors.gender ? (
                    <span className="label-text text-error">
                      {errors.gender.message}
                    </span>
                  ) : (
                    <span className="label-text">Gender</span>
                  )}
                </label>
                <select
                  className="select select-bordered w-full rounded-full focus:outline-none focus:ring-0 focus:ring-accent"
                  {...register("gender")}
                  id="gender"
                >
                  <option value="" defaultChecked>
                    Select Gender
                  </option>
                  {genders.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control mt-2 flex justify-center">
                <button
                  type="submit"
                  ref={filterBtn[0]}
                  onPointerDown={filterBtn[1]}
                  className="btn btn-primary rounded-full w-full"
                >
                  filter author
                </button>
              </div>
            </form>
          </div>
          <div className="modal-action place-items-center"></div>
        </div>
      </dialog>
    </>
  );
}
export const Route = createFileRoute("/user/author")({
  component: RouteComponent,
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(authorQueryoptions(params)),
  validateSearch: AuthorQuerySchema,
});
