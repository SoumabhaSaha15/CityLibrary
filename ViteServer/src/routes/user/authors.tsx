import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination";
import AuthorCard from "@/components/AuthorCard";
import RippleButton from "@/components/RippleButton";
import authorQueryoptions from "@/hooks/fetchAuthors";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal, { type ModalHandle } from "@/components/Modal";
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import {
  AuthorQuerySchema,
  filter,
  type AuthorQuery,
} from "@/validators/author";

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useQuery(authorQueryoptions(search));
  const navigate = useNavigate({ from: Route.fullPath });
  const filterModalRef = useRef<ModalHandle>(null);
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
      <div className="page-height w-full flex flex-col bg-base-200">
        <div className="min-h-[calc(100dvh-120px)] overflow-y-auto overflow-x-clip grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[60vh] sm:auto-rows-[50vh] gap-2 p-2">
          {data?.results.map((item) => (
            <AuthorCard author={item} key={`author[${item.author_id}]`} />
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
        <RippleButton
          className="btn btn-lg btn-circle btn-primary focus-visible:outline-0"
          onClick={filterModalRef.current?.open}
        >
          <MdSearch className="size-8" />
        </RippleButton>
      </div>

      <Modal ref={filterModalRef}>
        <div className="modal-box">
          <div className="card w-full shrink-0 mx-auto border-base-300 p-2">
            <form
              className="card-body"
              // method="dialog"
              onSubmit={handleSubmit((data) => {
                filterModalRef.current?.close();
                navigate({
                  search: () => ({ ...filter.parse(data), page: 1 }),
                });
              })}
            >
              {/* Author name */}
              <div className="form-control mb-3">
                <label className="label rounded-lg" htmlFor="author_name">
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
                  className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
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
                  className="select select-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent"
                  {...register("gender")}
                  id="gender"
                >
                  <option value="" defaultChecked>
                    Select Gender
                  </option>
                  {genders.map((item) => (
                    <option value={item} key={crypto.randomUUID()}>
                      {item == "" ? "unselect" : item}
                    </option>
                  ))}
                </select>
              </div>
              {/* Submit */}
              <div className="form-control mt-2 flex justify-center">
                <RippleButton
                  type="submit"
                  className="btn btn-primary rounded-lg w-full"
                >
                  filter author
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
export const Route = createFileRoute("/user/authors")({
  component: RouteComponent,
  beforeLoad: ({ search }) => {
    console.log(search);
    if (!search.page) {
      throw redirect({
        to: "/user/authors",
        search: { page: 1 },
        replace: true, // Replaces history so hitting 'back' works properly
      });
    }
  },
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      authorQueryoptions({ ...params, page: (params as any).page || 1 }),
    ),
  validateSearch: AuthorQuerySchema,
});
