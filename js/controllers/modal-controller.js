function State() {
  this.container = null;
  this.btncloser = null;
}

function handleBtnCloseClick(event) {
  event.preventDefault();
  closeModal();
}

function handleCloseClick(event) {
  event.preventDefault();
  if (event.target === this) {
    closeModal();
  }
}
const state = new State();

export function openModal() {
  state.container.classList.add("active");
}

export function closeModal() {
  state.container.classList.remove("active");
}

export function init() {
  state.container = document.querySelector("#modal-contact");
  state.btncloser = document.querySelector("#close-contact");

  state.btncloser.addEventListener("click", handleBtnCloseClick);
  state.container.addEventListener("click", handleCloseClick);
}
