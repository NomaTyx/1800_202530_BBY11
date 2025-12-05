import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "/styles/style.css";

// --- Initialize UI on DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
  //this is a workaround to the fact that I was told index.html is hardcoded to be the landing page.
  //if you load the url with no specified html file, it takes you to tournament-select.html.
  if (!location.href.includes(".html")) {
    window.location.href = "tournament-select.html";
  }
});
