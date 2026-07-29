// import z from "zod";
import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import { BorrowSchema, type Borrow } from "@/validators/borrow";
const borrowQueryById = async (id: string) => {
  const response: AxiosResponse<Borrow> = await base.get<Borrow>(
    `/borrows/${id}`,
    {
      schema: BorrowSchema,
    },
  );
  return response.data;
};

const borrowQueryByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ["borrows", id],
    queryFn: async () => await borrowQueryById(id),
    retry: 1,
  });
export default borrowQueryByIdOptions;
