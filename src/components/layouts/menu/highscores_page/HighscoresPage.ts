import {
    SCORE_ELEMENTS_COUNT,
    SYMBOL_ELEMENT_WIDTH,
} from "../../../../constants";
import HighscoreManager from "../../../highscores/HighscoreManager";
import { Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import SymbolElement from "../../../rendering/utils/SymbolElement";
import { loadNumberToElements } from "../../../utils";
import {
    HIGHSCORES_NAME_LEFT_OFFSET,
    HIGHSCORES_SCORE_LEFT_OFFSET,
    HIGHSCORES_TOP_OFFSET,
    HIGHSCORE_ELEMENT_GAP,
    HIGHSCORE_WIDTH,
} from "../constants";
import HighscoresBackground from "./HighscoresBackground";

export default class HighscoresPage implements Renderable {
    background: HighscoresBackground;

    elements: SymbolElement[];

    constructor() {
        this.background = new HighscoresBackground();
        this.loadHighscore();
    }

    loadHighscore() {
        this.elements = [];
        const highscores = HighscoreManager.getHighscores();

        for (let i = 0; i < highscores.length; i++) {
            const highscore = highscores[i];
            const y = HIGHSCORES_TOP_OFFSET + HIGHSCORE_WIDTH * i;

            this.makeNameSymbols(highscore.playerName, y);
            this.makeScoreSymbols(highscore.score, y);
        }
    }

    private makeScoreSymbols(score: number, y: number) {
        const scoreElements = [];
        for (let i = 0; i < SCORE_ELEMENTS_COUNT; i++) {
            const el = new SymbolElement({
                x:
                    HIGHSCORES_SCORE_LEFT_OFFSET +
                    i * (SYMBOL_ELEMENT_WIDTH + HIGHSCORE_ELEMENT_GAP),
                y: y,
            });
            scoreElements.push(el);
        }
        loadNumberToElements(scoreElements, score);

        this.elements.push(...scoreElements);
    }

    private makeNameSymbols(name: string, y: number) {
        for (let i = 0; i < name.length; i++) {
            const symbol = name[i];
            const el = new SymbolElement({
                x:
                    HIGHSCORES_NAME_LEFT_OFFSET +
                    i * (SYMBOL_ELEMENT_WIDTH + HIGHSCORE_ELEMENT_GAP),
                y: y,
            });
            el.changeSymbol(symbol);
            this.elements.push(el);
        }
    }

    render() {
        Renderer.render(this.background);
        for (const se of this.elements) {
            Renderer.render(se);
        }
    }
}
