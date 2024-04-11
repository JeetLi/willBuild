import React from "react";
import { Link } from "react-router-dom";
import MainbannerFormOnly from "../mainBannerFormOnly/mainBannerFormOnly";
import { ROUTES } from "../../models/constant";

type MainbannerFormWrapper = {
  closeModal: () => void;
};

const MainbannerFormWrapper: React.FC<MainbannerFormWrapper> = ({
  closeModal,
}) => {
  return (
    <div className="mainbanner_form_mob container">
      <Link to={ROUTES.main} className="logo"></Link>
      <MainbannerFormOnly  />
    </div>
  );
};

export default MainbannerFormWrapper;
