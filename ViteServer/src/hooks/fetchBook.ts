import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import {
  type PartialBookPaginated,
  type BookQuery,
  PartialBookPaginatedSchema,
} from "@/validators/book";

const bookQuery = async (query: BookQuery) => {
  const response: AxiosResponse<PartialBookPaginated> =
    await base.get<PartialBookPaginated>("/books", {
      params: query,
      schema: PartialBookPaginatedSchema,
    });
  return response.data;
};

const booksQueryOptions = (query: BookQuery) =>
  queryOptions({
    queryKey: ["books", JSON.stringify(query)],
    queryFn: async () => await bookQuery(query),
    retry: 1,
  });
export default booksQueryOptions;
