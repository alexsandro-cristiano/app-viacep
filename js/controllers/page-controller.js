import * as modalController from "./modal-controller.js";

export function init() {
  const contact = document.querySelector("#open-contact");

  contact.addEventListener("click", handleClick);
}

function handleClick(event) {
  event.preventDefault();
  modalController.openModal();
}
