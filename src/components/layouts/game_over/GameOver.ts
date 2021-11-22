import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { Keys } from "../../controls/constants";
import GameOverElement from "./GameOverElement";
import LayoutBaseImplementation from "../LayoutBaseImplementation";

export default class GameOver extends LayoutBaseImplementation {
    background: GameOverElement;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.background = new GameOverElement();
    }

    render() {
        Renderer.render(this.background);
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.changeLayout(Layouts.SAVE_SCORE);
        }
    }

    onShow() {
        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
    }
    onHide() {}
}
