import { QueryParams } from "../models/interface";

export const getQuery = (query: QueryParams): string => {
  const stringifiedQuery = {
    Items: query.Items.toString(),
    CategoryId: query.CategoryId.toString(),
    Page: query.Page.toString(),
  };

  return "?" + new URLSearchParams(stringifiedQuery).toString();
};
