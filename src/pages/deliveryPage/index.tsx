import React, { useState, useEffect } from "react";
import Bradscubs from "@/components/Bradscubs/Bradscubs"; 
import LayoutShort from "@/layout/LayoutShort/LayoutShort"; 
import DeliveryMap from "@/components/DeliveryMap/DeliveryMap"; 
import Advantages from "@/components/Advantages/Advantages"; 
import { ROUTES } from "@/app/router/helper";

const bradscubs = [
  {
    id: 1,
    link: ROUTES.main,
    name: "Главная страница",
  },
  {
    id: 2,
    name: "Доста",
    active: true,
  },
];

const DeliveryPage = () => {
  return (
    <LayoutShort>
      <div className="text_page delivery">
        <div className="container">
          <div className="text_page_top">
            <h1>Доставка</h1>
            <Bradscubs bradscubs={bradscubs} />
          </div>
          <div className="row">
            <div className="col-5 col-sm-12">
              <h2>Условия доставки</h2>
              <br />
              <ul>{/* Список условий доставки */}</ul>
            </div>
            <div className="col-7 col-sm-12">
              <DeliveryMap />
            </div>
          </div>
        </div>
      </div>
      <Advantages />
    </LayoutShort>
  );
};

export default DeliveryPage;
