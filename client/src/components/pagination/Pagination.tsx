import React from "react";

interface PaginationProps {
  paginate: (pageNumber: number) => void;
  currenciesPerPage: number;
  totalCurrency: number;
}

export const Pagination = ({
  paginate,
  currenciesPerPage,
  totalCurrency,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCurrency / currenciesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumbers.map((e) => (
        <li onClick={() => paginate(e)} key={e} className="page-item">
          <a href="#" className="page-link">
            {e}
          </a>
        </li>
      ))}
    </ul>
  );
};
