import * as requestService from "./request-service.js";
import Address from "../models/address.js";
import { RequestException } from "./exceptions/request-exceptions.js";

export async function findByCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const result = await requestService.getJson(url);

  if (result.logradouro == undefined) {
    throw new RequestException("Erro na requisição.");
  }
  
  const address = new Address(
    result.cep,
    result.logradouro,
    null,
    result.bairro,
    result.localidade
  );
  return address;
}

export function validarForm(address) {
  const errors = {};

  if (!address.cep || address.cep == "") {
    errors.cep = "CEP inválido";
  }

  if (!address.number || address.number == "") {
    errors.number = "Campo requerido";
  }

  return errors;
}
