import React, { useEffect, useState } from "react";
import { useGetProductWithPagingQuery } from "../../redux/service/api";
import { useForm } from "react-hook-form";
import { throttle } from "../../utils/optimization";
// import { useCategoriesStore } from "@/app/stores/modules/category";
import { Link } from "react-router-dom";
import { ROUTES } from "../../models/constant";
import {
  CategoryState,
  CategoryTypes,
  ProductCardProps,
} from "../../models/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/typed-react-redux-hooks";
import { fetchProducts } from "../../redux/slice/productSlice";
import "./search.css";
import { findCategoryById } from "../../utils/category";
interface Data {
  items: ProductCardProps[];
}

interface SearchComponentProps {
  mobile?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ mobile }) => {
  const [useMobile, setMobile] = useState(mobile);
  const [isActive, setIsActive] = useState(false);
  const [searchName, setSearchName] = useState("");
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.products);
  const CategoryState = useAppSelector((state) => state.category);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    dispatch(fetchProducts(searchName));
    setIsActive(true);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchProducts(searchName));
    setIsActive(true);
  };

  const currentCategory = (
    state: CategoryState,
    id: number
  ): CategoryTypes | undefined => {
    return findCategoryById(state.categories, id);
  };

  useEffect(() => {}, [searchName]);

  return (
    <>
      {useMobile ? (
        ""
      ) : (
        <div className="search_panel_text">Доставка в день заказа</div>
      )}
      <div
        className={useMobile ? "search_mob" : ""}
        style={
          useMobile
            ? { background: "#fff0", position: "relative", boxShadow: "none" }
            : { position: "relative" }
        }
        onClick={() => setIsActive(false)}
      >
        <form
          className={useMobile ? "search_mob" : "search"}
          style={
            useMobile
              ? { maxWidth: "90%", zIndex: 1 }
              : { position: "relative" }
          }
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchName}
            onChange={handleInputChange}
            placeholder="Поиск товаров..."
            className={useMobile ? "inputSearch" : ""}
          />
          <button type="submit">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.35542 9.33629L12 12M10.7778 5.88889C10.7778 8.58896 8.58896 10.7778 5.88889 10.7778C3.18883 10.7778 1 8.58896 1 5.88889C1 3.18883 3.18883 1 5.88889 1C8.58896 1 10.7778 3.18883 10.7778 5.88889Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
        {isActive && product?.length && (
          <div
            className="search-block"
            style={{ display: "flex", gap: " 10px", flexDirection: "column" }}
          >
            {product.map((product: ProductCardProps) => (
              <div key={product.id} className="seach-block__item">
                <div className="search-block__info">
                  <Link to={ROUTES.product + "/" + product.id}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width="64"
                      height="64"
                    />
                  </Link>
                  <div>
                    <Link
                      to={ROUTES.catalog + "/" + product.categoryId}
                      className="search-block__category"
                    >
                      {
                        currentCategory(CategoryState, product?.categoryId)
                          ?.name
                      }
                    </Link>
                    <Link
                      to={ROUTES.product + "/" + product.id}
                      className="search-block__title"
                    >
                      {product.name}
                    </Link>
                    <div className="search-block__price">
                      {product.priceLess100000} ₽
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
