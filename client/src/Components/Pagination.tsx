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
    <div className="join p-1 justify-center">
      {/* Previous Button */}
      <button
        className="join-item btn rounded-l-full"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            currentPage === page ? "btn-active btn-primary" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="join-item btn rounded-r-full"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};
export default Pagination;
