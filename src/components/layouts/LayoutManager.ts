import KeyListener from "../controls/KeyListener";
import { Renderable } from "../interfaces";
import { Layout, Layouts } from "./interfaces";
import LevelAnnounce from "./level_announce/LevelAnnounce";
import Menu from "./menu/Menu";
import Game from "./game/Game";
import LevelSummary from "./level_summary/LevelSummary";
import GameOver from "./game_over/GameOver";
import SaveScore from "./score_save/SaveScore";

export default class LayoutManager implements Renderable {
    /* Manage swaps between layouts and controlling them */

    layouts: { [key in Layouts]: Layout };
    activeLayout: Layout;
    keyListener: KeyListener;

    constructor() {
        this.keyListener = new KeyListener();

        this.layouts = {
            [Layouts.MENU]: new Menu(
                (name: Layouts) => this.changeLayout(name),
                this.keyListener
            ),
            [Layouts.LEVEL_ANNOUNCE]: new LevelAnnounce(
                (name: Layouts) => this.changeLayout(name),
                this.keyListener
            ),
            [Layouts.GAME]: new Game(
                (name: Layouts) => this.changeLayout(name),
                this.keyListener
            ),
            [Layouts.LEVEL_SUMMARY]: new LevelSummary(
                (name: Layouts) => this.changeLayout(name),
                this.keyListener
            ),
            [Layouts.GAME_OVER]: new GameOver(
                (name: Layouts) => this.changeLayout(name),
                this.keyListener
            ),
            [Layouts.SAVE_SCORE]: new SaveScore(
                (name: Layouts) => this.changeLayout(name),
                this.keyListener
            ),
        };

        this.activeLayout = this.layouts[Layouts.MENU];
        this.activeLayout.onShow();
    }

    render() {
        this.activeLayout.render();
    }

    changeLayout(name: Layouts) {
        this.activeLayout.onHide();
        this.activeLayout = this.layouts[name];

        this.activeLayout.onShow();
    }
}
