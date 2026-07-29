import { Link } from "@tanstack/react-router";
import Pagination from "@/components/Pagination";
import { BorrowQuerySchema } from "@/validators/borrow";
import borrowQueryOptions from "@/hooks/fetchBorrowRequests";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user/borrow/")({
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
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(borrowQueryOptions()),
  validateSearch: BorrowQuerySchema,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const navigate = Route.useNavigate();
  return (
    <>
      <div className="page-height w-full h-full overflow-auto border border-base-content/5 custom-grad p-2">
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
                  <Link to="/user/borrow/$id" params={{ id: item.borrow_id }}>
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
