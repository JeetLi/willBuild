import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../models/constant";
import { categoryIcons } from "../../utils/category-icons";
import { useGetCategoryTreeQuery } from "../../redux/service/api";
import { useAppDispatch } from "../../hooks/typed-react-redux-hooks";
import { setCategories } from "../../redux/slice/categoriesSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderMenu: React.FC = () => {
  const { data: categories, isLoading } = useGetCategoryTreeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories));
    }
  }, [categories, dispatch]);

  const renderSkeletons = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <li key={index} className="header_menu_item">
        <div className="header_menu_item_wrap">
          <SkeletonTheme
            baseColor="#f3f3f3"
            highlightColor="#ecebeb"
            duration={0.9}
            direction="ltr"
            enableAnimation
          >
            <Skeleton width={200} height={30} />
          </SkeletonTheme>
        </div>
      </li>
    ));
  };

  return (
    <div className="header_menu header_menu_index">
      <Link to={ROUTES.main} className="logo"></Link>
      <ul className="header_menu_nav">
        {isLoading
          ? renderSkeletons()
          : categories?.map((category, index) => (
              <li key={category.id} className="header_menu_item">
                <div className="header_menu_item_wrap">
                  <Link to={`${ROUTES.catalog}/${category.id}`}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: categoryIcons[index],
                      }}
                    ></span>
                    <span>{category.name}</span>
                  </Link>
                  <div className="wrap_menu">
                    <div className="wrap_menu_sub">
                      <Link to={`${ROUTES.catalog}/new`}>
                        <div className="wrap_menu_sub_title">
                          <span>{category.name}</span>
                        </div>
                      </Link>
                      {category.subCategories &&
                        category.subCategories.length > 0 && (
                          <ul>
                            {category.subCategories.map((subCategory) => (
                              <li key={subCategory.id}>
                                <Link
                                  to={`${ROUTES.catalog}/${subCategory.id}`}
                                >
                                  {subCategory.name}
                                </Link>
                                {subCategory.subCategories && (
                                  <div className="wrap_menu_sub2">
                                    <div className="wrap_menu_title">
                                      <span>{subCategory.name}</span>
                                    </div>
                                    <ul>
                                      {subCategory.subCategories.map(
                                        (subSubCategory) => (
                                          <li key={subSubCategory.id}>
                                            <Link
                                              to={`${ROUTES.catalog}/${subSubCategory.id}`}
                                            >
                                              {subSubCategory.name}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default HeaderMenu;
                 