import { Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import AnnounceBackground from "./AnnounceElement";
import Renderer from "../../rendering/Renderer";
import { Keys } from "../../controls/constants";
import LayoutBaseImplementation from "../LayoutBaseImplementation";

export default class LevelAnnounce extends LayoutBaseImplementation {
    announceBackground: AnnounceBackground;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.announceBackground = new AnnounceBackground();
    }

    render() {
        Renderer.render(this.announceBackground);
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.changeLayout(Layouts.GAME);
        }
    }

    onShow() {
        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
    }
    onHide() {}
}
