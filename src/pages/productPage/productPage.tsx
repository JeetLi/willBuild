import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutDefault from "../../layout/layoutDefault/layoutDefault";
import Bradscubs from "../../components/breadcubs/breadcubs";
import RecomemndCatalog from "../../components/productsRecomendation/index";
import AsideNav from "../../components/asideNav/asideNav";
import ProductComponent from "../../components/product/product";
import Partners from "../../components/partners/index";
import { ROUTES } from "../../models/constant";
import { useGetProductQuery } from "../../redux/service/api";
import { generateBradscubs } from "../../utils/generateBradscubs";
import { CategoryState, CategoryTypes } from "../../models/types";
import { findCategoryById } from "../../utils/category";
import { useAppSelector } from "../../hooks/typed-react-redux-hooks";
import FooterDefault from "../../layout/footerDefault/footerDefault";
import HeaderDefault from "../../layout/headerDefault/headerDefault";
const ProductPage: React.FC = () => {
  const [useID, setUseId] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const CategoryState = useAppSelector((state) => state.category);

  const { data: product } = useGetProductQuery(useID);

  useEffect(() => {
    if (id) {
      setUseId(id);
    }
  }, [id]);

  const currentCategory = (
    state: CategoryState,
    id: number
  ): CategoryTypes | undefined => {
    return findCategoryById(state.categories, id);
  };

  const currentCategoryObj = currentCategory(
    CategoryState,
    product?.categoryId || 0
  );
  const currentBradscubs = generateBradscubs(
    CategoryState,
    currentCategoryObj?.id || 0,
    product?.name
  );
  return (
    <div className="wrapper__inner">
      <div className="text_page fav catalog product_element">
        <div className=" d-flex flex-nowrap">
          <AsideNav />
          <div style={{ width: "100%" }}>
            <HeaderDefault />
            <div style={{ margin: "30px 50px 0 50px" }}>
              <Bradscubs bradscubs={currentBradscubs} />
              <div className="text_page_top">
                <h1>{product?.name}</h1>
                <div className="article">{product?.article}</div>
              </div>
              {product ? (
                <ProductComponent
                  product={product}
                  description={product?.description ?? "Загружаем описание...."}
                  imageUrl={product?.imageUrl ?? "default-image-url"}
                  priceLess100000={product?.priceLess100000 ?? 0}
                  id={0}
                  categoryId={0}
                  article={""}
                  name={""}
                  unit={""}
                  availability
                  brand={""}
                  manufacturerArticle={""}
                  weight={0}
                  priceMore100000={0}
                  priceMore500000={0}
                  updatedAt={""}
                  countCart={0}
                  characteristics={{ key: "" }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <RecomemndCatalog />
      <Partners />
      <FooterDefault />
    </div>
  );
};

export default ProductPage;
