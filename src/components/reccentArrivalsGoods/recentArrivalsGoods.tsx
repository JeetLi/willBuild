import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";

import { ROUTES } from "../../models/constant";

import { lastReceipts } from "../../utils/lastReceipts";

const LastReceiptsSlider: React.FC = () => {
  return (
    <div className="mainbanner_products_list">
      <div className="title_top row">
        <h2>
          последние <b>поступления</b>
        </h2>
        <Link to={`${ROUTES.catalog}/all`}>все товары</Link>
      </div>
      <div className="mainbanner_products_list_wrap">
        <Swiper
          className="swiper js_lastproduct_slider"
          direction="vertical"
          loop
          slidesPerView="auto"
          grabCursor
          autoHeight
          spaceBetween={0}
          centeredSlides={false}
          speed={1000}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {lastReceipts.map((receipt) => (
            <SwiperSlide key={receipt.id}>
              <div className="mainbanner_products_list_item">
                <Link to={`${ROUTES.product}/${receipt.link}`} className="name">
                  {receipt.name}
                </Link>
                <div className="desc">{receipt.description}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default LastReceiptsSlider;
