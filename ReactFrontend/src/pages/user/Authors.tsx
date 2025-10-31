import { type FC, useState, useEffect, type JSX } from "react";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  Image,
  Pagination,
  Spinner,
  addToast,
  Chip,
  // Divider,
  Button,
} from "@heroui/react";
import { prettifyError, ZodError } from "zod";
import {
  IoSearch,
  IoWarningOutline,
  IoCalendarOutline,
  IoLocationSharp,
  // IoPerson,
} from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
// import { HiLocationMarker } from "react-icons/hi";
// import { BiCalendar } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import {
  type Author,
  type AuthorPaginated,
  AuthorPaginatedSchema,
  AuthorQueryBuilder,
} from "./../../validator/author";
import base from "../../utils/base";
const AuthorCard: FC<{ author: Author }> = ({ author }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 scale-[98%]">
      <CardBody className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {/* Left side - Image */}
          <div className="flex-shrink-0">
            <Image
              alt={`${author.author_name} profile`}
              src={author.author_image}
              className="object-cover w-full sm:w-40 sm:h-40 rounded-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col justify-between flex-1 gap-3">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {author.author_name}
              </h3>

              <div className="flex flex-wrap gap-2 mb-3">
                <Chip
                  startContent={<IoLocationSharp className="text-sm" />}
                  size="sm"
                  variant="flat"
                >
                  {author.nationality}
                </Chip>
                <Chip size="sm" variant="flat" className="capitalize">
                  {author.gender}
                </Chip>
              </div>

              <p className="text-sm text-default-600 line-clamp-2 mb-3">
                {author.author_description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-default-500">
                <IoCalendarOutline className="text-base" />
                <p className="text-xs">
                  {new Date(author.born_on).toLocaleDateString()}
                </p>
              </div>

              <Button
                size="sm"
                color="primary"
                variant="flat"
                endContent={<FaArrowRight />}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
const AuthorViewer: React.FC = () => {
  const [data, setData] = useState<AuthorPaginated | null>(null);
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
        if (response.status != 200)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const result = AuthorPaginatedSchema.safeParse(response.data);
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

  const renderContent: () => JSX.Element = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner label="Loading authors..." size="lg" />
        </div>
      );
    }
    // 2. Error State
    if (error) {
      return (
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
    }

    if (!data || data.results.length === 0) {
      return (
        <div className="text-center text-default-500 min-h-[400px] flex flex-col justify-center items-center">
          <p className="text-lg font-medium">No authors found.</p>
          <p>Try adjusting your search query.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.results.map((author) => (
          <AuthorCard key={author.author_id} author={author} />
        ))}
      </div>
    );
  };

  const resultsPerPage = 10;
  const totalPages = data ? Math.ceil(data.count / resultsPerPage) : 1;

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Authors</h1>
        <Input
          isClearable
          // radius="lg"
          placeholder="Search by name..."
          startContent={<IoSearch className="text-default-400" />}
          value={searchInput}
          onValueChange={(e) => setSearchInput(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              try {
                const params = new URLSearchParams(
                  AuthorQueryBuilder.parse(searchInput) as Record<
                    string,
                    string
                  >
                );
                setSearchQuery(params.toString());
              } catch (error) {
                addToast({
                  title: "incorrect search",
                  description: prettifyError(error as ZodError),
                  color: "danger",
                });
              }
            }
          }}
          className="w-full md:max-w-xs"
          onClear={() => setSearchInput("")}
        />
      </div>

      <div className="max-h-[calc(100dvh-280px)] md:max-h-[calc(100dvh-256px)] overflow-y-auto">
        {renderContent()}
      </div>

      {data && totalPages > 1 && !isLoading && (
        <div className="flex justify-center">
          <Pagination
            isCompact
            showControls
            total={totalPages}
            page={Number(searchQuery.get("page") || "1")}
            onChange={(newPage) => {
              setSearchQuery((prev) => ({ ...prev, page: newPage }));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AuthorViewer;
