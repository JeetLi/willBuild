import React from "react";
import {
  favoriteAdd,
  favoriteUpdate,
  favoriteRemove,
  favoriteClear,
  favoriteCheck,
} from "../../redux/slice/favoriteSlice";
import {
  addComparison,
  removeComparison,
  selectComparisons,
  checkComparison,
} from "../../redux/slice/comparisonSlice";
import { ProductType } from "../../models/types";
import { useAppDispatch } from "../../hooks/typed-react-redux-hooks";
import { Comparison } from "../../models/types";

export const ProductButtonsDefault: React.FC<{ product: ProductType }> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  // const { comparisonAdd, checkComparison, comparisonRemove } =
  //   useComparisonsStore();
  // const { favoriteAdd, checkFavorite, favoriteRemove } = useFavoritesStore();
  const comparisonData: Comparison = {
    product: product,
  };
  const handleFavoriteClick = () => {
    if (favoriteCheck(product?.id)) {
      favoriteRemove(product?.id);
    } else {
      favoriteAdd(product);
    }
  };

  const handleComparisonClick = () => {
    if (checkComparison(product?.id)) {
      removeComparison(product?.id);
    } else {
      addComparison(comparisonData);
    }
  };

  return (
    <div>
      <div
        onClick={handleFavoriteClick}
        className={`faw ${favoriteCheck(product?.id) ? "active" : ""}`}
      >
        <svg
          width="26"
          height="23"
          viewBox="0 0 26 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG path for favorite icon */}
        </svg>
        <span>В избранное</span>
      </div>
      <div
        onClick={handleComparisonClick}
        className={`compare ${checkComparison(product?.id) ? "active" : ""}`}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG path for comparison icon */}
        </svg>
        <span>В сравнение</span>
      </div>
    </div>
  );
};
