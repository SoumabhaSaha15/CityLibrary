import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import {
  type PartialBookPaginated,
  PartialBookPaginatedSchema,
} from "@/validators/book";

const bookQuery = async (query: Record<string, any> = { page: 1 }) => {
  const response: AxiosResponse<PartialBookPaginated> =
    await base.get<PartialBookPaginated>("/books", {
      params: query,
      schema: PartialBookPaginatedSchema,
    });
  return response.data;
};
const useBooks = (query: Record<string, any>) =>
  queryOptions({
    queryKey: ["books", JSON.stringify(query)],
    queryFn: () => bookQuery(query),
    retry: 1,
  });
export default useBooks;
