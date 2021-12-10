import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { Keys } from "../../controls/constants";
import SummatyBackgroundElement from "./SummaryBackgrounElement";
import { loadNumberToElements, sleep } from "../../utils";
import {
    SUMMARY_LIVES_ELEMENTS_COUNT,
    SUMMARY_LIVES_X,
    SUMMARY_NUMBERS_Y,
    SUMMARY_SCORE_X,
} from "./constans";
import store from "../store";
import SymbolElement from "../../rendering/utils/SymbolElement";
import { SCORE_ELEMENTS_COUNT } from "../../../constants";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import SoundPlayer from "../../sounds/SoundPlayer";
import { Sound } from "../../sounds/constants";
import { SYMBOL_ELEMENT_WIDTH } from "../../rendering/constants";

export default class LevelSummary extends LayoutBaseImplementation {
    active = false;
    scores: number[];
    fuelCounts: number[];

    scoreElements: SymbolElement[];
    livesElements: SymbolElement[];

    //items
    background: SummatyBackgroundElement;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.background = new SummatyBackgroundElement();
        this.initLivesElements();
        this.initScoreElements();
    }

    // lifecycle

    onShow() {
        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
        this.active = true;
        this.calcScore();
    }

    onHide() {
        this.active = false;
    }

    render() {
        this.refreshNumbers();
        Renderer.render(this.background);
        for (const el of [...this.scoreElements, ...this.livesElements]) {
            Renderer.render(el);
        }
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.goToNextLevel();
        }
    }

    goToNextLevel() {
        if (this.active) this.calcScore(true);
        store.levelScores = this.scores;
        store.fuelScores = [0, 0];
        this.changeLayout(Layouts.LEVEL_ANNOUNCE);
    }

    // initializing

    initScoreElements() {
        this.scoreElements = [];
        for (let idx = 0; idx < SCORE_ELEMENTS_COUNT; idx++) {
            const el = new SymbolElement({
                x: SUMMARY_SCORE_X + idx * (SYMBOL_ELEMENT_WIDTH + 5),
                y: SUMMARY_NUMBERS_Y,
            });
            this.scoreElements.push(el);
        }
    }

    initLivesElements() {
        this.livesElements = [];
        for (let idx = 0; idx < SUMMARY_LIVES_ELEMENTS_COUNT; idx++) {
            const el = new SymbolElement({
                x: SUMMARY_LIVES_X + idx * (SYMBOL_ELEMENT_WIDTH + 5),
                y: SUMMARY_NUMBERS_Y,
            });
            this.livesElements.push(el);
        }
    }

    // score calculating animation

    async calcScore(force = false) {
        // load statistics from store
        this.scores = store.levelScores;
        this.fuelCounts = store.fuelScores;
        while (this.active && this.fuelCounts.some((n) => n > 0)) {
            for (let i = 0; i < this.scores.length; i++) {
                if (!force) await sleep(300);
                this.fuelCounts[i]--;
                this.scores[i] += 100;
                SoundPlayer.play(Sound.CalculatePoints);
            }
        }
        this.active = false;
        SoundPlayer.play(Sound.CalculatePointsEnd);
    }

    refreshNumbers() {
        loadNumberToElements(
            this.scoreElements,
            this.scores.reduce((p, n) => p + n)
        );
        loadNumberToElements(
            this.livesElements,
            this.fuelCounts.reduce((p, n) => p + n)
        );
    }
}
