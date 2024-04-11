import { QueryParams } from "./../../models/interface";
import {
  ProductPopularResponse,
  ProductNewResponse,
  ProductTopResponse,
  ProductType,
} from "./../../models/types";
import { URL, Category, Product, Order } from "./../../models/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ResponseSearchType {
  totalCountItems: number;
  items: [
    {
      id: number;
      categoryId: number;
      article: string;
      name: string;
      unit: string;
      availability: false;
      brand: string;
      manufacturerArticle: string;
      weight: number;
      priceLess100000: number;
      priceMore100000: number;
      priceMore500000: number;
      updatedAt: string;
      imageUrl: string;
    }
  ];
}

export interface OrderSubmitRequest {
  name: string;
  phoneNumber: string;
  email?: string;
  description?: string;
  consent: boolean;
  items?: {
    id: number;
    count: number | undefined;
  }[];
}
export type CategoryType = {
  id: number;
  name: string;
  subCategories?: CategoryType[];
};

interface OrderSubmitResponse {}
interface ProductQueryParams {
  SearchName?: string;
  CategoryId?: number;
  Page?: number;
  Items?: number;
}
interface test {
  SearchName: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL.BASE_URL,
  }),
  endpoints: (builder) => ({
    getCategoryTree: builder.query<CategoryType[], void>({
      query: () => Category.TREE,
    }),
    submitOrder: builder.mutation<OrderSubmitResponse, OrderSubmitRequest>({
      query: (order) => ({
        url: Order.SUBMIT,
        method: "POST",
        body: order,
      }),
    }),
    getProduct: builder.query<ProductType, string>({
      query: (id) => `${Product.GET}?id=${id}`,
    }),
    getProductWithPaging: builder.query<ProductNewResponse, string>({
      query: (params) => Product.GET_WITH_PAGING + params,
    }),
    getNewProducts: builder.query<ProductNewResponse, ProductQueryParams>({
      query: (params) => ({
        url: Product.NEW,
        params,
      }),
    }),
    getTopProducts: builder.query<ProductTopResponse, ProductQueryParams>({
      query: (params) => ({
        url: Product.TOP,
        params,
      }),
    }),
    getPopularProducts: builder.query<
      ProductPopularResponse,
      ProductQueryParams
    >({
      query: (params) => ({
        url: Product.POPULAR,
        params,
      }),
    }),
  }),
});

export const {
  useGetCategoryTreeQuery,
  useSubmitOrderMutation,
  useGetProductQuery,
  useGetProductWithPagingQuery,
  useGetNewProductsQuery,
  useGetTopProductsQuery,
  useGetPopularProductsQuery,
} = api;
