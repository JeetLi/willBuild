export type Comparison = {
  product: ProductType;
};
export type Favorite = {
  id: number;
};
export type ProductType = {
  id: number;
  categoryId: number;
  article: string;
  name: string;
  unit: string;
  availability: boolean;
  brand: string;
  manufacturerArticle: string;
  weight: number;
  priceLess100000: number;
  priceMore100000: number;
  priceMore500000: number;
  updatedAt: string;
  countCart: number;
  imageUrl: string;
  description?: string;
  count?: number;
  characteristics: {
    key: string;
  };
};

export type ProductTypeWithCount = ProductType & {
  count: number;
};

export type ProductCart = {
  items: ProductTypeWithCount[];
};

export type ProductCardProps = {
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
};

export type ProductPopularResponse = {
  totalCountItems: number;
  items: ProductType[];
};

export interface CartItem {
  count: number;
  product: ProductTypeWithCount;
}

export type ProductNewResponse = ProductPopularResponse & {};
export type ProductTopResponse = ProductPopularResponse & {};

export type PopularProducts = {
  popularStore: {
    popular: {
      items: ProductType[];
    };
  };
};

export type CategoryTypes = {
  id: number;
  name: string;
  subCategories?: CategoryTypes[];
};
export type CategoryState = {
  categories: CategoryTypes[];
};
