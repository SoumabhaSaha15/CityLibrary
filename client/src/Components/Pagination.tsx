import { MdArrowBack } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
type PaginationProp = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProp) => {
  // Logic to prevent too many buttons if totalPages is huge
  // For this demo, we'll keep it simple as requested, but if pages > 8,
  // you might want to implement "..." truncation logic.
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="join p-2 justify-center gap-0.5">
      {/* Previous Button */}
      <button
        className="join-item btn rounded-l-lg rounded-r-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdArrowBack className="size-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn rounded-sm ${
            currentPage === page ? "btn-active btn-primary" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="join-item btn rounded-r-lg rounded-l-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdArrowForward className="size-4" />
      </button>
    </div>
  );
};
export default Pagination;
