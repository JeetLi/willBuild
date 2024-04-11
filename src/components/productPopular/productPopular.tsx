import React from "react";
import { useGetPopularProductsQuery } from "../../redux/service/api";
import { ProductButtonsDefault } from "../ProductButtonsDefault/index";
const ProductCard = React.lazy(() => import("../productCard/index"));

export const PopularProducts: React.FC = () => {
  const {
    data: popularProducts,
    isLoading,
    isError,
    error,
  } = useGetPopularProductsQuery({ CategoryId: 1, Page: 1, Items: 5 });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error(error);
    return <div>Error fetching popular products</div>;
  }
  return (
    <div className="popular_product">
      <div className="container">
        <div className="title_products row">
          <h2>
            Популярная продукция <b>Grand Line</b>
          </h2>
          <div className="title_products_all_wrap">
            <a href="/catalog/new" className="title_products_all">
              все новинки
            </a>
          </div>
        </div>
        <div
          style={{
            gap: "1.2vw",
            justifyContent: "center",
            flexDirection: "row",
          }}
          className="products_list row"
        >
          {popularProducts?.items?.map((popularItem) => (
            <React.Suspense
              fallback={<div>Loading...</div>}
              key={popularItem.id}
            >
              <ProductCard product={popularItem}>
                <ProductButtonsDefault product={popularItem} />
              </ProductCard>
            </React.Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};
