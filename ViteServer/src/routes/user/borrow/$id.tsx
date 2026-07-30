import { BiBookOpen } from "react-icons/bi";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { bookCoverOptionsById } from "@/hooks/fetchBookById";
import borrowQueryByIdOptions from "@/hooks/fetchBorrowRequestById";

export const Route = createFileRoute("/user/borrow/$id")({
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(borrowQueryByIdOptions(id)),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const { data: coverData, isLoading: isCoverLoading } = useQuery(
    bookCoverOptionsById(data.requested_book),
  );

  const getStatusBadge = () => {
    if (data.returned_at) {
      return <div className="badge badge-success gap-1">Returned</div>;
    }
    if (data.book_copy) {
      return <div className="badge badge-info gap-1">Approved & Issued</div>;
    }
    return <div className="badge badge-warning gap-1">Pending Approval</div>;
  };

  return (
    <>
      <div className="breadcrumbs text-sm px-2 bg-linear-120 from-primary to-accent via-secondary">
        <ul>
          <li>
            <Link to={"/user/borrow"} className="link" preload={false}>
              borrows
            </Link>
          </li>
          <li>{data.borrow_id}</li>
        </ul>
      </div>
      <div className="max-h-[calc(100dvh-6.25rem)] h-dvh grid place-items-center custom-grad p-4 md:p-8 text-base-content overflow-y-scroll">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Breadcrumb / Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100 p-6 rounded-box shadow-md border border-base-300">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                Borrow Request
              </span>
              <h1 className="text-2xl font-bold tracking-tight">
                ID:{" "}
                <span className="font-mono text-primary">{data.borrow_id}</span>
              </h1>
            </div>
            <div>{getStatusBadge()}</div>
          </div>

          {/* Main Details Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Book Cover Container */}
            <div className="bg-base-100 p-6 rounded-box shadow-md border border-base-300 flex flex-col items-center justify-center min-h-75 w-full">
              {isCoverLoading ? (
                /* Skeleton structure mimicking the book cover dimensions */
                <div className="skeleton w-full max-w-50 h-60 rounded-lg bg-base-300"></div>
              ) : coverData?.book_cover ? (
                <img
                  src={coverData.book_cover}
                  alt="Book Cover"
                  className="w-full max-w-50 h-auto object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                />
              ) : (
                /* Clean, icon-based fallback using theme-derived opacity */
                <div className="flex flex-col items-center text-base-content/40 gap-2">
                  <BiBookOpen className="h-16 w-16" />
                  <span className="text-sm font-medium">
                    No Cover Available
                  </span>
                </div>
              )}
            </div>

            {/* Borrow Stats & Info */}
            <div className="md:col-span-2 bg-base-100 p-6 rounded-box shadow-md border border-base-300 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4 text-base-content border-b border-base-200 pb-2">
                  Request Summary
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-base-200 p-4 rounded-lg">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="book-id">
                        Book-Id
                      </label>
                      <input
                        type="number"
                        id="book-id"
                        defaultValue={data.requested_book}
                        className="input input-ghost focus:outline-0"
                        readOnly
                      />
                    </fieldset>
                  </div>

                  <div className="bg-base-200 p-4 rounded-lg">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="assigned-copy">
                        Assigned Copy
                      </label>
                      <input
                        type="text"
                        id="assigned-copy"
                        defaultValue={data.book_copy ?? "not assigned"}
                        className="input input-ghost focus:outline-0"
                        readOnly
                      />
                    </fieldset>
                  </div>

                  <div className="bg-base-200 p-4 rounded-lg">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="requested-date">
                        Requested Date
                      </label>
                      <input
                        type="date"
                        id="requested-date"
                        defaultValue={data.requested_at}
                        className="input input-ghost focus:outline-0"
                        readOnly
                      />
                    </fieldset>
                  </div>

                  <div className="bg-base-200 p-4 rounded-lg">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="expected-date">
                        Expected Return
                      </label>
                      <input
                        type="date"
                        id="expected-date"
                        defaultValue={data.return_date}
                        className="input input-ghost focus:outline-0"
                        readOnly
                      />
                    </fieldset>
                  </div>

                  <div className="bg-base-200 p-4 rounded-lg">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="approval-date">
                        Approval Date
                      </label>
                      <input
                        type="date"
                        id="approval-date"
                        defaultValue={data.approved_at ?? ""}
                        className="input input-ghost focus:outline-0"
                        readOnly
                      />
                    </fieldset>
                  </div>

                  <div className="bg-base-200 p-4 rounded-lg">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="returned-date">
                        Returned Date
                      </label>
                      <input
                        type="date"
                        id="returned-date"
                        defaultValue={data.returned_at || ""}
                        className="input input-ghost focus:outline-0"
                        readOnly
                      />
                    </fieldset>
                  </div>
                </div>
              </div>

              {/* Condition badge if book was returned */}
              {data.return_condition && (
                <div className="alert alert-neutral shadow-sm mt-4">
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-content/70">
                      Return Condition
                    </h3>
                    <div className="text-sm font-medium mt-1">
                      {data.return_condition}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
