import Address from "../models/address.js";

function State() {
  this.address = new Address();
  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.btnSave = null;
  this.btnClear = null;

  this.errorMessageCep = null;
  this.errorMessageNumber = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorMessageCep = document.querySelector("[data-error=cep]");
  state.errorMessageNumber = document.querySelector("[data-error=number]");

  state.inputNumber.addEventListener("change", handleInputNumeberChange);
  state.btnClear.addEventListener("click", handleBtnClearForm);
}

function handleInputNumeberChange(event) {
  if (event.target.value == "") {
    setError("number", "campo obrigadorio");
  }
}

function handleBtnClearForm(event) {
  event.preventDefault();
  clear();
}

function clear() {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";
  
  setError("cep", "");
  setError("number", "");
  state.inputCep.focus();
}

function setError(key, value) {
  const element = document.querySelector(`[data-error=${key}]`);
  element.innerHTML = value;
}
