import base from "../../utils/base";
import { prettifyError } from "zod";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, type FC, type JSX } from "react";
import { IoFilter, IoSearch } from "react-icons/io5";
import { Pagination, Input, Button } from "@heroui/react";
import BookCard from "../../components/BookCard";
import {
  ErrorState,
  LoadingState,
  EmptyState,
} from "../../components/BooksState";
import {
  BookPaginatedSchema,
  type Book,
  type BookPaginated,
} from "../../validator/book";
const RESULTS_PER_PAGE = 10;
const BooksGrid: FC<{ books: Book[] }> = ({ books }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {books.map((book, index) => (
      <BookCard {...book} key={index} />
    ))}
  </div>
);
const Books: FC = () => {
  const [data, setData] = useState<BookPaginated | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await base.get(`/books?${searchQuery.toString()}`);
        if (response.status !== 200)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const result = BookPaginatedSchema.safeParse(response.data);
        if (!result.success) setError(prettifyError(result.error));
        else setData(result.data);
      } catch (err) {
        setError((err as Error).message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthors();
  }, [searchQuery]);
  const handlePageChange = (newPage: number) => {
    setSearchQuery((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const totalPages = data ? Math.ceil(data.count / RESULTS_PER_PAGE) : 1;
  const currentPage = Number(searchQuery.get("page") || "1");
  const showPagination = data && totalPages > 1 && !isLoading;

  const renderContent = (): JSX.Element => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (!data || data.results.length === 0) return <EmptyState />;
    return <BooksGrid books={data.results} />;
  };
  return (
    <>
      <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6">
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Books</h1>
          <div className="flex items-center gap-2">
            <Input
              radius="full"
              placeholder="Search books"
              startContent={<IoSearch />}
              // value={searchInput}
              variant="faded"
              // onValueChange={setSearchInput}
              // onKeyDown={handleSearchKeyDown}
              // onClear={() => setSearchInput("")}
            />
            <Button
              radius="full"
              isIconOnly
              variant="ghost"
              // onPress={onOpen}
              size="sm"
              children={<IoFilter className="text-default-900" size={18} />}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="max-h-[calc(100dvh-280px)] md:max-h-[calc(100dvh-256px)] overflow-y-auto">
          {renderContent()}
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="flex justify-center">
            <Pagination
              isCompact
              showControls
              radius="full"
              total={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Books;
