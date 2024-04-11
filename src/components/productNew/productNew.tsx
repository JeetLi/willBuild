import React from "react";
import { Link } from "react-router-dom";
import { ProductButtonsDefault } from "../ProductButtonsDefault/index";
import { ROUTES } from "../../models/constant";
import {
  useGetCategoryTreeQuery,
  useGetNewProductsQuery,
} from "../../redux/service/api";


const ProductCard = React.lazy(() => import("../productCard/index"));

export const ProductNew: React.FC = () => {
  const { data: categories, ...queryInfo } = useGetCategoryTreeQuery();

  const {
    data: newProducts,
    isLoading,
    isError,
    error,
    data,
  } = useGetNewProductsQuery({ CategoryId: 1, Page: 1, Items: 4 });

  if (isError) return <div>Error fetching new products</div>;

  return (
    <div className="new_product">
      <div className="new_product_top_while">
        <div className="container">
          <div className="title_products row">
            <h2>
              <b>НОВИНКИ</b>
            </h2>
            <div className="title_products_all_wrap">
              <Link to="/catalog/new" className="title_products_all">
                все новинки
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          style={{
            gap: "1.2vw",
            justifyContent: "center",
            flexDirection: "row",
          }}
          className="products_list row"
        >
          {newProducts?.items?.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product}>
              <ProductButtonsDefault product={product} />
            </ProductCard>
          ))}
          {newProducts?.items?.slice(3).map((product) => (
            <ProductCard key={product.id} product={product}>
              <ProductButtonsDefault product={product} />
            </ProductCard>
          ))}
          <Link to={`${ROUTES.catalog}/new`} className="banner_to_catalog" />
        </div>
      </div>
    </div>
  );
};
