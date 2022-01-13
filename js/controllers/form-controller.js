import * as listController from "./list-controller.js";
import * as addressService from "../services/address-service.js";
import Address from "../models/address.js";

function State() {
  this.address = new Address();
  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputBairro = null;
  this.inputCity = null;
  this.btnSave = null;
  this.btnClear = null;
  this.errorMessageCep = null;
  this.errorMessageNumber = null;
}

function handleInputNumeberChange(event) {
  if (event.target.value == "") {
    setError("number", "Informe um número");
  }
}

function handleInputNumeberKeyup(event) {
  state.address.number = event.target.value;
}

function handleBtnClearForm(event) {
  event.preventDefault();
  clear();
}

function handleBtnSaveClick(event) {
  event.preventDefault();
  const errors = addressService.validarForm(state.address);
  const keys = Object.keys(errors);
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      setError(keys[i], errors[keys[i]]);
    }
  } else {
    listController.addCard(state.address);
    clear();
  }
}

async function handleInputCepChange(event) {
  const cep = event.target.value;
  try {
    const address = await addressService.findByCep(cep);

    state.inputStreet.value = address.street;
    state.inputBairro.value = address.bairro;
    state.inputCity.value = address.city;
    state.address = address;

    setError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    state.inputStreet.value = "";
    state.inputBairro.value = "";
    state.inputCity.value = "";
    setError("cep", "Informe um CEP válido");
  }
}

function clear() {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputBairro.value = "";
  state.inputCity.value = "";

  setError("cep", "");
  setError("number", "");
  state.address = new Address();
  state.inputCep.focus();
}

function setError(key, value) {
  const element = document.querySelector(`[data-error=${key}]`);
  element.innerHTML = value;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputBairro = document.forms.newAddress.bairro;
  state.inputCity = document.forms.newAddress.city;
  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;
  state.errorMessageCep = document.querySelector("[data-error=cep]");
  state.errorMessageNumber = document.querySelector("[data-error=number]");

  state.inputNumber.addEventListener("change", handleInputNumeberChange);
  state.inputNumber.addEventListener("keyup", handleInputNumeberKeyup);
  state.btnClear.addEventListener("click", handleBtnClearForm);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleInputCepChange);
}
