import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./burgerMenu.css"; // Make sure to create this CSS file
import { ROUTES } from "../../models/constant";

type BurgerMenuType = {
  isOpen: boolean;
};

const BurgerMenu: React.FC<BurgerMenuType> = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="burger-menu-container">
          <div className="burger-menu">
            <Link to={ROUTES.main}>Главная</Link>
            <Link to={ROUTES.catalog + "/1"}>Каталог</Link>
            <Link to={ROUTES.delivery}>Доставка</Link>
            <Link to={ROUTES.contacts}>Контакты</Link>
          </div>
          <div className="burger-overlay"></div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
