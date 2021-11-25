import KeyListener from "../../controls/KeyListener";
import { Layouts } from "../interfaces";
import BottomPanel from "./bottom_panel/BottomPanel";
import { CHANGE_LAYOUT_TIMEOUT, Pages } from "./constants";
import store from "../store";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import { BASE_PLAYER_LIVES } from "../game/constants";
import MainPage from "./main_page/MainPage";
import HighscoresPage from "./highscores_page/HighscoresPage";

export default class Menu extends LayoutBaseImplementation {
    actualPage: Pages;
    changePageInterval: NodeJS.Timer;

    // items
    bottomPanel: BottomPanel;
    mainPage: MainPage;
    highscoresPage: HighscoresPage;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);
        this.actualPage = Pages.Main;

        this.bottomPanel = new BottomPanel(() => this.startGame());
        this.mainPage = new MainPage();
        this.highscoresPage = new HighscoresPage();
    }

    render() {
        switch (this.actualPage) {
            case Pages.Main:
                this.mainPage.render();
                break;
            case Pages.Highscores:
                this.highscoresPage.render();
                break;
        }
        this.bottomPanel.render();
    }

    onShow() {
        this.keyListener.subscribedFunc = (e: string) =>
            this.bottomPanel.handleKeys(e);
        this.actualPage = Pages.Main;
        this.changePageInterval = setInterval(
            () => this.changePage(),
            CHANGE_LAYOUT_TIMEOUT
        );
        this.changePage();

        // update scores in highscores
        this.highscoresPage.loadHighscore();
    }

    onHide() {
        clearInterval(this.changePageInterval);
        this.bottomPanel.clear();
    }

    changePage() {
        this.actualPage =
            this.actualPage == Pages.Main ? Pages.Highscores : Pages.Main;
        this.bottomPanel.playInitAnim();
    }

    startGame() {
        this.prepareStoreForGame();
        this.changeLayout(Layouts.LEVEL_ANNOUNCE);
    }

    prepareStoreForGame() {
        store.avatarColor = this.bottomPanel.avatar1.lastColor;
        store.livesAfterLevel = BASE_PLAYER_LIVES;
        store.fuelScores = 0;
        store.levelScore = 0;
        store.weaponsData = {};
    }
}
