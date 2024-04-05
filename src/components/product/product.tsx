import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";
import { ProductType } from "../../models/types";
import { useAppDispatch } from "../../hooks/typed-react-redux-hooks";
import { addItem, updateItemCount } from "../../redux/slice/cartSlice";

const ProductComponent: React.FC<{
  product: ProductType;
  description: string;
  imageUrl: string;
  priceLess100000: number;
  id: number;
  categoryId: number;
  article: string;
  name: string;
  unit: string;
  availability: boolean;
  brand: string;
  manufacturerArticle: string;
  weight: number;
  priceMore100000: number;
  priceMore500000: number;
  updatedAt: string;
  countCart: number;
  characteristics: { key: string };
}> = ({ product, description, imageUrl, priceLess100000 }) => {
  const dispatch = useAppDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [switcher, setSwitcher] = useState(0);

  const [countCart, setCountCart] = useState<number>(1);

  const countCartIncrement = (aa: number) => {
    setCountCart((prevCount) => prevCount + 1);

    if (window.location.pathname === "/compare") {
      const shop = JSON.parse(
        localStorage.getItem("comparisons") || "[]"
      ) as any[];

      for (let i = 0; i < shop.length; i++) {
        if (shop[i].data.id === aa) {
          shop[i].data.countCart++;
        }
      }

      localStorage.setItem("comparisons", JSON.stringify(shop));
    }
  };

  const countCartDecrement = (aa: number) => {
    setCountCart((prevCount) => prevCount - 1);

    if (window.location.pathname === "/compare") {
      const shop = JSON.parse(
        localStorage.getItem("comparisons") || "[]"
      ) as any[];
    }
  };

  const handleUpdateItemCount = (newCount: number) => {
    dispatch(updateItemCount({ productId: product.id, newCount }));
  };

  // useEffect(() => {
  //   if (countCart < 1) {
  //     setCountCart(1);
  //   }
  // }, [countCart]);

  const handleAddItem = () => {
    const itemToAdd = {
      item: { ...product, count: countCart },
      count: countCart,
    };
    dispatch(addItem(itemToAdd));
  };
  return (
    <>
      <div className="cartelement_top row">
        <div className="product_photo col-6 col-sm-12">
          <Swiper
            // width="70%"
            className="product_photo_slider_full"
            // style={{
            //   "--swiper-navigation-color": "#fff",
            //   "--swiper-pagination-color": "#fff",
            // }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            <SwiperSlide
              v-for="image in [imageUrl]"
              key="image"
              className="product_photo_slider_item swiper-slide"
            >
              <div
                className="product_photo_slider_item_photo"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
              {/* <div className="icons">
                <div className="faw">
                  <svg
                    width="26"
                    height="23"
                    viewBox="0 0 26 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.8549 1.56596C21.6581 0.559283 20.1211 0.00605331 18.5279 0.00605331C16.6878 0.00605331 14.9065 0.749976 13.6415 2.04934C13.4142 2.28327 13.201 2.53439 13.0009 2.80712C11.4519 0.711171 8.86363 -0.364244 6.30375 0.111378C4.1795 0.503295 2.50944 1.69013 1.34318 3.63642C-0.30234 6.38427 -0.437013 9.03456 0.945162 11.5141C1.68396 12.8406 2.64248 14.1334 3.87581 15.466C6.13472 17.9073 8.80856 20.2244 12.291 22.7555C12.5134 22.918 12.7517 23 13.0003 23C13.3831 23 13.6415 22.8032 13.7697 22.7068C16.9119 20.4257 19.3801 18.323 21.5382 16.0863C22.7432 14.8379 24.1106 13.3035 25.1106 11.3872C25.5391 10.5684 26.0277 9.46639 25.9988 8.20749C25.9344 5.49844 24.8772 3.2639 22.8549 1.56596ZM23.4738 10.5036C22.5834 12.2076 21.3272 13.6139 20.2149 14.7659C18.2193 16.8347 15.9375 18.7926 12.9971 20.9512C9.79708 18.5974 7.32007 16.4361 5.22636 14.1722C4.09608 12.951 3.22316 11.7774 2.55743 10.5828C1.50348 8.69253 1.62071 6.79559 2.9271 4.61593C3.80602 3.14804 5.05352 2.25556 6.63579 1.96342C6.93894 1.90688 7.24591 1.87916 7.54852 1.87916C9.42413 1.87916 11.0855 2.9324 12.0238 4.76117L12.183 5.06661C12.3466 5.3787 12.6836 5.55609 13.0162 5.5644C13.3646 5.55775 13.6792 5.35542 13.8324 5.03723C14.1617 4.35428 14.521 3.82433 14.9594 3.3731C15.8786 2.43017 17.179 1.88859 18.5279 1.88859C19.6909 1.88859 20.8081 2.28937 21.6745 3.01777C23.2862 4.37091 24.0943 6.08382 24.1461 8.25017C24.1641 9.06782 23.8167 9.84722 23.4738 10.5036Z"
                      fill="#C1C1C1"
                    />
                  </svg>
                  <span>В избранное</span>
                </div>
                <div className="compare">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.22136 23.6204H22.3284M12.2748 23.6204V6.02676M12.2748 6.02676C13.663 6.02676 14.7882 4.90149 14.7882 3.51338M12.2748 6.02676C10.8868 6.02676 9.7615 4.90149 9.7615 3.51338M14.7882 3.51338C14.7882 2.12528 13.663 1 12.2748 1C10.8868 1 9.7615 2.12528 9.7615 3.51338M14.7882 3.51338H22.3284M9.7615 3.51338H2.22136M4.73474 18.5937C6.63553 18.5937 8.20778 17.536 8.46725 15.7678C8.48369 15.6557 8.49192 15.5996 8.48548 15.4753C8.48103 15.3895 8.45195 15.2328 8.42534 15.151C8.38678 15.0327 8.34005 14.9496 8.24659 14.7834L4.73474 8.54015L1.22288 14.7834C1.13623 14.9375 1.09291 15.0145 1.05283 15.1483C1.02818 15.2306 0.999639 15.4282 1 15.514C1.00058 15.6538 1.00903 15.6906 1.02594 15.7644C1.34635 17.161 2.88498 18.5937 4.73474 18.5937ZM19.815 18.5937C21.7159 18.5937 23.2881 17.536 23.5475 15.7678C23.5639 15.6557 23.5722 15.5996 23.5657 15.4753C23.5613 15.3895 23.5323 15.2328 23.5056 15.151C23.4671 15.0327 23.4203 14.9496 23.3268 14.7834L19.815 8.54015L16.3032 14.7834C16.2166 14.9375 16.1732 15.0145 16.1331 15.1483C16.1085 15.2306 16.08 15.4282 16.0802 15.514C16.0809 15.6538 16.0893 15.6906 16.1062 15.7644C16.4267 17.161 17.9653 18.5937 19.815 18.5937Z"
                      stroke="#C1C1C1"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>В сравнение</span>
                </div>
              </div> */}
            </SwiperSlide>
          </Swiper>
          <Swiper
            className="product_photo_slider_smile_preview"
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            <SwiperSlide
              key={imageUrl}
              className="product_photo_slider_smile_preview_item swiper-slide"
            ></SwiperSlide>
          </Swiper>
        </div>
        <div className="product_content_inf col-6 col-sm-12">
          <div className="status">
            <template v-if="availability">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00033 16.6667C4.39783 16.6667 0.666992 12.9358 0.666992 8.33333C0.666992 3.73083 4.39783 0 9.00033 0C13.6028 0 17.3337 3.73083 17.3337 8.33333C17.3337 12.9358 13.6028 16.6667 9.00033 16.6667ZM9.00033 15C10.7684 15 12.4641 14.2976 13.7144 13.0474C14.9646 11.7971 15.667 10.1014 15.667 8.33333C15.667 6.56522 14.9646 4.86953 13.7144 3.61929C12.4641 2.36905 10.7684 1.66667 9.00033 1.66667C7.23222 1.66667 5.53652 2.36905 4.28628 3.61929C3.03604 4.86953 2.33366 6.56522 2.33366 8.33333C2.33366 10.1014 3.03604 11.7971 4.28628 13.0474C5.53652 14.2976 7.23222 15 9.00033 15ZM8.16949 11.6667L4.63366 8.13083L5.81199 6.9525L8.16949 9.31L12.8828 4.59583L14.062 5.77417L8.16949 11.6667Z"
                  fill="#09B01A"
                />
              </svg>
              В наличии
            </template>
          </div>
          <div className="description">{description}</div>
          <div className="sub_description">
            <b>Комплектация</b>
            <p>
              Сварочный полуавтомат – 1 шт.; Горелка 3 м – 1 шт.; Кабель
              заземления, медь 3 м – 1шт.; Кабель с электрододержателем, медь
              1,6 м – 1 шт.; Газовый шланг 3 м – 1 шт.; Ролик 0,6-0,8 мм – 1 шт.
            </p>
          </div>
          <div className="product_content_inf_b">
            <div
              className="btns"
              style={{ display: "flex", flexDirection: "row-reverse" }}
            >
              <button className="btn" onClick={() => handleAddItem()}>
                заказать
              </button>
              <div className="count">
                <input
                  type="button"
                  value="-"
                  onClick={() => countCartDecrement(1)}
                />
                <input
                  type="number"
                  step={1}
                  min={1}
                  max={9999}
                  id="num_count"
                  name="quantity"
                  maxLength={5}
                  value={product.count ? product.count : countCart}
                  title="Qty"
                  onChange={(e) => {
                    const newCountRaw = e.target.value;
                    if (newCountRaw.length <= 5) {
                      const newCount = parseInt(newCountRaw, 10);
                      if (
                        !isNaN(newCount) &&
                        newCount >= 1 &&
                        newCount <= 9999
                      ) {
                        setCountCart(newCount);
                        dispatch(
                          updateItemCount({ productId: product.id, newCount })
                        );
                      }
                    } else {
                      const trimmedValue = newCountRaw.slice(0, 5);
                      e.target.value = trimmedValue;
                      const newCount = parseInt(trimmedValue, 10);
                      setCountCart(newCount);
                      dispatch(
                        updateItemCount({ productId: product.id, newCount })
                      );
                    }
                  }}
                />
                <input
                  type="button"
                  value="+"
                  onClick={() => countCartIncrement(product.id)}
                />
              </div>
            </div>
            <div className="prices">
              <div className="price_desc">Цена за {product.unit}</div>
              <div className="price">{priceLess100000?.toLocaleString()} ₽</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cartelement_tabs">
        <div className="cartelement_tab">
          <div
            className={`cartelement_tab_item ${switcher === 1 ? "active" : ""}`}
            onClick={() => setSwitcher(1)}
          >
            технические характеристики
          </div>
          <div
            className={`cartelement_tab_item ${switcher === 2 ? "active" : ""}`}
            onClick={() => setSwitcher(2)}
          >
            подробная информация
          </div>
          <div
            className={`cartelement_tab_item ${switcher === 3 ? "active" : ""}`}
            onClick={() => setSwitcher(3)}
          >
            инструкции
          </div>
          <div
            className={`cartelement_tab_item ${switcher === 4 ? "active" : ""}`}
            onClick={() => setSwitcher(4)}
          >
            сертификаты
          </div>
        </div>
        <div className="cartelement_tab_content">
          <div
            className={`cartelement_tab_content_item ${
              switcher === 1 ? "active" : ""
            }`}
          >
            {/* {characteristics.length > 1 && (
              <table>
                {characteristics.map(
                  (item, index) =>
                    index % 2 === 0 && (
                      <tr key={index}>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        {characteristics[index + 1] && (
                          <>
                            <td>{characteristics[index + 1][0]}</td>
                            <td>{characteristics[index + 1][1]}</td>
                          </>
                        )}
                      </tr>
                    )
                )}
              </table>
            )} */}

            <div className="for_tables">
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">Код</h3>
                  <h3>С-000283647</h3>
                </div>
              </div>
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">Бренд </h3>.<h3>FUBAG</h3>
                </div>
              </div>
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">Артикул производителя </h3>
                  <h3>014091</h3>
                </div>
              </div>
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">Вес, кг</h3>
                  <h3>0.009</h3>
                </div>
              </div>
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">Страна происхождения</h3>
                  <h3>КИТАЙ</h3>
                </div>
              </div>
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">
                    Напряжение холостого хода, В
                  </h3>
                  <h3>67</h3>
                </div>
              </div>
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">
                    Диапазон регулирования сварочного тока в режиме MMA, А
                  </h3>
                  <h3>10-200</h3>
                </div>
              </div>
              <div className="for_table">
                <div className="for_table_1">
                  <h3 className="size_for_media">
                    Диапазон регулирования сварочного тока в режиме MMA, А
                  </h3>
                  <h3>10-200</h3>
                </div>
              </div>
            </div>
          </div>
          <p v-html="sanitizeHtml(info)"></p>
          <h2>Комплектация</h2>
          <p>
            Сварочный полуавтомат – 1 шт.; Горелка 3 м – 1 шт.; Кабель
            заземления, медь 3 м – 1шт.; Кабель с электрододержателем, медь 1,6
            м – 1 шт.; Газовый шланг 3 м – 1 шт.; Ролик 0,6-0,8 мм – 1 шт.
          </p>
          <p v-html="sanitizeHtml(equipment)"></p>
          <h2>Функции</h2>
          <p>
            Регулировка Hot Start (горячий старт). Увеличение сварочного
            (импульсного) тока в начальный момент для улучшения поджига дуги.
            Регулируется в пределах от 0 до 90%. Arc Force (стабильность горения
            дуги). Кратковременное увеличение силы тока в момент залипания
            электрода. Помогает капле оторваться от стержня электрода, делая тем
            самым процесс переноса капель через дуговой промежуток четким и
            равномерным. Anti Sticking (антиприлипание). Снижение сварочного
            тока для отделения залипшего электрода на изделии без повреждения
            обмазки. TIG Lift. Ручная сварка неплавящимся вольфрамовым
            электродом в среде защитного газа - аргона. Преимущественно
            используется для сварки цветных металлов и нержавеющих сталей
          </p>
          <p v-html="sanitizeHtml(functions)"></p>
        </div>
        <div
          className={`cartelement_tab_content_item ${
            switcher === 2 ? "active" : ""
          }`}
        >
          {/* {detailed_information} */}
        </div>
        <div
          className={`cartelement_tab_content_item ${
            switcher === 3 ? "active" : ""
          }`}
        >
          {/* {instructions} */}
        </div>
        <div
          className={`cartelement_tab_content_item ${
            switcher === 4 ? "active" : ""
          }`}
        >
          {/* { certificates } */}
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
