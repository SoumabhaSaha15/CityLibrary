import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import {
  type PartialAuthorPaginated,
  PartialAuthorPaginatedSchema,
  type AuthorQuery,
} from "@/validators/author";

const authorQuery = async (query: AuthorQuery) => {
  const response: AxiosResponse<PartialAuthorPaginated> =
    await base.get<PartialAuthorPaginated>("/authors", {
      params: query,
      schema: PartialAuthorPaginatedSchema,
    });
  return response.data;
};
const authorQueryOptions = (query: AuthorQuery) =>
  queryOptions({
    queryKey: ["authors", JSON.stringify(query)],
    queryFn: async () => await authorQuery(query),
    retry: 1,
  });
export default authorQueryOptions;
