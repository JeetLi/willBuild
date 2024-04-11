import React, { FC, ReactElement, Suspense } from "react";
import HeaderMain from "../headerMain/headerMain";
const FooterDefault = React.lazy(
  () => import("../footerDefault/footerDefault")
);
const LayoutMain: FC<React.PropsWithChildren<{}>> = ({
  children,
}): ReactElement => {
  return (
    <div className="wrapper__inner">
      <HeaderMain />
      <div className="wrapper__content">{children}</div>
      <FooterDefault />
    </div>
  );
};

export default LayoutMain;
