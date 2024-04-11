import React, { FC, ReactElement } from "react";
import FooterDefault from "../footerDefault/footerDefault";
import HeaderDefault from "../headerDefault/headerDefault";

const LayoutDefault: FC<React.PropsWithChildren<{}>> = ({
  children,
}): ReactElement => {
  return (
    <div className="wrapper__inner">
      <HeaderDefault />
      <div className="wrapper__content">{children}</div>
      <FooterDefault />
    </div>
  );
};

export default LayoutDefault;
