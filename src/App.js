import React, { useState, useEffect } from "react";
import "./index.css";
import CurrencyLine from "./CurrencyLine";

const BASE_URL = "https://api.exchangerate.host/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [firstAmount, setFirstAmount] = useState();
  const [secondAmount, setSecondAmount] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInFirstCurrency, setAmountInFirstCurrency] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}?base=RUB`)
      .then((res) => res.json())
      .then((data) => {
        const toCurrency = Object.keys(data.rates)[149];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFirstCurrency(data.base);
        setSecondCurrency(toCurrency);
        setExchangeRate(data.rates[toCurrency]);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}?base=${firstCurrency}&symbols=${secondCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[secondCurrency]);
      });
  }, [firstCurrency, secondCurrency]);

  function changeFirstValue(e) {
    setFirstAmount(e.target.value);
    setAmountInFirstCurrency(true);
  }
  function changeSecondValue(e) {
    setSecondAmount(e.target.value);
    setAmountInFirstCurrency(false);
  }

  let amount, resultFirstAmount, resultSecondAmount;

  if (amountInFirstCurrency) {
    amount = firstAmount;
    resultSecondAmount = (amount * exchangeRate).toFixed(2);
  } else {
    amount = secondAmount;
    resultFirstAmount = (amount / exchangeRate).toFixed(2);
  }

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <CurrencyLine
        currencyOptions={currencyOptions}
        selectedCurrency={firstCurrency}
        onChangedOption={(e) => setFirstCurrency(e.target.value)}
        onChangedAmount={changeFirstValue}
        amount={resultFirstAmount}
      />
      <CurrencyLine
        currencyOptions={currencyOptions}
        selectedCurrency={secondCurrency}
        onChangedOption={(e) => setSecondCurrency(e.target.value)}
        onChangedAmount={changeSecondValue}
        amount={resultSecondAmount}
      />
    </div>
  );
}

export default App;
