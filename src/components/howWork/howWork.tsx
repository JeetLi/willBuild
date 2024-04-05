import React, { useRef, useState } from "react";
import MainbannerForm from "../mainBannerForm/mainBannerForm";
import Modal from "../modal/modal";

export const HowWork: React.FC = () => {
  const [activeModal, setActiveModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  return (
    <>
      <div className="sheme">
        <div className="container">
          <div className="sheme_title row">
            <h2>
              Как мы <b>работаем</b>
            </h2>
            <div className="desc">Последовательность выполнения заказа</div>
          </div>
          <div className="sheme_wrap"></div>
        </div>
      </div>
      {activeModal && (
        <Modal ref={modalRef} closeModal={closeModal}>
          <h1 className="close_icons" onClick={closeModal}>
            x
          </h1>
          <MainbannerForm closeModal={closeModal} />
        </Modal>
      )}
      <div className="sheme_promo_mob">
        <div className="container">
          <div className="btn-order" onClick={openModal}>
            сделать заявку
          </div>
          <div className="call">
            <div className="icon"></div>
            <div className="text">
              <a href="tel:">8 (495) 431-54-26</a>
              <span>ЗАКАЗАТЬ ЗВОНОК</span>
            </div>
          </div>
          <div className="promobanner promobanner_mob">
            <img src="/images/banner_to_catalog.png" alt="Promo Banner" />
          </div>
        </div>
      </div>
    </>
  );
};
