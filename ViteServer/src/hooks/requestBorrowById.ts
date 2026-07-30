import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { mutationOptions } from "@tanstack/react-query";
import {
  BorrowResponseSchema,
  type BorrowResponse,
  type RequestBorrow,
} from "@/validators/borrow";

const borrowRequestOption = mutationOptions({
  mutationKey: ["borrow"],
  mutationFn: async (payload: RequestBorrow, { client }) => {
    const responnse: AxiosResponse<BorrowResponse> =
      await base.post<BorrowResponse>("/borrows", payload, {
        schema: BorrowResponseSchema,
      });
    client.invalidateQueries({ queryKey: ["borrows"] });
    return responnse.data;
  },
});
export default borrowRequestOption;
