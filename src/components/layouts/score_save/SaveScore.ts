import { SCORE_ELEMENTS_COUNT } from "../../../constants";
import { Keys } from "../../controls/constants";
import KeyListener from "../../controls/KeyListener";
import SymbolElement from "../../rendering/utils/SymbolElement";
import Renderer from "../../rendering/Renderer";
import { loadNumberToElements, safeChangeIndex } from "../../utils";
import { Layout, Layouts } from "../interfaces";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import store from "../store";
import {
    NAME_START_X,
    NAME_START_Y,
    NAME_SYMBOLS_COUNT,
    SCORE_START_X,
    SUPPORTED_SYMBOLS,
} from "./constants";
import ScoreBackgroundElement from "./ScoreBackgroundElement";
import HighscoreManager from "../../highscores/HighscoreManager";
import SoundPlayer from "../../sounds/SoundPlayer";
import { Sound } from "../../sounds/constants";
import { SymbolsTypes, SYMBOL_ELEMENT_WIDTH } from "../../rendering/constants";

export default class SaveScore extends LayoutBaseImplementation {
    activeSymbolIndex: number;

    background: ScoreBackgroundElement;
    symbolsData: { element: SymbolElement; value: string }[];
    scoreElements: SymbolElement[];

    // lifecycle

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.background = new ScoreBackgroundElement();
    }

    onHide() {}

    onShow() {
        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
        this.activeSymbolIndex = 0;
        this.initNameSymbols();
        this.initScoreElements();

        SoundPlayer.play(Sound.ScoreSave, true);
    }

    render() {
        Renderer.render(this.background);
        for (const { element } of this.symbolsData) {
            Renderer.render(element);
        }
        for (const element of this.scoreElements) {
            Renderer.render(element);
        }
    }

    // init

    initNameSymbols() {
        this.symbolsData = [];
        for (let i = 0; i < NAME_SYMBOLS_COUNT; i++) {
            const element = new SymbolElement(
                {
                    x: NAME_START_X + i * (SYMBOL_ELEMENT_WIDTH + 5),
                    y: NAME_START_Y,
                },
                SymbolsTypes.Green
            );
            element.changeSymbol("?");
            this.symbolsData.push({
                element,
                value: "?",
            });
        }
    }

    initScoreElements() {
        this.scoreElements = [];
        for (let i = 0; i < SCORE_ELEMENTS_COUNT; i++) {
            const el = new SymbolElement({
                x: SCORE_START_X + i * (SYMBOL_ELEMENT_WIDTH + 5),
                y: NAME_START_Y,
            });
            this.scoreElements.push(el);
        }

        loadNumberToElements(this.scoreElements, store.levelScore);
    }

    // actions

    handleKeys(key: string) {
        switch (key) {
            case Keys.ACTION:
                this.handleAction();
                break;
            case Keys.UP:
                this.changeSymbol(1);
                break;
            case Keys.DOWN:
                this.changeSymbol(-1);
                break;
        }
    }

    handleAction() {
        this.activeSymbolIndex++;
        if (this.activeSymbolIndex == NAME_SYMBOLS_COUNT) {
            this.endWork();
        }
    }

    changeSymbol(velocity: number) {
        const { element, value } = this.symbolsData[this.activeSymbolIndex];

        const valuei = SUPPORTED_SYMBOLS.findIndex((e) => value == e);
        const newi = safeChangeIndex(
            valuei,
            velocity,
            SUPPORTED_SYMBOLS.length - 1
        );

        const newSymbol = SUPPORTED_SYMBOLS[newi];
        element.changeSymbol(newSymbol);
        this.symbolsData[this.activeSymbolIndex].value = newSymbol;
    }

    // ending layout work

    saveScore() {
        const name = this.symbolsData.map((e) => e.value).join("");
        HighscoreManager.saveHighscore({
            playerName: name,
            score: store.levelScore,
        });
    }

    endWork() {
        this.saveScore();
        this.changeLayout(Layouts.MENU);
    }
}
