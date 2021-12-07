import { SCORE_ELEMENTS_COUNT } from "../../../../constants";
import { AnimationName } from "../../../animations/animationNames";
import Animator from "../../../animations/Animator";
import HighscoreManager from "../../../highscores/HighscoreManager";
import { Renderable } from "../../../interfaces";
import {
    SymbolsTypes,
    SYMBOL_ELEMENT_WIDTH,
} from "../../../rendering/constants";
import Renderer from "../../../rendering/Renderer";
import SymbolElement from "../../../rendering/utils/SymbolElement";
import { loadNumberToElements } from "../../../utils";
import {
    HIGHSCORES_NAME_LEFT_OFFSET,
    HIGHSCORES_SCORE_LEFT_OFFSET,
    HIGHSCORES_TOP_OFFSET,
    HIGHSCORE_ELEMENT_GAP,
    HIGHSCORE_WIDTH,
    NUMBER_ONE_POSITION,
} from "../constants";
import HighscoresBackground from "./HighscoresBackground";

export default class HighscoresPage implements Renderable {
    background: HighscoresBackground;

    elements: SymbolElement[];
    animators: Animator[] = [];

    constructor() {
        this.background = new HighscoresBackground();
        this.loadHighscore();
    }

    render() {
        Renderer.render(this.background);
        for (const se of this.elements) {
            Renderer.render(se);
        }
    }

    loadHighscore() {
        this.elements = [];
        const highscores = HighscoreManager.getHighscores();

        for (let i = 0; i < highscores.length; i++) {
            const highscore = highscores[i];
            const y = HIGHSCORES_TOP_OFFSET + HIGHSCORE_WIDTH * i;

            this.makeNameSymbols(highscore.playerName, y, i == 0);
            this.makeScoreSymbols(highscore.score, y, i == 0);
        }
        this.initAnimatedNumberOne();
    }

    private makeScoreSymbols(score: number, y: number, emphasized: boolean) {
        const scoreElements = [];
        for (let i = 0; i < SCORE_ELEMENTS_COUNT; i++) {
            const el = new SymbolElement(
                {
                    x:
                        HIGHSCORES_SCORE_LEFT_OFFSET +
                        i * (SYMBOL_ELEMENT_WIDTH + HIGHSCORE_ELEMENT_GAP),
                    y: y,
                },
                SymbolsTypes.BlueNumber
            );
            scoreElements.push(el);

            if (emphasized) this.startAnim(el);
        }
        loadNumberToElements(scoreElements, score);

        this.elements.push(...scoreElements);
    }

    private makeNameSymbols(name: string, y: number, emphasized: boolean) {
        for (let i = 0; i < name.length; i++) {
            const symbol = name[i];
            const el = new SymbolElement(
                {
                    x:
                        HIGHSCORES_NAME_LEFT_OFFSET +
                        i * (SYMBOL_ELEMENT_WIDTH + HIGHSCORE_ELEMENT_GAP),
                    y: y,
                },
                SymbolsTypes.Blue
            );
            el.changeSymbol(symbol);
            this.elements.push(el);

            if (emphasized) this.startAnim(el);
        }
    }

    private initAnimatedNumberOne() {
        const el = new SymbolElement(
            { ...NUMBER_ONE_POSITION },
            SymbolsTypes.Blue
        );

        el.changeSymbol(1);
        this.startAnim(el);

        this.elements.push(el);
    }

    private startAnim(el: SymbolElement) {
        const animator = new Animator(el);
        animator.startAnim(AnimationName.RedSymbol);
        this.animators.push(animator);
    }

    clearAnimations() {
        for (const animator of this.animators) {
            animator.clearAnims();
        }
        this.animators = [];
    }
}
