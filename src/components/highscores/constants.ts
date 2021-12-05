import { Highscores } from "./interfaces";

export const LOCALSTORAGE_KEY = "zybex-clone-highscores";

export const DEFAULT_HIGHSCORES: Highscores = [
    { playerName: "AAA", score: 1000 },
    { playerName: "AAB", score: 900 },
    { playerName: "AAC", score: 700 },
    { playerName: "ABA", score: 600 },
    { playerName: "ABB", score: 500 },
    { playerName: "ABC", score: 400 },
];
