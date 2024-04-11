import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../models/constant";
import {
  categoryIcons,
  categoryIconsWhites,
} from "../../../utils/category-icons";
import AsideNavItemSub from "./asideNavItemSub";

interface Category {
  id: number;
  name: string;
  subCategories?: Category[];
}

interface AsideNavItemProps {
  category: Category;
  index: number;
}

const AsideNavItem: React.FC<AsideNavItemProps> = ({ category, index }) => {
  const [active, setActive] = useState(false);

  const activeToggle = () => setActive(!active);

  return (
    <li className={`header_menu_item ${active ? "active" : ""}`}>
      <div
        onClick={activeToggle}
        className={
          active
            ? "header_menu_item_wrap wrap_item_active"
            : "header_menu_item_wrap"
        }
      >
        <Link to={`${ROUTES.catalog}/${category.id}`}>
          {active ? (
            <span
              dangerouslySetInnerHTML={{
                __html: categoryIconsWhites[index],
              }}
            ></span>
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: categoryIcons[index],
              }}
            ></span>
          )}

          <span
            className={
              active
                ? "header_menu__span header_menu__span_active"
                : "header_menu__span"
            }
          >
            {category.name}
          </span>
        </Link>
        {active ? (
          <img className="main-cat_vector" src="./images/vectorUp.png" />
        ) : (
          <img className="main-cat_vector" src="./images/vectorDown.png" />
        )}
      </div>

      {category.subCategories && (
        <ul style={{ display: active ? "block" : "none" }}>
          {category.subCategories.map((subCategory) => (
            <AsideNavItemSub key={subCategory.id} subCategory={subCategory} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default AsideNavItem;
