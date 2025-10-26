import { type FC, useState, useEffect, type JSX } from "react";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Pagination,
  Spinner,
} from "@heroui/react"; // Attempting to fix import path
import { prettifyError } from "zod";
import { IoSearch, IoWarningOutline } from "react-icons/io5";
import {
  type Author,
  type AuthorPaginated,
  AuthorPaginatedSchema,
} from "./../../validator/author";
import base from "../../utils/base";

const AuthorCard: FC<{ author: Author }> = ({ author }) => {
  return (
    <Card className="p-4 h-full scale-95 hover:scale-100 transition-transform duration-200">
      <CardHeader className="flex gap-4">
        <Image
          alt={`${author.author_name} profile`}
          height={80}
          radius="md"
          src={author.author_image}
          width={80}
          className="object-cover h-[80px] w-[80px]"
        />
        <div className="flex flex-col justify-center">
          <p className="text-xl font-bold">{author.author_name}</p>
          <p className="text-sm text-default-500 capitalize">
            {author.nationality} ({author.gender})
          </p>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        {/* line-clamp-3 truncates the description to 3 lines */}
        <p className="text-sm text-default-700 line-clamp-3">
          {author.author_description}
        </p>
      </CardBody>
      <CardFooter>
        <p className="text-xs text-default-400">
          Born: {new Date(author.born_on).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};
const AuthorViewer: React.FC = () => {
  const [data, setData] = useState<AuthorPaginated | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        const API_ENDPOINT = "/authors";
        const response = await base.get(`${API_ENDPOINT}?${params.toString()}`);
        if (response.status != 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
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
  }, [page]);

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
      {/* --- 1. Header & Search Field --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Authors</h1>
        <Input
          isClearable
          radius="lg"
          placeholder="Search by name..."
          startContent={<IoSearch className="text-default-400" />}
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
          }}
          className="w-full md:max-w-xs"
          onClear={() => {
            setSearchQuery("");
          }}
        />
      </div>

      {/* --- 2. Content Area (Loading/Error/Empty/Grid) --- */}
      <div className="max-h-[calc(100dvh-280px)] md:max-h-[calc(100dvh-256px)] overflow-y-auto">
        {renderContent()}
      </div>

      {data && totalPages > 1 && !isLoading && (
        <div className="flex justify-center">
          <Pagination
            isCompact
            showControls
            total={totalPages}
            page={page}
            onChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AuthorViewer;
