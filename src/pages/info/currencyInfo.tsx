import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCurrencyHistory } from "../../redux/slices/currencySlice";
import { Loader } from "../../components/loader/Loader";
import Modal from "../../components/modal/currencyModal/currencyModal";
import { float } from "../../lib/float/float";
import { Currency } from "../../interfaces/Currency";
import { LineChart } from "../../components/lineChart/lineChart";


export const Info = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );

  const { status, currencies, history } = useAppSelector(
    (state) => state.currencyReducer
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const currency = currencies.find((e) => e.id === id);
  useEffect(() => {
    if (currency !== null) {
      dispatch(getCurrencyHistory(id));
    }
  }, [id, dispatch]);

  const onNavigateToCurrencyTable = () => {
    navigate(`/`);
  };

  const onClickPlusButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCurrency(selectedCurrency);
    setModalActive(true);
  };

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "error" && <h1>Error!</h1>}
      {status === "success" && history.length ? (
        <div className="currency-details column">
          <div className="row">
            <button
              style={{backgroundColor: "#8D9EFF", color:"white"}} 
              className="button button__add" 
              onClick={onClickPlusButton}
            >+</button>
            <button
              className="button button__back"
              onClick={onNavigateToCurrencyTable}
            >Back</button>
          </div>
          <div className="currency-details__info">
            <div className="currency-details__info-element">
              Name: {currency?.name}
            </div>
            <div className="currency-details__info-element">
              Symbol: {currency?.symbol}
            </div>
            <div className="currency-details__info-element">
              Price:{" "}
              {currency?.priceUsd ? float(currency.priceUsd) : "None"}
            </div>
            <div className="currency-details__info-element">
              Changed:{" "}
              {currency?.changePercent24Hr
                ? `${float(currency.changePercent24Hr)}%`
                : "None"}
            </div>
            <div className="lineChart">
              <LineChart history={history} />
            </div>
          </div>
        </div>
      ) : null}

      {modalActive && currency && (
        <Modal selectedCurrency={currency} setActive={setModalActive} />
      )}
    </>
  );
};