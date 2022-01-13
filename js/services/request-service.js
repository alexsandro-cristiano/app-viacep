import { RequestException } from "./exceptions/request-exceptions.js";

export async function getJson(url) {
  try {
    const response = await fetch(url);
    const jsonBody = await response.json();

    if (jsonBody.logradouro == undefined) {
      throw new RequestException("Erro na requisição.");
    }

    return jsonBody;
  } catch (e) {
    throw new RequestException("Erro na requisição.");
  }
}
