import base from "@/util/axios-base";
import { queryOptions } from "@tanstack/react-query";
import { type BookPaginated, BookPaginatedSchema } from "@/validators/book";
const bookQuery = async (query={})=>{
  await base.get<BookPaginated>("/books", {
        params: query,
        schema: BookPaginatedSchema,
      })
}
const useBooks = (query = {}) =>
  queryOptions({
    queryKey: ["books", query],
    queryFn: () =>
      ,
    retry: 1,
  });
export default useBooks;
