import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import { BookSchema, type Book } from "@/validators/book";

const bookQueryById = async (id: number) => {
  const response: AxiosResponse<Book> = await base.get<Book>(`/books/${id}`, {
    schema: BookSchema,
  });
  return response.data;
};

const bookCoverById = async (id: number) => {
  const response: AxiosResponse<{ book_cover: string }> = await base.get<Book>(
    `/books/${id}/cover`,
    {
      schema: BookSchema.pick({ book_cover: true }),
    },
  );
  return response.data;
};

export const bookCoverOptionsById = (id: number) =>
  queryOptions({
    queryKey: ["books", id.toString(), "cover"],
    queryFn: async () => await bookCoverById(id),
    retry: 1,
  });

const bookQueryOptionsById = (id: number) =>
  queryOptions({
    queryKey: ["books", id.toString()],
    queryFn: async () => await bookQueryById(id),
    retry: 1,
  });
export default bookQueryOptionsById;
