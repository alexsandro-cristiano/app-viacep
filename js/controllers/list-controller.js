function State() {
  this.listSection = null;
}

const state = new State();

function createCard(address) {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const line = document.createElement("p");
  const cep = document.createElement("p");

  div.classList.add("card-list-item");
  line.classList.add("address-line");
  cep.classList.add("address-cep");

  h3.innerHTML = address.city;
  line.innerHTML = `${address.street}, ${address.number} - ${address.bairro}`;
  cep.innerHTML = address.cep;

  div.appendChild(h3);
  div.appendChild(line);
  div.appendChild(cep);
  
  return div;
}

export function addCard(address) {
  const card = createCard(address);
  state.listSection.appendChild(card);
}

export function init() {
  state.listSection = document.querySelector("#list-section");
}
