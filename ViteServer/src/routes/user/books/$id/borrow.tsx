import { Link } from "@tanstack/react-router";
import { cn } from "@/util/cn";
import { useForm } from "@tanstack/react-form";
import { RequestBorrowSchema } from "@/validators/borrow";
import RippleButton from "@/components/RippleButton";
import { createFileRoute } from "@tanstack/react-router";
import { bookCoverOptionsById } from "@/hooks/fetchBookById";
import borrowRequestOption from "@/hooks/requestBorrowById";
import { useMutation } from "@tanstack/react-query";
export const Route = createFileRoute("/user/books/$id/borrow")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(bookCoverOptionsById(Number(id))),
});

function RouteComponent() {
  const params = Route.useParams();
  const data = Route.useLoaderData();
  const { mutate } = useMutation(borrowRequestOption);
  const form = useForm({
    validators: {
      onChange: RequestBorrowSchema,
    },
    defaultValues: {
      requested_book: Number(params.id),
      return_date: "",
    },
    onSubmit: ({ value }) => {
      mutate(value, { onSuccess: () => {} });
    },
  });

  return (
    <>
      <div className="breadcrumbs text-sm px-2 bg-linear-210 from-primary to-accent via-secondary">
        <ul>
          <li>
            <Link to={"/user/books"} className="link" preload={false}>
              books
            </Link>
          </li>
          <li>id: {params.id}</li>
        </ul>
      </div>

      <div className="page-height custom-grad min-h-[calc(100dvh-6.25rem)] grid place-items-center">
        <div className="card bg-base-200 w-full max-w-sm lg:max-w-md shrink-0 shadow-md hover:scale-110 transition-transform">
          <div className="card-body p-4 sm:p-8">
            <form
              className="fieldset space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <label aria-label="Upload profile picture">
                <div className="avatar grid place-items-center">
                  <div className="w-64">
                    <img
                      src={data.book_cover}
                      alt="profile-pic"
                      className="rounded-lg object-contain bg-base-content"
                    />
                  </div>
                </div>
              </label>

              <form.Field name="requested_book">
                {(field) => {
                  const errorMessage = field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined;
                  return (
                    <div>
                      <label
                        className="floating-label"
                        htmlFor="requested_book"
                      >
                        <span
                          className={cn(
                            "transition-colors duration-300",
                            errorMessage && "text-error text-sm ml-2",
                          )}
                        >
                          {errorMessage ?? "requested book id"}
                        </span>
                        <input
                          type="number"
                          className={cn(
                            "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent",
                            errorMessage && "focus:ring-error",
                          )}
                          id="requested_book"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          readOnly
                          // required
                        />
                      </label>
                    </div>
                  );
                }}
              </form.Field>

              <form.Field name="return_date">
                {(field) => {
                  const errorMessage = field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined;
                  return (
                    <div>
                      <label className="floating-label" htmlFor="return_date">
                        <span
                          className={cn(
                            "transition-colors duration-300",
                            errorMessage && "text-error text-sm ml-2",
                          )}
                        >
                          {errorMessage ?? "return"}
                        </span>
                        <input
                          type="date"
                          className={cn(
                            "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent",
                            errorMessage && "focus:ring-error",
                          )}
                          id="return_date"
                          name={field.name}
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          required
                        />
                      </label>
                    </div>
                  );
                }}
              </form.Field>

              <form.Subscribe selector={(state) => [state.isSubmitting]}>
                {([isSubmitting]) => (
                  <RippleButton
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full hover:btn-secondary"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-dots loading-md text-accent" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </RippleButton>
                )}
              </form.Subscribe>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
