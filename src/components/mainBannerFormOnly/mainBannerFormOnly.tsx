import React, { useState, useEffect, MouseEvent } from "react";
import {
  OrderSubmitRequest,
  useSubmitOrderMutation,
} from "../../redux/service/api";
import { useAppDispatch } from "../../hooks/typed-react-redux-hooks";

interface FormValues {
  name: string;
  phone: string;
  email: string;
}

const MainBannerFormOnly: React.FC = () => {
  const dispatch = useAppDispatch();
  const [submitOrder] = useSubmitOrderMutation();
  const [activeModal, setActiveModal] = useState(false);
  const [useActiveFinalMoadal, setActiveFinalModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    consent: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.consent) {
      const submissionData: OrderSubmitRequest = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        consent: formData.consent,
      };
      try {
        const result = await submitOrder(submissionData).unwrap();

        setActiveModal(true);
        console.log("Заказ успешно отправлен", result);
      } catch (error) {
        console.error("Ошибка при отправке заказа", error);
      }
    } else {
      console.error("You must agree to the terms.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  const closeModal = () => {
    setActiveModal(false);
  };
  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="name"
        placeholder="Ваше имя"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        required
        id="phoneNumber"
        placeholder="Номер телефона"
        type="tel"
        pattern="^\+?\d{10,13}$"
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />

      <button className="form_button" type="submit">
        отправить заявку
      </button>

      <div style={{ position: "relative" }} className="agreement">
        <input
          className="custom-checkbox"
          required
          id="consent"
          type="checkbox"
          checked={formData.consent}
          onChange={handleInputChange}
        />
        <label className="Sdd" htmlFor="checkbox"></label>
        <span id="date221">
          Нажимая на кнопку “отправить” вы даёте своё согласие на обработку
          персональных данных
        </span>
      </div>

      {activeModal && (
        <div className="qora_for_check2" onClick={handleBackgroundClick}>
          <div id="big_div_for_nameinputs" className="big_div_for_name_inputs">
            <div className="div_for_name_inputs">
              <p id="close_for_check" onClick={() => closeModal()}>
                x
              </p>
              <samp style={{ color: "#fff" }}>
                Ваше сообщение было получено. они скоро свяжутся с вами
              </samp>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default MainBannerFormOnly;
