import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductButtonsDefault } from "../ProductButtonsDefault/index";

import { ROUTES } from "../../models/constant";
import { ProductType } from "../../models/types";
import { useGetPopularProductsQuery } from "../../redux/service/api";

const ProductCard = React.lazy(() => import("../productCard/index"));
const tabs = [
  {
    id: 1,
    name: "Стройматериалы",
  },
  {
    id: 230,
    name: "Отделочные материалы",
  },
  {
    id: 785,
    name: "Инструменты",
  },
  {
    id: 1158,
    name: "Крепежные системы",
  },
  {
    id: 1652,
    name: "Сантехническая группа",
  },
  {
    id: 1813,
    name: "Отопление",
  },
  {
    id: 1857,
    name: "Электрика и вентиляция",
  },
];

export const RecomendProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  const {
    data: popularProducts,
    isLoading,
    isError,
  } = useGetPopularProductsQuery({ CategoryId: activeTab, Page: 1, Items: 5 });

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching popular products</div>;

  return (
    <div className="recomend_product recomend_product_main">
      <div className="container">
        <div className="recomend_title row">
          <h2>
            Вам может <b>понадобиться</b>
          </h2>
          <div className="recomend_product_tabs_panel row">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`recomend_product_tabs_item ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.name}
              </div>
            ))}
            <Link
              to={`${ROUTES.catalog}/all`}
              className="recomend_product_tabs_item"
            >
              весь каталог
            </Link>
          </div>
        </div>
        <div className="recomend_product_tabs_blocks">
          <div className="recomend_product_tabs_block active">
            <div
              style={{
                gap: "1.2vw",
                justifyContent: "center",
                flexDirection: "row",
              }}
              className="products_list row"
            >
              {popularProducts?.items?.map((productItem: ProductType) => (
                <ProductCard key={productItem.id} product={productItem}>
                  <ProductButtonsDefault product={productItem} />
                </ProductCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
