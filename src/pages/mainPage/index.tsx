import React, { Suspense } from "react";
import MainBanner from "../../layout/headerMain/headerMain";
import LayoutMain from "../../layout/layoutMain/layoutMain";

const ProductsNew = React.lazy(
  () => import("../../components/productNew/index")
);
const ProductsRecommendation = React.lazy(
  () => import("../../components/productsRecomendation/index")
);
const Advantages = React.lazy(
  () => import("../../components/advantages/index")
);
const HowWork = React.lazy(() => import("../../components/howWork/index"));
const ProductsPopular = React.lazy(
  () => import("../../components/productPopular/index")
);
const Partners = React.lazy(() => import("../../components/partners/index"));
const ContactsBlock = React.lazy(
  () => import("../../components/contactsBlock/index")
);

const HomePage = () => {
  return (
    <LayoutMain>
      <ProductsNew />
      <ProductsRecommendation />
      <Advantages />
      <HowWork />
      <ProductsPopular />
      <Partners />
      <ContactsBlock />
    </LayoutMain>
  );
};

export default HomePage;
