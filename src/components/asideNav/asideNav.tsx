import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../models/constant";
// import { BACKEND_URL_API_PRICELIST } from "@/app/stores/helper";
import AsideNavItem from "./common/asideNavItem";
import { useGetCategoryTreeQuery } from "../../redux/service/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Category {
  id: number;
  name: string;
}

const AsideNav: React.FC = () => {
  const { data: categories, isLoading } = useGetCategoryTreeQuery();

  const renderSkeletons = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <li key={index} className="header_menu_item">
        <div className="header_menu_item_wrap">
          <SkeletonTheme
            baseColor="#f3f3f3"
            // highlightColor="#ecebeb"
            highlightColor="#000"
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
    <div className="header_menu_wrap">
      <div className="header_menu">
        <Link to={ROUTES.main} className="logo"></Link>
        <ul className="header_menu_nav">
          {isLoading
            ? renderSkeletons()
            : categories?.map((category, index) => (
                <AsideNavItem
                  key={category.id}
                  index={index}
                  category={category}
                />
              ))}

          <li className="header_menu_item">
            <div className="header_menu_item_wrap">
              <a download>
                <span>скачать прай-лист</span>
              </a>
            </div>
          </li>
        </ul>
        <div className="promobanner">
          <Link to="/catalog/new">
            <img src="/images/banner_to_catalog.png" alt="Promo Banner" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AsideNav;
