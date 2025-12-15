"use strict";

const rates = [
  { code: "uah", rateToUAH: 1 },
  { code: "usd", rateToUAH: 41.5 },
  { code: "eur", rateToUAH: 45.0 }
];

const fromSel = document.getElementById("from");
const toSel = document.getElementById("to");
const amountInp = document.getElementById("amount");
const resultEl = document.getElementById("result");
const swapBtn = document.getElementById("swapBtn");

function getRate(code) {
  const item = rates.find(r => r.code === code);
  return item ? item.rateToUAH : NaN;
}

function syncSelects() {
  const from = fromSel.value;

  [...toSel.options].forEach(opt => {
    opt.disabled = (opt.value === from);
  });

  if (toSel.value === from) {
    const firstEnabled = [...toSel.options].find(o => !o.disabled);
    toSel.value = firstEnabled.value;
  }
}

function calc() {
  const from = fromSel.value;
  const to = toSel.value;
  const amount = Number(amountInp.value) || 0;

  const fromRate = getRate(from);
  const toRate = getRate(to);

  if (!isFinite(fromRate) || !isFinite(toRate)) {
    resultEl.textContent = "0.00";
    return;
  }

  const inUah = amount * fromRate;
  const converted = inUah / toRate;

  resultEl.textContent = converted.toFixed(2);
}

function swapCurrencies() {
  const a = fromSel.value;
  const b = toSel.value;

  fromSel.value = b;
  toSel.value = a;

  syncSelects();
  calc();
}

fromSel.addEventListener("change", () => { syncSelects(); calc(); });
toSel.addEventListener("change", calc);
amountInp.addEventListener("input", calc);
swapBtn.addEventListener("click", swapCurrencies);

syncSelects();
calc();
