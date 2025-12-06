// This Vite config file (vite.config.js) tells Rollup (production bundler)
// to treat multiple HTML files as entry points so each becomes its own built page.

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        addFriend: resolve(__dirname, "add-friend.html"),
        dataEntry: resolve(__dirname, "data-entry.html"),
        friendSettings: resolve(__dirname, "friend-settings.html"),
        social: resolve(__dirname, "social.html"),
        statistics: resolve(__dirname, "statistics.html"),
        tournamentSelect: resolve(__dirname, "tournament-select.html"),
        userProfile: resolve(__dirname, "user-profile.html"),
      },
    },
  },
});
