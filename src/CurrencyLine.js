import React from "react";

export default function CurrencyLine({
  currencyOptions,
  selectedCurrency,
  onChangedOption,
  onChangedAmount,
  amount,
}) {
  return (
    <div>
      <input type="number" onChange={onChangedAmount} value={amount}></input>
      <select value={selectedCurrency} onChange={onChangedOption}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
