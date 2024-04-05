// PaginationComponent.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onShowMore: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onShowMore,
}) => {
  const getPaginations = (
    currentPage: number,
    totalPages: number
  ): number[] => {
    const result: number[] = [];

    if (currentPage < 4) {
      for (let i = 2; i < 6; i++) {
        if (i === totalPages) continue;
        result.push(i);
      }
    } else if (totalPages < currentPage + 4) {
      for (let i = totalPages - 4; i < totalPages; i++) {
        if (i === 1) continue;
        result.push(i);
      }
    } else {
      const number = currentPage - 1;
      for (let i = number; i < number + 4; i++) {
        if (i === 1) continue;
        if (i === totalPages) continue;
        result.push(i);
      }
    }

    return result;
  };

  const prevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="navigation row">
      <div className="col-8 col-sm-12">
        <div onClick={onShowMore} className="nav_add">
          <span>ПОКАЗАТЬ ЕЩЕ</span>
        </div>
      </div>
      <div className="page_nav_wrap col-4 col-sm-12 row">
        <div className="page_nav">
          {currentPage === 1 ? (
            <span>1</span>
          ) : (
            <a onClick={() => onPageChange(1)}>1</a>
          )}

          {currentPage - 4 > 1 && <span>...</span>}

          {getPaginations(currentPage, totalPages).map((paginate) =>
            paginate !== currentPage ? (
              <a key={paginate} onClick={() => onPageChange(paginate)}>
                {paginate}
              </a>
            ) : (
              <span key={paginate}>{paginate}</span>
            )
          )}

          {currentPage + 4 < totalPages && <span>...</span>}

          {currentPage === totalPages ? (
            <span>{totalPages}</span>
          ) : (
            <a onClick={() => onPageChange(totalPages)}>{totalPages}</a>
          )}
        </div>
        <div className="page_nav_str">
          <div onClick={prevClick} className="prev"></div>
          <div onClick={nextClick} className="next"></div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
