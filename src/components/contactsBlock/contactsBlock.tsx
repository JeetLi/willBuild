import React from "react";

export const ContactsBlock: React.FC = () => {
  return (
    <div className="contacts_block">
      <div className="container row">
        <div className="map col-8 col-sm-12">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A5ca7d784f193de089359443aadeab7decc7f2edb498576f7ff81aa714dd34d16&amp;source=constructor"
            frameBorder="0"
          ></iframe>
        </div>
        <div className="contacts_text col-4 col-sm-12">
          <div className="text">
            <p>
              Юридический адрес
              <br />
              <br />
              Г.Москва МУНИЦИПАЛЬНЫЙ ОКРУГ ЗАМОСКВОРЕЧЬЕ УЛ БОЛЬШАЯ СЕРПУХОВСКАЯ
              40 СТРОЕНИЕ 2 ОФИС 105
              <br />
              <br />
              ИНН / КПП9705166442 770501001
            </p>
            <a className="tel" href="tel:74954315426">
              8 (495) 431-54-26
            </a>
            <a className="tel" href="tel:79779460780">
              8 (977) 946-07-80
            </a>
          </div>
          <div className="logo js_btn_message"></div>
        </div>
      </div>
    </div>
  );
};
