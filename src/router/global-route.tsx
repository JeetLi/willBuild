import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import React, { Suspense } from "react";
import HomePage from "../pages/mainPage";
import DeliveryPage from "../pages/deliveryPage/deliveryPage";
import { ROUTES } from "../models/constant";
import ContactsPage from "../pages/contactsPage/contactPage";
import ProductPage from "../pages/productPage/productPage";
import CatalogPage from "../pages/catalogPage/catalogPage";
import CartPage from "../pages/cartPage/cartPage";
// import Loader from '';

const GlobalRoute = () => {
  return (
    <Router>
      <Suspense fallback={""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={ROUTES.product + "/:id"} element={<ProductPage />} />
          <Route path={ROUTES.cart} element={<CartPage />} />
          <Route path={ROUTES.catalog + "/:id"} element={<CatalogPage />} />
          <Route path={ROUTES.delivery} element={<DeliveryPage />} />
          <Route path={ROUTES.contacts} element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default GlobalRoute;
