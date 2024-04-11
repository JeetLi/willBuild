import React, { MouseEvent, useEffect, useState } from "react";
import Bradscubs from "../../components/breadcubs/breadcubs";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/typed-react-redux-hooks";
import { addItem, removeItem, clearCart } from "../../redux/slice/cartSlice";
import LayoutShort from "../../layout/headerShort/headerShort";
import { ROUTES } from "../../models/constant";
import { CartItem } from "../../models/types";
import ProductCart from "../../components/productCard/index";
import {
  OrderSubmitRequest,
  useGetProductQuery,
  useSubmitOrderMutation,
} from "../../redux/service/api";
import { ProductButtonsDefault } from "../../components/ProductButtonsDefault";
import { ProductType } from "../../models/types";

const bradscubs = [
  {
    id: 1,
    link: ROUTES.main,
    name: "Главная страница",
  },
  {
    id: 2,
    name: "корзина",
    active: true,
  },
];

const CartPage: React.FC = () => {
  const cart: ProductType[] = useAppSelector((state) => state.cartSlice.items);
  const dispatch = useAppDispatch();
  const [submitOrder] = useSubmitOrderMutation();
  const [activeModal, setActiveModal] = useState(false);
  const [useActiveFinalMoadal, setActiveFinalModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    description: "",
    consent: false,
    items: cart.map((item) => ({ id: item.id, count: item.count })),
  });
  const openModal = () => {
    if (cart.length > 0) {
      setActiveModal(true);
    }
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: cart.map((item) => ({ id: item.id, count: item.count })),
    }));
  }, [cart]);
  const closeModal = () => {
    setActiveModal(false);
    setActiveFinalModal(false);
  };
  // const handleRemoveItem = ({ id }: CartItem) => {
  //   dispatch(removeItem(id));
  // };
  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  function calculateTotalSum(items: ProductType[]): number {
    return items.reduce(
      (total, item) => total + item.priceLess100000 * (item?.count ?? 0),
      0
    );
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.consent) {
      const submissionData: OrderSubmitRequest = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        description: formData.description,
        consent: formData.consent,
        items: formData.items.map((item) => ({
          id: item.id,
          count: item.count ?? 0,
        })),
      };
      try {
        const result = await submitOrder(submissionData).unwrap();
        setActiveFinalModal(true);
        setActiveModal(false);
        console.log("Заказ успешно отправлен", result);
      } catch (error) {
        console.error("Ошибка при отправке заказа", error);
      }
    } else {
      console.error("Вы должны согласиться с условиями.");
    }
  };
  return (
    <>
      <LayoutShort />
      <div className="text_page compare_page">
        <div className="container " style={{ minHeight: "500px" }}>
          <div className="text_page_top">
            <h1>
              ваши заказанные <b>товары</b>
            </h1>
            <Bradscubs bradscubs={bradscubs} />
          </div>
          <div className="row" style={{ gap: "20px" }}>
            {cart.length > 0 ? (
              <React.Suspense fallback={<div>Loading...</div>}>
                {cart.map((product: any) => (
                  <ProductCart cartComponent key={product.id} product={product}>
                    <ProductButtonsDefault product={product} />
                  </ProductCart>
                ))}
              </React.Suspense>
            ) : (
              ""
            )}
          </div>
          <div className="korzina_tovar_big">
            <div className="korzina_tovar_big_div">
              <p className="korzina_tovar_big_div_text">
                В корзине <span id="karzinca">{cart.length}</span> товаров
              </p>
              <div className="korzina_tovar_big_div_price">
                <h1>итого:</h1>
                <h1 id="preice1">{calculateTotalSum(cart)} ₽</h1>
              </div>
              <div className="korzina_tovar_big_div_btn">
                <p>
                  При нажатии на кнопку оформить заказ, будет сформирован весь
                  нужный список товаров
                </p>
                <button onClick={() => openModal()}>
                  {" "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.03305 3.44444H23L20.5556 12H6.34931M21.7778 16.8889H7.11111L4.66667 1H1M8.33333 21.7778C8.33333 22.4528 7.78612 23 7.11111 23C6.4361 23 5.88889 22.4528 5.88889 21.7778C5.88889 21.1027 6.4361 20.5556 7.11111 20.5556C7.78612 20.5556 8.33333 21.1027 8.33333 21.7778ZM21.7778 21.7778C21.7778 22.4528 21.2306 23 20.5556 23C19.8805 23 19.3333 22.4528 19.3333 21.7778C19.3333 21.1027 19.8805 20.5556 20.5556 20.5556C21.2306 20.5556 21.7778 21.1027 21.7778 21.7778Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  ОФОРМИТЬ ЗАКАЗ
                </button>
              </div>
            </div>
            <div
              onClick={() => handleClearCart()}
              className="korzina_tovar_big_div1"
            >
              <p>Очистить корзину</p>
              <div className="korzina_tovar_big_div1_close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill: white;transform: ;msFilter:;"
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeModal ? (
        <div className="modal_korzina" onClick={handleBackgroundClick}>
          <form className="modal_korzina_div" onSubmit={handleSubmit}>
            <div className="modal_korzina_div_img_fon">
              <img src="/images/Слой_x0020.svg" alt="" />
            </div>
            <div className="modal_korzina_div_form">
              <div
                onClick={() => closeModal()}
                className="modal_korzina_div_form_close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{ fill: "#939393" }}
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
              </div>
              <div className="modal_korzina_div_form_div">
                <label>
                  <input
                    id="name"
                    placeholder="Ваше имя"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="input_error"></p>
                </label>
                <label>
                  <input
                    required
                    id="phoneNumber"
                    placeholder="Номер телефона"
                    type="tel"
                    pattern="^\+?\d{10,13}$"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />

                  {/* <p className="input_error">
                    Введите корректный номер телефона
                  </p> */}
                </label>
                <label>
                  <input
                    required
                    id="email"
                    placeholder="Электронная почта"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {/* <p className="input_error">Введите корректный email</p> */}
                </label>
                <label>
                  <input
                    required
                    id="description"
                    placeholder="Место доставки"
                    type="text"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <p className="input_error"></p>
                </label>
                <div className="modal_korzina_div_form_div_check">
                  <input
                    required
                    id="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleInputChange}
                  />
                  <p>
                    Нажимая на кнопку “отправить” вы даёте своё согласие на
                    обработку персональных данных
                  </p>
                </div>
                <button type="submit">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.03305 3.44444H23L20.5556 12H6.34931M21.7778 16.8889H7.11111L4.66667 1H1M8.33333 21.7778C8.33333 22.4528 7.78612 23 7.11111 23C6.4361 23 5.88889 22.4528 5.88889 21.7778C5.88889 21.1027 6.4361 20.5556 7.11111 20.5556C7.78612 20.5556 8.33333 21.1027 8.33333 21.7778ZM21.7778 21.7778C21.7778 22.4528 21.2306 23 20.5556 23C19.8805 23 19.3333 22.4528 19.3333 21.7778C19.3333 21.1027 19.8805 20.5556 20.5556 20.5556C21.2306 20.5556 21.7778 21.1027 21.7778 21.7778Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Оформить заказ
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      {useActiveFinalMoadal && (
        <div className="modal_buyurtma" onClick={handleBackgroundClick}>
          <div className="modal_buyurtma_div">
            <div
              onClick={() => closeModal()}
              className="modal_buyurtma_div_close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "black" }}
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </div>
            <p>
              Ваше сообщение успешно отправлено! <br />
              Вы получите ответ в ближайшее время
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
