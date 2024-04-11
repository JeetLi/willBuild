import React, { useState, useEffect, useCallback } from "react";
import { ProductButtonsDefault } from "../ProductButtonsDefault/index";
import Pagination from "../pagination/pagination";
import { getQuery } from "../../utils/url";
import { QueryParams } from "../../models/interface";
import { useGetProductWithPagingQuery } from "../../redux/service/api";
const ProductCart = React.lazy(() => import("../productCard/index"));

interface CatalogProps {
  catalogId: number;
}

const ProductCatalog: React.FC<CatalogProps> = ({ catalogId }) => {
  const [query, setQuery] = useState<QueryParams>({
    Items: 12,
    CategoryId: catalogId,
    Page: 1,
  });
  const { data: catalog } = useGetProductWithPagingQuery(getQuery(query));

  const changePage = (value: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      Page: value,
    }));
  };
  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      CategoryId: catalogId,
    }));
  }, [catalogId]);
  const loadMoreItems = () => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      Items: prevQuery.Items + 12,
    }));
  };
  return (
    <>
      <div className="catalog_list  row">
        {catalog && catalog.totalCountItems > 0 ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            {catalog?.items.map((product) => (
              <ProductCart key={product.id} product={product}>
                <ProductButtonsDefault product={product} />
              </ProductCart>
            ))}
          </React.Suspense>
        ) : (
          ""
        )}
      </div>
      {catalog?.totalCountItems && catalog.totalCountItems > query.Items ? (
        <Pagination
          currentPage={query.Page}
          totalPages={Math.floor(catalog?.totalCountItems / 12)}
          onShowMore={loadMoreItems}
          onPageChange={changePage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductCatalog;

// // const { catalogAsyncGet, catalog } = catalogStore;

// const fetchCatalog = useCallback(() => {
// useGetProductWithPagingQuery(getQuery(query);
// }, [data, query]);

// useEffect(() => {
//   fetchCatalog();
// }, [fetchCatalog]);

// useEffect(() => {
//   setQuery((prevQuery) => ({
//     ...prevQuery,
//     CategoryId: catalogId,
//   }));
// }, [catalogId]);
