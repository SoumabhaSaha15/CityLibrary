import Pagination from "@/components/Pagination";
import RippleButton from "@/components/RippleButton";
import { BorrowQuerySchema } from "@/validators/borrow";
import { useToast } from "@/contexts/Toast/ToastContext";
import { Link, useRouter } from "@tanstack/react-router";
import borrowQueryOptions from "@/hooks/fetchBorrowRequests";
import { MdRefresh, MdFilterList, MdMenu } from "react-icons/md";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user/borrow/")({
  loaderDeps: ({ search }) => ({ ...search }),
  component: RouteComponent,
  beforeLoad: ({ search, params }) => {
    if (!search.page) {
      console.log(params);
      throw redirect({
        to: "/user/borrow",
        search: { page: 1 },
        replace: true,
      });
    }
  },
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(borrowQueryOptions(deps)),
  validateSearch: BorrowQuerySchema,
});

function RouteComponent() {
  const router = useRouter();
  const data = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const { queryClient } = Route.useRouteContext();
  const toast = useToast({ horizontal: "toast-end", vertical: "toast-middle" });
  return (
    <>
      <div className="page-height w-full h-dvh overflow-auto border border-base-content/5 custom-grad p-2">
        <table className="table bg-base-200">
          {/* head */}
          <thead>
            <tr>
              <th>borrow_id</th>
              <th>book_copy</th>
              <th>returned_at</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((item) => (
              <tr key={item.borrow_id}>
                <td>
                  <Link
                    to="/user/borrow/$id"
                    className="link"
                    params={{ id: item.borrow_id }}
                    preload={false}
                  >
                    {item.borrow_id}
                  </Link>
                </td>
                <td>{item.book_copy}</td>
                <td>{item.returned_at ?? "--"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total borrows</th>
              <th colSpan={2}>{data.count}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="fab">
        {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
        <RippleButton
          tabIndex={0}
          role="button"
          className="btn btn-lg btn-circle btn-primary"
        >
          <MdMenu />
        </RippleButton>

        {/* buttons that show up when FAB is open */}
        <RippleButton
          className="btn btn-lg btn-circle"
          onClick={() => {
            queryClient.resetQueries({ queryKey: ["borrows"] });
            toast.open("refreshing page", "alert-info");
            router.invalidate();
          }}
        >
          <MdRefresh />
        </RippleButton>
        <RippleButton className="btn btn-lg btn-circle">
          <MdFilterList />
        </RippleButton>
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
    </>
  );
}
