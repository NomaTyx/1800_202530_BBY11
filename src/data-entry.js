import "/src/components/tournament-card.js";
import "/src/components/new-tournament-card.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "/styles/component-style.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

function loadCards() {
  const cardholder = document.getElementById("cardholder");

  let divTemplate = `<div class="row">`;
  //basically the way this works is we make a div with a row, add three cards, then make another one.
  //it all has to be added at once, so we're going to ad deverything to a string variable that we then add at the end
  let str = divTemplate;
  //first card should always be the "new" button because it should be the easiest to see
  str += `<div class="col-md-4">
          <new-tournament-card class="col"></new-tournament-card>
        </div>`;

  //10 is a placeholder until i end up getting the number of things in the doc
  for (let i = 1; i < 10; i++) {
    //every third card, end the row div and start a new one
    if (i % 3 == 0) {
      str += `</div>` + divTemplate;
    }
    //generating a new tournament card every iteration
    str += `<div class="col-md-4">
    <tournament-card class="col"></tournament-card>
    </div>`;
  }
  //since a new div was started and not finished in the loop, we must finish it out here.
  str += "</div>";

  cardholder.innerHTML += str;
}

document.addEventListener("DOMContentLoaded", loadCards);
