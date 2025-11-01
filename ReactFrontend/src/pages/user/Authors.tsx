import { type FC, useState, useEffect, type JSX } from "react";
import { useSearchParams } from "react-router-dom";
import AuthorCard from "../../components/AuthorCard";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Pagination,
  Spinner,
  addToast,
  Button,
} from "@heroui/react";
import {
  type Author,
  type AuthorPaginated,
  AuthorPaginatedSchema,
  AuthorQueryBuilder,
} from "./../../validator/author";
import { prettifyError, ZodError } from "zod";
import { IoWarningOutline, IoSearch } from "react-icons/io5";
import base from "../../utils/base";
const RESULTS_PER_PAGE = 10;

const LoadingState: FC = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <Spinner label="Loading authors..." size="lg" />
  </div>
);

const ErrorState: FC<{ error: string }> = ({ error }) => (
  <Card className="p-4 bg-danger-50 text-danger-700 max-w-md mx-auto">
    <CardHeader className="flex gap-2 items-center">
      <IoWarningOutline size={24} />
      <p className="font-bold text-lg">Failed to load authors</p>
    </CardHeader>
    <CardBody>
      <p>{error}</p>
    </CardBody>
  </Card>
);

const EmptyState: FC = () => (
  <div className="text-center text-default-500 min-h-[400px] flex flex-col justify-center items-center">
    <p className="text-lg font-medium">No authors found.</p>
    <p>Try adjusting your search query.</p>
  </div>
);

const AuthorGrid: FC<{ authors: Author[] }> = ({ authors }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {authors.map((author) => (
      <AuthorCard key={author.author_id} author={author} />
    ))}
  </div>
);

const AuthorViewer: FC = () => {
  const [data, setData] = useState<AuthorPaginated | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useSearchParams();

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await base.get(`/authors?${searchQuery.toString()}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = AuthorPaginatedSchema.safeParse(response.data);
        if (!result.success) {
          setError(prettifyError(result.error));
        } else {
          setData(result.data);
        }
      } catch (err) {
        setError((err as Error).message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthors();
  }, [searchQuery]);

  const handleSearch = () => {
    try {
      const params = new URLSearchParams(
        AuthorQueryBuilder.parse(searchInput) as Record<string, string>
      );
      setSearchQuery(params.toString());
    } catch (error) {
      addToast({
        title: "Incorrect search",
        description: prettifyError(error as ZodError),
        color: "danger",
      });
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  const handlePageChange = (newPage: number) => {
    setSearchQuery((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = (): JSX.Element => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (!data || data.results.length === 0) return <EmptyState />;
    return <AuthorGrid authors={data.results} />;
  };

  const totalPages = data ? Math.ceil(data.count / RESULTS_PER_PAGE) : 1;
  const currentPage = Number(searchQuery.get("page") || "1");
  const showPagination = data && totalPages > 1 && !isLoading;

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Authors</h1>
        {/* <Input
          isClearable
          radius="sm"
          placeholder="Search authors"
          startContent={<IoSearch className="text-default-400" />}
          value={searchInput}
          onValueChange={setSearchInput}
          onKeyDown={handleSearchKeyDown}
          onClear={() => setSearchInput("")}
          
        /> */}
        <Input
          // isClearable
          type="search"
          radius="none"
          placeholder="Search authors"
          // classNames={{
          //   inputWrapper: "rounded-r-none",
          // }}
          className="w-full md:max-w-xs"
          endContent={<Button className="rounded-l-none">Search</Button>}
        />
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
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AuthorViewer;
