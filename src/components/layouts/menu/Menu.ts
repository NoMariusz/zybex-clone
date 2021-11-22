import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { Layout, Layouts } from "../interfaces";
import BottomPanel from "./BottomPanel";
import { CHANGE_LAYOUT_TIMEOUT } from "./constants";
import MenuBackground from "./layout_items/MenuBackground";
import store from "../store";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import { BASE_PLAYER_LIVES } from "../game/constants";

export default class Menu extends LayoutBaseImplementation {
    actualPage: number;
    changePageInterval: NodeJS.Timer;

    // items
    bottomPanel: BottomPanel;
    // elements
    background: MenuBackground;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);
        this.actualPage = 0;

        this.bottomPanel = new BottomPanel(() => this.startGame());
        this.background = new MenuBackground();
    }

    render() {
        Renderer.render(this.background);
        this.bottomPanel.render();
    }

    onShow() {
        this.keyListener.subscribedFunc = (e: string) =>
            this.bottomPanel.handleKeys(e);
        this.actualPage = 0;
        this.changePageInterval = setInterval(
            () => this.changePage(),
            CHANGE_LAYOUT_TIMEOUT
        );
        this.changePage();
    }

    onHide() {
        clearInterval(this.changePageInterval);
        this.bottomPanel.clear();
    }

    changePage() {
        this.actualPage = this.actualPage == 0 ? 1 : 0;
        this.background.changeTexture(this.actualPage);
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
    }
}
