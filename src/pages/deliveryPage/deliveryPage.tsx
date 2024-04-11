import React, { useState, useEffect } from "react";
import Bradscubs from "../../components/breadcubs/breadcubs";
import LayoutShort from "../../layout/layoutShort/layoutShort";
import DeliveryMap from "../../components/deliveryMap/deliveryMap";
import Advantages from "../../components/advantages/index";
import { ROUTES } from "../../models/constant";

const bradscubs = [
  {
    id: 1,
    link: ROUTES.main,
    name: "Главная страница",
  },
  {
    id: 2,
    name: "Доставка",
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
              <ul>
                <li>
                  В зону "Рублевка" доставки осуществляются транспортом 1,5 -3
                  тонн.
                </li>
                <li>
                  Существует ограничение по длине и объёму груза в каждой
                  тоннажности.
                </li>
                <li>
                  Клиент обязан организовать безопасный и беспрепятственный
                  подъезд к месту разгрузки.
                </li>
                <li>
                  Цена за 1 км cвыше 120 км от МКАД рассчитывается индивидуально
                  логистом.
                </li>
                <li>
                  Второе и последующие места выгрузки до 2 км:- для 0,5 – 1,5
                  тонн – 500 р.- для 3 – 13 тонн + 8,5 (манипуляторы) – 970 р.-
                  для 20 тонн – 1500 р.Свыше 2 км, как доставка согласно
                  тоннажности.
                </li>
                <li>
                  Отказ от доставки во время погрузки- оплачивается одним часом
                  простоя согласно тоннажности.
                </li>
                <li>
                  Отказ от доставки во время её исполнения- оплачивается как 1,5
                  доставки от тоннажности. Данный пункт не распространяется на
                  доставку тоннажностью 0,5 тонн.
                </li>
                <li>
                  Возврат материала- оплачивается как 0,5 от веса забираемого
                  груза, согласно тарифной сетке. Данный пункт не
                  распространяется на доставку тоннажностью 0,5 тонн.
                </li>
                <li>Данная сетка действительна для всего холдинга.</li>
                <li>
                  В случае формы оплаты наличными при получении и стоимости
                  доставки более 5 000 р., доставка оплачивается до
                  осуществления доставки.{" "}
                </li>
              </ul>
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
