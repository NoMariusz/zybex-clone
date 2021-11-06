import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { Keys } from "../../controls/constants";
import GameOverElement from "./GameOverElement";

export default class GameOver implements Layout {
    changeLayout: (layName: Layouts) => void;
    keyListener: KeyListener;

    //items
    background: GameOverElement;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        this.changeLayout = (s) => changeLayout(s);
        this.keyListener = keyListener;

        this.background = new GameOverElement();
    }

    render() {
        Renderer.render(this.background);
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.changeLayout(Layouts.MENU);
        }
    }

    onShow() {
        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
    }
    onHide() {}
}
