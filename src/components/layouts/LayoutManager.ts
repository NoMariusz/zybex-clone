import KeyListener from "../controls/KeyListener";
import { Renderable } from "../interfaces";
import { Layout, Layouts } from "./interfaces";
import LevelAnnounce from "./level_announce/LevelAnnounce";
import Menu from "./menu/Menu";
import Game from "./game/Game";
import LevelSummary from "./level_summary/LevelSummary";
import GameOver from "./game_over/GameOver";
import SaveScore from "./score_save/SaveScore";
import LayoutBaseImplementation, {
    LayoutClass,
} from "./LayoutBaseImplementation";
import SoundPlayer from "../sounds/SoundPlayer";

export default class LayoutManager implements Renderable {
    /* Manage swaps between layouts and controlling them */

    layouts: { [key in Layouts]: LayoutClass };
    activeLayout: Layout;
    keyListener: KeyListener;

    constructor() {
        this.keyListener = new KeyListener();

        this.layouts = {
            [Layouts.MENU]: Menu,
            [Layouts.LEVEL_ANNOUNCE]: LevelAnnounce,
            [Layouts.GAME]: Game,
            [Layouts.LEVEL_SUMMARY]: LevelSummary,
            [Layouts.GAME_OVER]: GameOver,
            [Layouts.SAVE_SCORE]: SaveScore,
        };

        this.activeLayout = this.makeLayoutInst(this.layouts[Layouts.MENU]);
        this.activeLayout.onShow();
    }

    makeLayoutInst(layoutClass: LayoutClass) {
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
        // to isolate sounds between layouts
        SoundPlayer.clearAllSounds();

        this.activeLayout = this.makeLayoutInst(this.layouts[name]);

        this.activeLayout.onShow();
    }
}
