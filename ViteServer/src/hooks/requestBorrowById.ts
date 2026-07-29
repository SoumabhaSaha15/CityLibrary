import base from "@/util/axios-base";
import { mutationOptions } from "@tanstack/react-query";
import type { RequestBorrow } from "@/validators/borrow";

const borrowRequestOption = mutationOptions({
  mutationKey: ["borrow"],
  mutationFn: async (payload: RequestBorrow, { client }) => {
    const responnse = await base.post("/borrows", payload);
    client.invalidateQueries({ queryKey: ["borrows"] });
    console.log(responnse.data);
    return responnse.data;
  },
});
export default borrowRequestOption;
