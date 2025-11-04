import { type FC, useState, useEffect, type JSX } from "react";
import { useSearchParams } from "react-router-dom";
import AuthorCard from "../../components/AuthorCard";
import {
  Input,
  Pagination,
  addToast,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  Radio,
  RadioGroup,
  Chip,
} from "@heroui/react";
import {
  type Author,
  type AuthorQuery,
  type AuthorPaginated,
  AuthorPaginatedSchema,
  // AuthorQueryBuilder,
  AuthorQuerySchema,
} from "./../../validator/author";
import { prettifyError, ZodError } from "zod";
import { IoSearch, IoFilter, IoClose } from "react-icons/io5";
import { FaUser, FaGlobe } from "react-icons/fa";
import base from "../../utils/base";
const RESULTS_PER_PAGE = 10;

import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/AuthorsState";

const AuthorGrid: FC<{ authors: Author[] }> = ({ authors }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {authors.map((author, index) => (
      <AuthorCard key={index} author={author} />
    ))}
  </div>
);

const AuthorViewer: FC = () => {
  const [data, setData] = useState<AuthorPaginated | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<AuthorQuery>({});
  const [searchQuery, setSearchQuery] = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await base.get(`/authors?${searchQuery.toString()}`);
        if (response.status !== 200)
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

  const handleSearch = () => {
    const params = new URLSearchParams({ author_name: searchInput });
    setSearchQuery(params.toString());
  };

  const handleSearchKeyDown = ({
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") handleSearch();
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
    <>
      <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6">
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Authors</h1>
          <div className="flex items-center gap-2">
            <Input
              radius="full"
              placeholder="Search authors"
              startContent={<IoSearch />}
              value={searchInput}
              variant="faded"
              onValueChange={setSearchInput}
              onKeyDown={handleSearchKeyDown}
              onClear={() => setSearchInput("")}
            />
            <Button
              radius="full"
              isIconOnly
              variant="ghost"
              onPress={onOpen}
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
              total={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton={<IoClose className="font-black" size={40} />}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col gap-1"
                children={
                  <Chip
                    size="lg"
                    startContent={<IoSearch size={18} />}
                    variant="dot"
                  >
                    Search Filter
                  </Chip>
                }
              />
              <Divider />
              <ModalBody>
                <Input
                  type="text"
                  color="primary"
                  radius="full"
                  variant="underlined"
                  label="author_name"
                  value={searchFilter?.author_name || ""}
                  onInput={({ currentTarget }) =>
                    setSearchFilter((prev) => ({
                      ...prev,
                      author_name: currentTarget.value,
                    }))
                  }
                  endContent={<FaUser />}
                />
                <Input
                  type="text"
                  color="primary"
                  radius="full"
                  variant="underlined"
                  label="nationality"
                  value={searchFilter?.nationality || ""}
                  onInput={({ currentTarget }) =>
                    setSearchFilter((prev) => ({
                      ...prev,
                      nationality: currentTarget.value,
                    }))
                  }
                  endContent={<FaGlobe />}
                />
                <RadioGroup
                  label="gender"
                  orientation="horizontal"
                  onValueChange={(gender) =>
                    setSearchFilter((prev) => ({
                      ...prev,
                      gender: gender as AuthorQuery["gender"],
                    }))
                  }
                >
                  <Radio value="m">Male</Radio>
                  <Radio value="f">Female</Radio>
                  <Radio value="t">Trans</Radio>
                </RadioGroup>
              </ModalBody>
              <Divider />

              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    try {
                      const filter = AuthorQuerySchema.parse(searchFilter);
                      const params = new URLSearchParams(
                        filter as Record<string, string>
                      );
                      setSearchQuery(params.toString());
                    } catch (error) {
                      if (error instanceof ZodError)
                        addToast({
                          color: "danger",
                          title: "error occured",
                          description: prettifyError(error),
                        });
                      else
                        addToast({
                          color: "danger",
                          title: "error occured",
                          description:
                            error instanceof Error
                              ? error.message
                              : "search filter error.",
                        });
                    }
                    onClose();
                  }}
                  radius="full"
                  className="w-full"
                  children={"Apply"}
                  endContent={<IoFilter />}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthorViewer;
