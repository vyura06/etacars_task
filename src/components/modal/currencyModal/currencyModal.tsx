import React, { ChangeEvent, useState } from "react";
import { Currency } from "../../../interfaces/Currency";
import { useAppDispatch } from "../../../hooks/hooks";
import { addCurrencyToWallet } from "../../../redux/slices/walletSlice";

interface ModalProps {
  setActive: (option: boolean) => void;
  selectedCurrency: Currency | null;
}

const Modal = ({ setActive, selectedCurrency }: ModalProps) => {
  const dispatch = useAppDispatch();
  const reg = /^([0-9]+)(\.)?([0-9]+)?$/;
  const [input, setInput] = useState<string>("");
  const [warningActive, setWarningActive] = useState<boolean>(false);

  const onAddButton = () => {
    if (reg.test(input) && selectedCurrency && input!=='0') {
      setActive(false);
      dispatch(
        addCurrencyToWallet({
          id: selectedCurrency.id,
          name: selectedCurrency.name,
          price: parseFloat(selectedCurrency.priceUsd),
          count: Number(input),
        })
      );
    } else {
      setWarningActive(true);
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className="modal" onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <p>Enter the value and click add</p>
        <form onClick={() => alert("Added to wallet!")} className="modal__input-field">
          <input
            onChange={(e) => onChangeInput(e)}
            type="text"
            value={input}
            autoFocus={true}
            className="modal__input"
            placeholder="Enter the value..."
          />
          <button className="button button__add" onClick={onAddButton} type="submit">
            Add
          </button>
        </form>
        {warningActive && (
          <div className="modal__warning-message">Invalid value</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
