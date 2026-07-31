import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
// import Bo
import { queryOptions } from "@tanstack/react-query";
import {
  BorrowPaginatedSchema,
  type BorrowPaginated,
  type BorrowQuery,
} from "@/validators/borrow";

const borrowQuery = async (query: BorrowQuery) => {
  const response: AxiosResponse<BorrowPaginated> =
    await base.get<BorrowPaginated>("/borrows", {
      schema: BorrowPaginatedSchema,
      params: query,
    });
  return response.data;
};

const borrowQueryOptions = (query: BorrowQuery) =>
  queryOptions({
    queryKey: ["borrows"],
    queryFn: async () => await borrowQuery(query),
    retry: 1,
  });
export default borrowQueryOptions;
