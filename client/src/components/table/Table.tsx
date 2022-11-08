import React, { useState } from "react";
import { CurrencyItem } from "../item/Item";
import Modal from "../modal/Modal";
import { useAppSelector, useWindowWidth } from "../../hooks/hooks";
import { Loader } from "../loader/Loader";
import { Pagination } from "../../components/pagination/Pagination";
import { Currency } from "../../interfaces/Currency";
import { float } from "../../float/float";

export const Table = () => {
  const { currencies, status } = useAppSelector(
    (state) => state.currencyReducer
  );

  const width = useWindowWidth();

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currenciesPerPage] = useState<number>(10);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );
  const lastCurrenciesIndex = currentPage * currenciesPerPage;
  const firstCurrenciesIndex = lastCurrenciesIndex - currenciesPerPage;
  const currentCurrency = currencies.slice(
    firstCurrenciesIndex,
    lastCurrenciesIndex
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {status === "loading" && <Loader />}
      {status === "error" && <h1>Error!</h1>}
      {status === "success" && currencies.length ? (
        <div className="container column">
          <table className="table">
            <thead style={{backgroundColor: "#6C4AB6"}}>
              <tr className="table__row">
                <th style={{color: "white"}} className="table__item">#</th>
                <th style={{color: "white"}} className="table__item">Coin</th>
                <th style={{color: "white"}} className="table__item">Price</th>
                {width > 780 ? (
                  <th style={{color: "white"}} className="table__item">Market cap</th>
                ) : null}

                {width > 660 ? (
                  <th style={{color: "white"}} className="table__item">VWAP (24Hr)</th>
                ) : null}
                {width > 560 ? <th style={{color: "white"}}className="table__item">Supply</th> : null}

                {width > 890 ? (
                  <th style={{color: "white"}} className="table__item">Volume (24Hr)</th>
                ) : (
                  ""
                )}
                {width > 400 ? (
                  <th style={{color: "white"}} className="table__item">Change (24Hr)</th>
                ) : null}
                <th className="table__item"></th>
              </tr>
            </thead>
            <tbody>
              {currentCurrency.map((e) => (
                <CurrencyItem
                  setSelectedCurrency={setSelectedCurrency}
                  setActive={setModalActive}
                  key={e.id}
                  {...e}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            paginate={paginate}
            currenciesPerPage={currenciesPerPage}
            totalCurrency={currencies.length}
          />
        </div>
      ) : null}
      {modalActive && (
        <Modal selectedCurrency={selectedCurrency} setActive={setModalActive} />
      )}
    </>
  );
};
