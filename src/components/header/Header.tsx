import React, { useState } from "react";
import { float } from "../../float/float";
import { useAppSelector } from "../../hooks/hooks";
import { calcCurrentWallet, calcInitialWallet } from "../../calculation/calc";
import { WalletModal } from "../wallet/walletModal";

export const Header = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const currencies = useAppSelector(
    (state) => state.currencyReducer.currencies
  );
  const { currencies: walletCurrency } = useAppSelector(
    (state) => state.walletReducer
  );
  const topCurrencies = currencies.slice(0, 3);

  const currentPrice = calcCurrentWallet(walletCurrency, currencies);
  const initialPrice = calcInitialWallet(walletCurrency);
  const walletDifference = currentPrice - initialPrice;
  const walletDifferencePercent = initialPrice
    ? (walletDifference / initialPrice) * 100
    : 0;

  return (
    <header className="header">
      <ul className="top-currency">
        {topCurrencies.map((e) => (
          <li className="top-currency__item" key={e.id}>
            {e.name} - ${float(e.priceUsd)}
          </li>
        ))}
      </ul>
      <div className="header__wallet" onClick={() => setModalActive(true)}>
        <div className="header__wallet-info">
          <div>${float(currentPrice)}</div>
          <div>
            {walletDifference > 0 ? "+" : ""}
            {float(walletDifference)}$
          </div>
          <div>{float(walletDifferencePercent)}%</div>
        </div>
      </div>
      {modalActive && (
        <WalletModal
          walletCurrency={walletCurrency}
          setActive={setModalActive}
        />
      )}
    </header>
  );
};
