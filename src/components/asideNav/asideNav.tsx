import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../models/constant";
// import { BACKEND_URL_API_PRICELIST } from "@/app/stores/helper";
import AsideNavItem from "./common/asideNavItem";
import { CategoryType, useGetCategoryTreeQuery } from "../../redux/service/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Category {
  id: number;
  name: string;
}

const AsideNav: React.FC = () => {
  const { data: categories, isLoading } = useGetCategoryTreeQuery();

  const PreloadedCategoriesArr: CategoryType[]  = [
    {
      id: 1,
      name: "СТРОЙМАТЕРИАЛЫ",
    },
    {
      id: 230,
      name: "ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ",
    },
    {
      id: 785,
      name: "ИНСТРУМЕНТЫ",
    },
    {
      id: 1158,
      name: "КРЕПЕЖНЫЕ СИСТЕМЫ",
    },
    {
      id: 1652,
      name: "САНТЕХНИЧЕСКАЯ ГРУППА",
    },
    {
      id: 1813,
      name: "ОТОПЛЕНИЕ",
    },
    {
      id: 1857,
      name: "ЭЛЕКТРИКА И ВЕНТИЛЯЦИЯ",
    },
    {
      id: 2079,
      name: "ТОВАРЫ ДЛЯ ДОМА И САДА",
    },
  ];


  return (
    <div className="header_menu_wrap">
      <div className="header_menu">
        <Link to={ROUTES.main} className="logo"></Link>
        <ul className="header_menu_nav">
          {isLoading
            ? PreloadedCategoriesArr.map((category, index) => (
                <AsideNavItem
                  key={category.id}
                  index={index}
                  category={category}
                />
              ))
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
