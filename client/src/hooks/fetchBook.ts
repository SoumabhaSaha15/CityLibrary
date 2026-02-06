import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import { type BookPaginated, BookPaginatedSchema } from "@/validators/book";

const bookQuery = async (query = {}) => {
  const response: AxiosResponse<BookPaginated> = await base.get<BookPaginated>(
    "/books",
    {
      params: query,
      schema: BookPaginatedSchema,
    },
  );
  return response.data;
};
const useBooks = (query = {}) =>
  queryOptions({
    queryKey: ["books", query],
    queryFn: () => bookQuery(query),
    retry: 1,
  });
export default useBooks;
