import base from "@/util/axios-base";
import type { AxiosResponse } from "axios";
import { queryOptions } from "@tanstack/react-query";
import { AuthorSchema, type Author } from "@/validators/author";

const authorQueryById = async (id: number) => {
  const response: AxiosResponse<Author> = await base.get<Author>(
    `/authors/${id}`,
    {
      schema: AuthorSchema,
    },
  );
  return response.data;
};

const authorQueryOptionsById = (id: number) =>
  queryOptions({
    queryKey: ["authors", id.toString()],
    queryFn: async () => await authorQueryById(id),
    retry: 1,
  });
export default authorQueryOptionsById;
