import React, { ReactNode } from "react";
import HeaderShort from "../headerShort/headerShort";
import FooterDefault from "../footerDefault/footerDefault";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="wrapper__inner">
      <HeaderShort />
      <div className="wrapper__content">{children}</div>
      <FooterDefault />
    </div>
  );
};

export default Wrapper;
