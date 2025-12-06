# Universal Chess Tracker


## Overview
Universal Chess Tracker is a client-side JavaScript web application that allows users to track any kind of chess tournament. It allows them to upload tournaments, and individual games that were played within that tournament. You can also view other users' tournament history so that chess friends may motivate each other to keep competing and improving.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for storing user favorites.

---


## Features

- Input data about games including opponent name, opponent rating, color you played, date of game, result of game, and any miscellaneous notes.
- Categorize games based on what tournament you played in
- View users' tournaments on their profile
- Add users as a friend to easily view their profile
- Customize your name and profile description.
---


## Technologies Used

Example:
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase for hosting
- **Database**: Firestore

---


## Usage

1. Open your browser and visit `https://chesstornamenttracker.web.app/`.
2. Create an account or log into an existing account

---


## Project Structure

```
1800_202530_BBY11/
├─ .firebase/
│  └─ hosting.ZGlzdA.cache
├─ dist/
│  ├─ assets/
│  │  ├─ addFriend-DvSONivI.js
│  │  ├─ bootstrap-Byri1FyK.css
│  │  ├─ bootstrap.esm-Dkdn_E66.js
│  │  ├─ data-entry-Byaptdeh.css
│  │  ├─ dataEntry-C10lN1Wo.js
│  │  ├─ index-BWjJSzlO.js
│  │  ├─ login-Bm4Xgyf9.js
│  │  ├─ main-DM5d0uiy.js
│  │  ├─ socals-style-BfSZOiRw.css
│  │  ├─ social-BHJA6yNL.js
│  │  ├─ statistics-Bej62ELj.css
│  │  ├─ statistics-CjA_xwGp.js
│  │  ├─ tournamentSelect-DG_2OU2D.js
│  │  ├─ uct-logo-q6i9Iknz.svg
│  │  └─ userProfile-t7TOviZs.js
│  ├─ images/
│  │  ├─ AM01.jpg
│  │  ├─ BBY01.jpg
│  │  ├─ chess-placeholder.png
│  │  ├─ chess-placeholder.svg
│  │  ├─ elmo.jpg
│  │  ├─ hike1.jpg
│  │  ├─ hike2.jpg
│  │  ├─ hike3.jpg
│  │  ├─ logo.jpg
│  │  ├─ NV01.jpg
│  │  ├─ settingsCog.svg
│  │  └─ uct-logo.svg
│  ├─ add-friend.html
│  ├─ data-entry.html
│  ├─ friend-settings.html
│  ├─ index.html
│  ├─ login.html
│  ├─ social.html
│  ├─ statistics.html
│  ├─ tournament-select.html
│  └─ user-profile.html
├─ images/
│  ├─ AM01.jpg
│  ├─ BBY01.jpg
│  ├─ chess-placeholder.png
│  ├─ elmo.jpg
│  ├─ hike1.jpg
│  ├─ hike2.jpg
│  ├─ hike3.jpg
│  ├─ logo.jpg
│  ├─ NV01.jpg
│  ├─ plus.png
│  └─ uct-logo.svg
├─ public/
│  └─ images/
│     ├─ AM01.jpg
│     ├─ BBY01.jpg
│     ├─ chess-placeholder.png
│     ├─ chess-placeholder.svg
│     ├─ elmo.jpg
│     ├─ hike1.jpg
│     ├─ hike2.jpg
│     ├─ hike3.jpg
│     ├─ logo.jpg
│     ├─ NV01.jpg
│     ├─ settingsCog.svg
│     └─ uct-logo.svg
├─ src/
│  ├─ components/
│  │  ├─ friendCard.js
│  │  ├─ site-footer.js
│  │  └─ site-navbar.js
│  ├─ add-friend.js
│  ├─ authentication.js
│  ├─ data-entry.js
│  ├─ firebaseConfig.js
│  ├─ loginSignup.js
│  ├─ main.js
│  ├─ socals.js
│  ├─ statistics.js
│  ├─ tournament-select.js
│  └─ user-profile.js
├─ styles/
│  ├─ component-style.css
│  ├─ data-entry.css
│  ├─ socals-style.css
│  ├─ statistics.css
│  └─ style.css
├─ .env
├─ .firebaserc
├─ .gitignore
├─ add-friend.html
├─ data-entry.html
├─ firebase.json
├─ firestore.indexes.json
├─ firestore.rules
├─ friend-settings.html
├─ index.html
├─ login.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ skeleton.html
├─ social.html
├─ statistics.html
├─ tournament-select.html
├─ user-profile.html
└─ vite.config.js

```

---


## Contributors
- **Umanga** - BCIT CST Student with a passion for hanging out with friends, and coding. Fun fact: Loves rom-com manga's they are so cool. 
- **Angelica Tanaka (angl-t)** - BCIT CST Student, who is always tired for some reason. Fun fact: Has some random knowledge for some odd reason.
- **Julia** - BCIT CST Student with a passion for passing COMP-1800. Fun fact: Used to be a competitive fencer.
=======


---


## Acknowledgments

- Logo and graphics were inspired by the 'Horsey' chess set from lichess.org

---


## Limitations and Future Work
### Limitations

- There is a page on the website– the Statistics screen– that has no functionality. We have left it in to demonstrate that it was worked on, but it is nonfunctional.
- The frontend may not be as responsive as we had wanted initially.

### Future Work

- Statistics screen so that you can visualize your data.
- Improving UI/UX
- Perhaps adding functionality to add the actual game with chess notation.

---


## License

This project is licensed under the MIT License. See the LICENSE file for details.
