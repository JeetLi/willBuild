import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../models/constant";
import { ProductType } from "../../models/types";
import { useAppSelector } from "../../hooks/typed-react-redux-hooks";
import { number } from "yup";
// import { useComparisonsStore } from "@/app/stores/modules/comparison";

interface ComparisonProps {
  active?: boolean;
  count?: boolean;
}

const ComparisonLink: React.FC<ComparisonProps> = ({
  active = true,
  count = false,
}) => {
  const [useCount, SetCount] = useState(0);
  const cart: ProductType[] = useAppSelector((state) => state.cartSlice.items);
  useEffect(() => {
    const lengthCount = cart?.length;
    SetCount(lengthCount);
  }, [cart]);
  return (
    <div className="header_icon">
      {cart.length > 0 ? <i>{useCount}</i> : ""}
      <Link to={ROUTES.cart} className={`compare ${active ? "active" : ""}`}>
        {cart.length > 0 ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.03305 3.44444H23L20.5556 12H6.34931M21.7778 16.8889H7.11111L4.66667 1H1M8.33333 21.7778C8.33333 22.4528 7.78612 23 7.11111 23C6.4361 23 5.88889 22.4528 5.88889 21.7778C5.88889 21.1027 6.4361 20.5556 7.11111 20.5556C7.78612 20.5556 8.33333 21.1027 8.33333 21.7778ZM21.7778 21.7778C21.7778 22.4528 21.2306 23 20.5556 23C19.8805 23 19.3333 22.4528 19.3333 21.7778C19.3333 21.1027 19.8805 20.5556 20.5556 20.5556C21.2306 20.5556 21.7778 21.1027 21.7778 21.7778Z"
              stroke="#EC2A00"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.03305 3.44444H23L20.5556 12H6.34931M21.7778 16.8889H7.11111L4.66667 1H1M8.33333 21.7778C8.33333 22.4528 7.78612 23 7.11111 23C6.4361 23 5.88889 22.4528 5.88889 21.7778C5.88889 21.1027 6.4361 20.5556 7.11111 20.5556C7.78612 20.5556 8.33333 21.1027 8.33333 21.7778ZM21.7778 21.7778C21.7778 22.4528 21.2306 23 20.5556 23C19.8805 23 19.3333 22.4528 19.3333 21.7778C19.3333 21.1027 19.8805 20.5556 20.5556 20.5556C21.2306 20.5556 21.7778 21.1027 21.7778 21.7778Z"
              stroke="#C1C1C1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </Link>
    </div>
  );
};

export default ComparisonLink;
