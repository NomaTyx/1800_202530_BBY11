import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";

let colorData;

async function displayTournamentData(color) {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            location.href = "login.html";
        }

        if (color == "white") {
            colorData = await readResultForWhite();

            // This is a temporary thing until the graph functions
            document.getElementsByClassName("text-center").innerHTML = colorData;
            // renderGraph(colorData);
        } else if (color == "black") {
            colorData = await readResultForBlack();

            // This is a temporary thing until the graph functions
            document.getElementsByClassName("text-center").innerHTML = colorData;
            // renderGraph(colorData);
        }
    });
}

document.getElementById("getDataForWhite").addEventListener("click", displayTournamentData("white"));
document.getElementById("getDataForBlack").addEventListener("click", displayTournamentData("black"));

let resultData;

async function readResultForWhite() {
    const userData = user.uid;
    const userTournamentDataRef = collection(db, "users", userData, "tournamentData")
        .where("color", "==", "white");
    const querySnapshot = await getDocs(userTournamentDataRef);

    let colorCount = 0;
    let winCount = 0;
    let lossCount = 0;

    querySnapshot.forEach((doc) => {
        colorCount++;
        resultData = doc.data().result;

        if (resultData == 1) {
            winCount++;
        } else {
            lossCount++;
        }
    });

    let winRate = (winCount + lossCount) / 2;

    return "Your winrate for white is " + winRate + " in " + colorCount + " games.";
}

async function readResultForBlack() {
    const userData = user.uid;
    const userTournamentDataRef = collection(db, "users", userData, "tournamentData")
        .where("color", "==", "black");
    const querySnapshot = await getDocs(userTournamentDataRef);

    let colorCount = 0;
    let winCount = 0;
    let lossCount = 0;

    querySnapshot.forEach((doc) => {
        colorCount++;
        resultData = doc.data().result;

        if (resultData == 1) {
            winCount++;
        } else {
            lossCount++;
        }
    });

    let winRate = (winCount + lossCount) / 2;

    return "Your winrate for black is " + winRate + " in " + colorCount + " games.";
}

function renderGraph(colorData) {
    // Render graph code here
    const winRate = document.getElementsById("chart");
    const winRateGraph = new Chart(winRate, {
        // The graph ig
        type: "line",
        data: {
            // The pain ig.
        }
    });
}