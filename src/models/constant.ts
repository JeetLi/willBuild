export enum URL {
  BASE_URL = "http://45.151.144.81:8001",
}

export enum Category {
  TREE = "/api/category/tree",
}

export enum Order {
  SUBMIT = "/api/order/submit",
}

export enum Product {
  GET = "/api/product/get",
  GET_WITH_PAGING = "/api/product/getwithpaging",
  NEW = "/api/product/new",
  TOP = "/api/product/top",
  POPULAR = "/api/product/popular",
  PRICE_LIST = "/api/product/pricelist",
}

export enum ROUTES {
  main = "/",
  catalog = "/catalog",
  category = "/category",
  cart = "/cart",
  compare = "/compare",
  contacts = "/contacts",
  delivery = "/delivery",
  favorite = "/favorite",
  product = "/product",
}

export const getQuery = (params: any) => {
  return "?" + new URLSearchParams(params)?.toString();
};
