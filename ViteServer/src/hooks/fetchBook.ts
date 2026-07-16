import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import {
  type PartialBookPaginated,
  type BookQuery,
  PartialBookPaginatedSchema,
  type Book,
} from "@/validators/book";

const bookQuery = async (query: BookQuery) => {
  const response: AxiosResponse<PartialBookPaginated> =
    await base.get<PartialBookPaginated>("/books", {
      params: query,
      schema: PartialBookPaginatedSchema,
    });
  return response.data;
};

const bookQueryById = async (id: number) => {
  const response: AxiosResponse<Book> = await base.get<Book>(`/books/${id}`);
  return response.data;
};
const useBooks = (query: BookQuery) =>
  queryOptions({
    queryKey: ["books", JSON.stringify(query)],
    queryFn: () => bookQuery(query),
    retry: 1,
  });
export default useBooks;

export const useBook = (id: number) =>
  queryOptions({
    queryKey: ["books", id.toString()],
    queryFn: () => bookQueryById(id),
    retry: 1,
  });
