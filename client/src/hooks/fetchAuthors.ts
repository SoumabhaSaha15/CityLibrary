import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import {
  type AuthorPaginated,
  AuthorPaginatedSchema,
  type AuthorQuery,
} from "@/validators/author";

const authorQuery = async (query: AuthorQuery = { page: 1 }) => {
  const response: AxiosResponse<AuthorPaginated> =
    await base.get<AuthorPaginated>("/authors", {
      params: query,
      schema: AuthorPaginatedSchema,
    });
  return response.data;
};
const authorQueryoptions = (query: AuthorQuery) =>
  queryOptions({
    queryKey: ["authors", JSON.stringify(query)],
    queryFn: () => authorQuery(query),
    retry: 1,
  });
export default authorQueryoptions;
