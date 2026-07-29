import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import {
  BorrowPaginatedSchema,
  type BorrowPaginated,
} from "@/validators/borrow";

const borrowQuery = async () => {
  const response: AxiosResponse<BorrowPaginated> =
    await base.get<BorrowPaginated>("/borrows", {
      schema: BorrowPaginatedSchema,
    });
  return response.data;
};

const borrowQueryOptions = () =>
  queryOptions({
    queryKey: ["borrows"],
    queryFn: async () => await borrowQuery(),
    retry: 1,
  });
export default borrowQueryOptions;
