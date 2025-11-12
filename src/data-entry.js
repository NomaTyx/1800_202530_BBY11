let currentPage;

function loadPage() {}

//export basically means public
export function editCurrentPage(name) {
  currentPage = name;
  alert(name);
}
