import React from "react";
import { float } from "../../../lib/float/float";
import { useNavigate } from "react-router-dom";
import { Currency } from "../../../interfaces/Currency";
import { useWindowWidth } from "../../../hooks/hooks";

interface CurrencyItemProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  setActive: (option: boolean) => void;
  setSelectedCurrency: (option: Currency) => void;
}

export const CurrencyItem = ({
  id,
  rank,
  symbol,
  name,
  supply,
  maxSupply,
  marketCapUsd,
  volumeUsd24Hr,
  priceUsd,
  changePercent24Hr,
  vwap24Hr,
  setActive,
  setSelectedCurrency,
}: CurrencyItemProps) => {
  const navigate = useNavigate();
  const onNavigateToCurrencyDetails = (id: string) => {
    navigate(`/currency/${id}`);
  };
  const width = useWindowWidth();
  const onClickPlusButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(true);
    const currency = {
      id,
      rank,
      symbol,
      name,
      supply,
      maxSupply,
      marketCapUsd,
      volumeUsd24Hr,
      priceUsd,
      changePercent24Hr,
      vwap24Hr,
    };
    setSelectedCurrency(currency);
  };

  return (
    <tr className="table__row" onClick={() => onNavigateToCurrencyDetails(id)}>
      <td className="table__item">{rank}</td>
      <td className="table__item">{name}</td>
      <td className="table__item">${float(priceUsd)}</td>

      {width > 780 ? (
        <td className="table__item">${float(marketCapUsd)}</td>
      ) : null}

      {width > 660 ? (
        <td className="table__item">${float(vwap24Hr)}</td>
      ) : null}
      {width > 560 ? (
        <td className="table__item">{float(supply)}</td>
      ) : null}
      {width > 890 ? <th className="table__item">Volume (24Hr)</th> : null}
      {width > 400 ? (
        <td className="table__item">{float(changePercent24Hr)}%</td>
      ) : null}

      <td className="table__item">
        <button
          className="button button__add" 
          type="submit"
          onClick={onClickPlusButton}
        >+</button>
      </td>
    </tr>
  );
};
