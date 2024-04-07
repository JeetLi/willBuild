// ContactsPage.tsx
import React, { Suspense, lazy } from "react";
import Bradscubs from "../../components/breadcubs/breadcubs";
import LayoutShort from "../../layout/layoutShort/layoutShort";
import { ROUTES } from "../../models/constant";

// Lazy load the ContactsMap and Partners components
const ContactsMap = lazy(
  () => import("../../components/contactMaps/contactMaps")
);
const Partners = lazy(() => import("../../components/partners/index"));

interface BradscubItem {
  id: number;
  link?: string;
  name: string;
  active?: boolean;
}

const bradscubs: BradscubItem[] = [
  {
    id: 1,
    link: ROUTES.main,
    name: "Главная страница",
  },
  {
    id: 2,
    name: "Контакты",
    active: true,
  },
];

const ContactsPage: React.FC = () => {
  return (
    <LayoutShort>
      <div className="text_page contacts">
        <div className="container">
          <div className="text_page_top">
            <h1>Контакты</h1>
            <Bradscubs bradscubs={bradscubs} />
          </div>
          <div className="company_name">ООО "БУДЕМ СТРОИТЬ"</div>
          <p>
            Компания ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "БУДЕМ СТРОИТЬ"
            зарегистрирована 13.03.2023 г. Краткое наименование: БУДЕМ СТРОИТЬ.
            При регистрации организации присвоен ОГРН 1237700196150, ИНН
            9727029070 и КПП 772701001. Юридический адрес: 117628, город Москва,
            вн.тер. г. Муниципальный Округ Северное Бутово, ул. Грина, дом 32
          </p>
          <div className="map">
            <ContactsMap />
          </div>
        </div>
      </div>
      <Partners />
    </LayoutShort>
  );
};

export default ContactsPage;
