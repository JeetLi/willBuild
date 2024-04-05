import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/configure-store";
import { ROUTES } from "../../models/constant";
import { ProductCardProps } from "../../models/types";
import { ProductType } from "../../models/types";
import {
  addItem,
  removeItem,
  clearCart,
  updateItemCount,
} from "../../redux/slice/cartSlice";
import { ProductCart, CartItem } from "../../models/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/typed-react-redux-hooks";
import "./productCard.css";
import { Comparison } from "../../models/types";
import DeleteIcon from "./common/deleteIcon";

export const ProductCard: React.FC<{
  product: ProductType;
  children?: React.ReactNode;
  cartComponent?: boolean;
}> = ({ product, children, cartComponent }) => {
  const [countCart, setCountCart] = useState<number>(1);

  const dispatch = useAppDispatch();
  const countCartIncrement = (aa: number) => {
    setCountCart((prevCount) => prevCount + 1);

    if (window.location.pathname === "/compare") {
      const shop = JSON.parse(
        localStorage.getItem("comparisons") || "[]"
      ) as any[];

      for (let i = 0; i < shop.length; i++) {
        if (shop[i].data.id === aa) {
          shop[i].data.countCart++;
        }
      }

      localStorage.setItem("comparisons", JSON.stringify(shop));
    }
  };

  const countCartDecrement = (aa: number) => {
    setCountCart((prevCount) => prevCount - 1);

    if (window.location.pathname === "/compare") {
      const shop = JSON.parse(
        localStorage.getItem("comparisons") || "[]"
      ) as any[];
    }
  };

  const handleUpdateItemCount = (newCount: number) => {
    dispatch(updateItemCount({ productId: product.id, newCount }));
  };

  const handleAddItem = () => {
    const itemToAdd = {
      item: { ...product, count: countCart },
      count: countCart,
    };
    dispatch(addItem(itemToAdd));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(product.id));
  };

  const productCartScale = () => {
    const productCarts = document.querySelectorAll(".product_cart");
    productCarts.forEach(
      (productCart: Element, index: number, parent: NodeListOf<Element>) => {
        if (productCart instanceof HTMLElement) {
          productCart.addEventListener("click", () => {
            productCart.style.transform = "scale(1.05)";
            productCart.style.transition = "0.5s";
          });
        }
      }
    );
  };

  useEffect(() => {
    productCartScale();
  }, []);

  return (
    <div onClick={productCartScale} className="product_cart">
      <div className="icons">{children}</div>
      <div className="photo">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <Link to={ROUTES.product + "/" + product?.id} className="name">
        {product?.name}
      </Link>
      <div className="status">
        {product?.availability && (
          <>
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00033 16.6667C4.39783 16.6667 0.666992 12.9358 0.666992 8.33333C0.666992 3.73083 4.39783 0 9.00033 0C13.6028 0 17.3337 3.73083 17.3337 8.33333C17.3337 12.9358 13.6028 16.6667 9.00033 16.6667ZM9.00033 15C10.7684 15 12.4641 14.2976 13.7144 13.0474C14.9646 11.7971 15.667 10.1014 15.667 8.33333C15.667 6.56522 14.9646 4.86953 13.7144 3.61929C12.4641 2.36905 10.7684 1.66667 9.00033 1.66667C7.23222 1.66667 5.53652 2.36905 4.28628 3.61929C3.03604 4.86953 2.33366 6.56522 2.33366 8.33333C2.33366 10.1014 3.03604 11.7971 4.28628 13.0474C5.53652 14.2976 7.23222 15 9.00033 15ZM8.16949 11.6667L4.63366 8.13083L5.81199 6.9525L8.16949 9.31L12.8828 4.59583L14.062 5.77417L8.16949 11.6667Z"
                fill="#09B01A"
              ></path>
            </svg>
            В наличии: <span>{product?.unit}</span>
          </>
        )}
      </div>
      <div className="prices">
        <div className="price">
          {product?.priceLess100000 ?? 0} ₽{" "}
          <text className="product_unit__mob">/{product.unit}</text>{" "}
        </div>
        <div className="price_desc">Цена за {product?.unit}</div>
      </div>
      {cartComponent ? (
        <div className="btns">
          <button className="btn" onClick={() => handleAddItem()}>
            заказать
          </button>
          <div className="count">
            <input
              type="button"
              value="-"
              onClick={() => handleUpdateItemCount((product.count ?? 0) - 1)}
            />
            <input
              type="number"
              step={1}
              min={1}
              max={9999}
              id="num_count"
              name="quantity"
              value={product.count ? product.count : countCart}
              title="Qty"
              onChange={(e) => {
                const newCountRaw = e.target.value;

                if (newCountRaw.length <= 5) {
                  const newCount = parseInt(newCountRaw, 10);

                  if (!isNaN(newCount) && newCount >= 1 && newCount <= 9999) {
                    setCountCart(newCount);
                    dispatch(
                      updateItemCount({ productId: product.id, newCount })
                    );
                  }
                } else {
                  const trimmedValue = newCountRaw.slice(0, 5);
                  e.target.value = trimmedValue;
                  const newCount = parseInt(trimmedValue, 10);
                  setCountCart(newCount);
                  dispatch(
                    updateItemCount({ productId: product.id, newCount })
                  );
                }
              }}
            />
            <input
              type="button"
              value="+"
              onClick={() => handleUpdateItemCount((product.count ?? 0) + 1)}
            />
          </div>
        </div>
      ) : (
        <div className="btns">
          <button className="btn" onClick={() => handleAddItem()}>
            заказать
          </button>
          <div className="count">
            <input
              type="button"
              value="-"
              onClick={() => countCartDecrement(1)}
            />
            <input
              type="number"
              step={1}
              min={1}
              max={9999}
              id="num_count"
              name="quantity"
              maxLength={5}
              value={product.count ? product.count : countCart}
              title="Qty"
              onChange={(e) => {
                const newCountRaw = e.target.value;
                if (newCountRaw.length <= 5) {
                  const newCount = parseInt(newCountRaw, 10);
                  if (!isNaN(newCount) && newCount >= 1 && newCount <= 9999) {
                    setCountCart(newCount);
                    dispatch(
                      updateItemCount({ productId: product.id, newCount })
                    );
                  }
                } else {
                  const trimmedValue = newCountRaw.slice(0, 5);
                  e.target.value = trimmedValue;
                  const newCount = parseInt(trimmedValue, 10);
                  setCountCart(newCount);
                  dispatch(
                    updateItemCount({ productId: product.id, newCount })
                  );
                }
              }}
            />
            <input
              type="button"
              value="+"
              onClick={() => countCartIncrement(product.id)}
            />
          </div>
        </div>
      )}
      {cartComponent && <DeleteIcon removeItem={handleRemoveItem} />}
    </div>
  );
};
