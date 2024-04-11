import React from "react";
import MainbannerFormOnly from "../mainBannerFormOnly/mainBannerFormOnly";

interface MainbannerFormOnlyProps {
  closeModal: () => void;
}

const MainbannerForm: React.FC<MainbannerFormOnlyProps> = ({ closeModal }) => {
  return (
    <div className="mainbanner_form">
      <div className="logo"></div>
      <MainbannerFormOnly />
    </div>
  );
};

export default MainbannerForm;
