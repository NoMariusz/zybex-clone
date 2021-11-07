import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { Keys } from "../../controls/constants";
import SummatyBackgroundElement from "./SummaryBackgrounElement";
import { sleep } from "../../utils";
import SummaryNumberElement from "./SummaryNumberElement";
import {
    SUMMARY_LIVES_ELEMENTS_COUNT,
    SUMMARY_LIVES_X,
    SUMMARY_SCORE_ELEMENTS_COUNT,
    SUMMARY_SCORE_X,
} from "./constans";
import store from "../store";

export default class LevelSummary implements Layout {
    changeLayout: (layName: Layouts) => void;
    keyListener: KeyListener;
    active = false;
    score: number;
    lives: number;

    scoreElements: SummaryNumberElement[];
    livesElements: SummaryNumberElement[];

    //items
    background: SummatyBackgroundElement;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        this.changeLayout = (s) => changeLayout(s);
        this.keyListener = keyListener;

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
            this.changeLayout(Layouts.MENU);
        }
    }

    // initializing

    initScoreElements() {
        this.scoreElements = [];
        for (let idx = 0; idx < SUMMARY_SCORE_ELEMENTS_COUNT; idx++) {
            const el = new SummaryNumberElement();
            el.position.x = SUMMARY_SCORE_X + idx * 65;
            this.scoreElements.push(el);
        }
    }

    initLivesElements() {
        this.livesElements = [];
        for (let idx = 0; idx < SUMMARY_LIVES_ELEMENTS_COUNT; idx++) {
            const el = new SummaryNumberElement();
            el.position.x = SUMMARY_LIVES_X + idx * 65;
            this.livesElements.push(el);
        }
    }

    // score calculating animation

    async calcScore() {
        // load statistics from store
        this.score = store.levelScore;
        this.lives = store.livesAfterLevel;

        while (this.active && this.lives > 0) {
            await sleep(300);
            this.lives--;
            this.score += 100;
        }
        this.active = false;
    }

    refreshNumbers() {
        this.loadLives();
        this.loadScore();
    }

    loadScore() {
        for (let idx = 0; idx < SUMMARY_SCORE_ELEMENTS_COUNT; idx++) {
            const element = this.scoreElements[idx];
            const divider = Math.pow(
                10,
                SUMMARY_SCORE_ELEMENTS_COUNT - 1 - idx
            );
            const rest = Math.floor(this.score / divider);
            const num = rest % 10;
            element.changeNum(num);
        }
    }

    loadLives() {
        for (let idx = 0; idx < SUMMARY_LIVES_ELEMENTS_COUNT; idx++) {
            const element = this.livesElements[idx];
            const divider = Math.pow(
                10,
                SUMMARY_LIVES_ELEMENTS_COUNT - 1 - idx
            );
            const rest = Math.floor(this.lives / divider);
            const num = rest % 10;
            element.changeNum(num);
        }
    }
}
