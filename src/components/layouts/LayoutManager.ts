import KeyListener from "../controls/KeyListener";
import { Renderable } from "../interfaces";
import { Layout, Layouts } from "./interfaces";
import LevelAnnounce from "./level_announce/LevelAnnounce";
import Menu from "./menu/Menu";
import Game from "./game/Game";
import LevelSummary from "./level_summary/LevelSummary";
import GameOver from "./game_over/GameOver";
import SaveScore from "./score_save/SaveScore";
import LayoutBaseImplementation from "./LayoutBaseImplementation";

export default class LayoutManager implements Renderable {
    /* Manage swaps between layouts and controlling them */

    layouts: { [key in Layouts]: Layout };
    activeLayout: Layout;
    keyListener: KeyListener;

    constructor() {
        this.keyListener = new KeyListener();

        this.layouts = {
            [Layouts.MENU]: this.makeLayoutInst(Menu),
            [Layouts.LEVEL_ANNOUNCE]: this.makeLayoutInst(LevelAnnounce),
            [Layouts.GAME]: this.makeLayoutInst(Game),
            [Layouts.LEVEL_SUMMARY]: this.makeLayoutInst(LevelSummary),
            [Layouts.GAME_OVER]: this.makeLayoutInst(GameOver),
            [Layouts.SAVE_SCORE]: this.makeLayoutInst(SaveScore),
        };

        this.activeLayout = this.layouts[Layouts.MENU];
        this.activeLayout.onShow();
    }

    makeLayoutInst(layoutClass: typeof LayoutBaseImplementation) {
        return new layoutClass(
            (name: Layouts) => this.changeLayout(name),
            this.keyListener
        );
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
