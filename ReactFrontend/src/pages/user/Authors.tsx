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
} from "@heroui/react";
import {
  type Author,
  type AuthorPaginated,
  AuthorPaginatedSchema,
  AuthorQueryBuilder,
} from "./../../validator/author";
import { prettifyError, ZodError } from "zod";
import { IoSearch } from "react-icons/io5";
// import { FaUser } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
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
              startContent={<IoSearch className="text-default-400" />}
              value={searchInput}
              onValueChange={setSearchInput}
              onKeyDown={handleSearchKeyDown}
              onClear={() => setSearchInput("")}
            />
            <Button
              radius="full"
              isIconOnly
              variant="bordered"
              className="scale-80"
              onPress={onOpen}
              children={<GoKebabHorizontal />}
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

      <Modal placement="top-center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col gap-1"
                children={"Search Filter"}
              />
              <Divider />
              <ModalBody>
                <Input
                  type="text"
                  color="primary"
                  radius="full"
                  variant="underlined"
                  label="author_name"
                />
                <Input
                  type="text"
                  color="primary"
                  radius="full"
                  variant="underlined"
                  label="nationality"
                />
                <RadioGroup label="Gender">
                  <Radio value="m">Male</Radio>
                  <Radio value="f">Female</Radio>
                  <Radio value="t">Trans</Radio>
                </RadioGroup>
              </ModalBody>
              <Divider />

              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  radius="full"
                  onPress={onClose}
                  children={"Close"}
                />
                <Button
                  color="primary"
                  onPress={onClose}
                  radius="full"
                  children={"Apply"}
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
