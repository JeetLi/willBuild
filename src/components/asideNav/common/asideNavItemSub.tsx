import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../models/constant";

interface SubCategory {
  id: number;
  name: string;
  subCategories?: SubCategory[];
}

interface AsideNavItemSubProps {
  subCategory: SubCategory;
}

const AsideNavItemSub: React.FC<AsideNavItemSubProps> = ({ subCategory }) => {
  const [active, setActive] = useState(false);

  const activeToggle = () => setActive(!active);

  return (
    <li
      onClick={activeToggle}
      className={
        active && subCategory.subCategories ? "active" : "header_menu_item_sub"
      }
    >
      <Link to={`${ROUTES.catalog}/${subCategory.id}`}>{subCategory.name}</Link>
      {subCategory.subCategories && active && (
        <ul>
          {subCategory.subCategories.map((subSubCategory) => (
            <li key={subSubCategory.id} className="header_menu_item_sub">
              <Link to={`${ROUTES.catalog}/${subSubCategory.id}`}>
                {subSubCategory.name}
              </Link>
              {subSubCategory.subCategories && (
                <div className="wrap_menu">
                  {subSubCategory.subCategories.map((subSubSubCategory) => (
                    <div key={subSubSubCategory.id} className="wrap_menu_sub">
                      <Link to={`${ROUTES.catalog}/${subSubSubCategory.id}`}>
                        <div className="wrap_menu_sub_title">
                          <span>{subSubSubCategory.name}</span>
                        </div>
                      </Link>
                      {subSubSubCategory.subCategories && (
                        <ul>
                          {subSubSubCategory.subCategories.map(
                            (subSubSubSubCategory) => (
                              <li key={subSubSubSubCategory.id}>
                                <Link
                                  to={`${ROUTES.catalog}/${subSubSubSubCategory.id}`}
                                >
                                  {subSubSubSubCategory.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default AsideNavItemSub;
