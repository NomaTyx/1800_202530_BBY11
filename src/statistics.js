import { db } from "./firebaseConfig.js";
import { collection, getDocs, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

// This is just to get the stats reader to work :/
function addTournamentData() {
    const tournamentData = doc(db, "users");
    addDoc(tournamentData, {
        name: "BCC Championship", date: "2025/03/02", rounds: "5",
        time_control: "90+30", record: "3.5-1.5", colour:"black",
        note: "test", last_updated: serverTimestamp()
    });
    addDoc(tournamentData, {
        name: "Treasure Island RYC", date: "2025/06/22", rounds: "5", 
        time_control: "90+30", record: "3.5-1.5", colour:"white", 
        note: ":)", last_updated: serverTimestamp()
    });
    addDoc(tournamentData, {
        name: "Richard Showman Memorial", date: "2025/01/09", rounds: "5", 
        time_control: "90+30", record: "2-3", colour:"black", 
        note: "...", last_updated: serverTimestamp()
    });
}

async function seedtournamentData() {
    const tournamentData = collection(db, "users");
    const querySnapshot = await getDocs(tournamentData);

    if (querySnapshot.empty) {
        console.log("dataTournament collection is empty. Seeding data...");
        addTournamentData();
    } else {
        console.log("dataTournament collection already contains data. Skipping seed.");
    }
}
 
seedtournamentData();

function getTournamentData(data) {
    const userRef = doc(db, "users", userID);
    const tournamentData = doc();
}

// This is to get the actual(?) read function to work
async function displayTournamentData() {
    // Code goes here :/
}

displayTournamentData();
