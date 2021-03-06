import KeyListener from "../../controls/KeyListener";
import { Layouts } from "../interfaces";
import BottomPanel from "./bottom_panel/BottomPanel";
import { CHANGE_LAYOUT_TIMEOUT, Pages } from "./constants";
import store from "../store";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import { BASE_PLAYER_LIVES } from "../game/constants";
import MainPage from "./main_page/MainPage";
import HighscoresPage from "./highscores_page/HighscoresPage";
import SoundPlayer from "../../sounds/SoundPlayer";
import { Sound } from "../../sounds/constants";

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
        this.bottomPanel = new BottomPanel(() => this.startGame());
        this.mainPage = new MainPage();
        this.highscoresPage = new HighscoresPage();

        this.keyListener.subscribedFunc = (e: string) =>
            this.bottomPanel.handleKeys(e);
        this.actualPage = Pages.Main;
        this.changePageInterval = setInterval(
            () => this.changePage(),
            CHANGE_LAYOUT_TIMEOUT
        );

        SoundPlayer.play(Sound.MainTheme, true);
    }

    onHide() {
        clearInterval(this.changePageInterval);
        this.bottomPanel.clear();

        this.highscoresPage.clear();
        this.mainPage.clear();
    }

    private changePage() {
        this.actualPage =
            this.actualPage == Pages.Main ? Pages.Highscores : Pages.Main;
        this.bottomPanel.playInitAnim();
    }

    private startGame() {
        this.prepareStoreForGame();
        this.changeLayout(Layouts.LEVEL_ANNOUNCE);
    }

    private prepareStoreForGame() {
        store.avatarColors = [
            this.bottomPanel.avatar1.lastColor,
            this.bottomPanel.avatar2.lastColor,
        ];
        store.livesAfterLevel = [BASE_PLAYER_LIVES, BASE_PLAYER_LIVES];
        store.fuelScores = [0, 0];
        store.levelScores = [0, 0];
        store.weaponsDatas = [{}, {}];
        store.twoPlayersMode = this.bottomPanel.multiIco.isSelected;
    }
}
