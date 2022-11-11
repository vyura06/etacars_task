import React from "react";
import { Wallet } from "../../../interfaces/Wallet";
import { float } from "../../../lib/float/float";
import { useAppDispatch } from "../../../hooks/hooks";
import { deleteCurrencyFromWallet } from "../../../redux/slices/walletSlice";

interface WalletModalProps {
  setActive: (option: boolean) => void;
  walletCurrency: Wallet[];
}

export const WalletModal = ({
  setActive,
  walletCurrency,
}: WalletModalProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="modal" onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>Your wallet</p>
        <ul style={{ textAlign: "left" }} className="wallet-list">
          {walletCurrency.map((e) => (
            <li style={{ marginBottom: "1rem" }} className="wallet-list__item" key={e.id}>
              <a style={{ marginLeft: "1rem" }}>{e.name}</a>
              <a style={{ marginLeft: "1rem" }}>${float(e.price)}</a>
              <a style={{ marginLeft: "1rem" }}>{e.count}</a>
              <button
                style={{ marginLeft: "1rem" }}
                className="button button__delete"
                type="submit"
                onClick={() => dispatch(deleteCurrencyFromWallet(e.id))}
              >Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
