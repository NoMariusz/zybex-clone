import { DEFAULT_HIGHSCORES, LOCALSTORAGE_KEY } from "./constants";
import { Highscore, Highscores } from "./interfaces";

export default class HighscoreManager {
    static getHighscores(): Highscores {
        const highscores = this.getFromLocalStorage();

        if (!highscores) {
            this.populateWithBaseHighscores();
            return JSON.parse(JSON.stringify(DEFAULT_HIGHSCORES));
        }

        return highscores;
    }

    static saveHighscore(highscoreData: Highscore) {
        const highscores = this.getHighscores();
        // add one new element
        highscores.push(highscoreData);
        // sort descending
        highscores.sort((a, b) => b.score - a.score);
        // save without the smallest score
        this.putToLoaclStorage(highscores.slice(0, -1));
    }

    private static populateWithBaseHighscores() {
        this.putToLoaclStorage(DEFAULT_HIGHSCORES);
    }

    private static putToLoaclStorage(data: Highscores) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
    }

    private static getFromLocalStorage(): Highscores | undefined {
        const data = localStorage.getItem(LOCALSTORAGE_KEY);
        if (!data) return;

        return JSON.parse(data);
    }
}
