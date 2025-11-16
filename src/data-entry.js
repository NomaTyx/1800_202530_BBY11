let currentPage;

function loadPage() {}

//export basically means public
export function editCurrentPage(name) {
  currentPage = name;
  alert(name);
}

const alertEl = document.getElementById("errorWithInput");
const roundInputForm = document.getElementById("roundInputForm");

roundInputForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const oppName = document.querySelector("#opponentNameInput")?.value?.trim() ?? "";
  const color = document.querySelector("#colorInput")?.value?.trim() ?? "";
  const result = document.querySelector("#resultInput")?.value ?? "";
  const date = document.querySelector("#dateInput")?.value ?? "";
  if (!oppName || !color || !date) {
    showError("Please fill in all fields.");
    return;
  }
});

//TODO: make page reload after thing is entered
function setVisible(el, visible) {
  el.classList.toggle("d-none", !visible);
}

// Show error message with accessibility and auto-hide
let errorTimeout;
function showError(msg) {
  alertEl.textContent = msg || "";
  alertEl.classList.remove("d-none");
  clearTimeout(errorTimeout);
  errorTimeout = setTimeout(hideError, 5000); // Auto-hide after 5s
}

// Hide error message
function hideError() {
  alertEl.classList.add("d-none");
  alertEl.textContent = "";
  clearTimeout(errorTimeout);
}
