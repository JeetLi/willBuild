// CatalogPage.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AsideNav from "../../components/asideNav/asideNav"; // Adjust the import path as needed
import Bradscubs from "../../components/breadcubs/breadcubs"; // Adjust the import path as needed
import ProductsCatalog from "../../components/productCatalog/productCatalog"; // Adjust the import path as needed
import HeaderDefault from "../../layout/headerDefault/headerDefault";
import Partners from "../../components/partners/index"; // Adjust the import path as needed
import LayoutDefault from "../../layout/layoutDefault/layoutDefault"; // Adjust the import path as needed
import { ROUTES } from "../../models/constant"; // Adjust the import path as needed
import { findCategoryById, findCategoryIdWithPath } from "../../utils/category";
import { useAppSelector } from "../../hooks/typed-react-redux-hooks";
import { CategoryState, CategoryTypes } from "../../models/types";
import FooterDefault from "../../layout/footerDefault/footerDefault";
import { generateBradscubs } from "../../utils/generateBradscubs";
type CategoryWithPath = {
  id: number;
  name: string;
  link: string;
  active?: boolean;
};

const CatalogPage: React.FC = () => {
  const [useID, setUseId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);

  const { id } = useParams<{ id: string }>();

  const CategoryState = useAppSelector((state) => state.category);

  useEffect(() => {
    if (id) {
      setUseId(id);
      setCategoryId(parseInt(id));
    }
  }, [id]);

  const currentCategory = (
    state: CategoryState,
    id: number
  ): CategoryTypes | undefined => {
    return findCategoryById(state.categories, id);
  };

  const currentBradscubs = generateBradscubs(CategoryState, categoryId);

  return (
    <div className="wrapper__inner">
      <div className="text_page fav catalog">
        <div className=" d-flex flex-nowrap">
          <AsideNav />
          <div style={{ width: "100%" }}>
            <HeaderDefault />
            <div style={{ margin: "30px 50px 0 50px" }}>
              <div className="text_page_top">
                <h1>{currentCategory(CategoryState, categoryId)?.name}</h1>
                <Bradscubs bradscubs={currentBradscubs} />
              </div>
              {currentCategory(CategoryState, categoryId)?.subCategories && (
                <div className="subsection row">
                  {currentCategory(
                    CategoryState,
                    categoryId
                  )?.subCategories?.map((category) => (
                    <Link
                      key={category.id}
                      to={`${ROUTES.catalog}/${category.id}`}
                      className="subsection_item"
                    >
                      {category.name}
                    </Link>
                  )) || <div>No subcategories available</div>}
                </div>
              )}
              <ProductsCatalog catalogId={categoryId} />
            </div>
          </div>
        </div>
      </div>
      <Partners />
      <FooterDefault />
    </div>
  );
};

export default CatalogPage;
