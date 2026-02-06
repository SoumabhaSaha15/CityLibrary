import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import {
  type AuthorPaginated,
  AuthorPaginatedSchema,
} from "@/validators/author";

const authorQuery = async (query = {}) => {
  const response: AxiosResponse<AuthorPaginated> =
    await base.get<AuthorPaginated>("/authors", {
      params: query,
      schema: AuthorPaginatedSchema,
    });
  return response.data;
};
const useAuthors = (query = {}) =>
  queryOptions({
    queryKey: ["authors", query],
    queryFn: () => authorQuery(query),
    retry: 1,
  });
export default useAuthors;
