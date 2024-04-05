import React, { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/typed-react-redux-hooks";
import lastReceiptSlie, {
  lastReceiptSetTrue,
} from "../../redux/slice/lastReceiptSlie";
import BurgerMenu from "../burgerMenu/burgerMenu";

const OpenMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="open_menu" onClick={toggleMenu}>
      {" "}
      <BurgerMenu isOpen={isOpen} />
    </div>
  );
};

export default OpenMenu;
