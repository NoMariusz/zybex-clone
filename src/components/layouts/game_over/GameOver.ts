import { Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { Keys } from "../../controls/constants";
import GameOverElement from "./GameOverElement";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import SoundPlayer from "../../sounds/SoundPlayer";
import { Sound } from "../../sounds/constants";
import WavingTrianglesBlock from "../../rendering/utils/waving_triangle/WavingTrianglesBlock";

export default class GameOver extends LayoutBaseImplementation {
    background: GameOverElement;
    trianglesBlock: WavingTrianglesBlock;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.background = new GameOverElement();
    }

    render() {
        Renderer.render(this.background);
        this.trianglesBlock.render();
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.changeLayout(Layouts.SAVE_SCORE);
        }
    }

    onShow() {
        this.trianglesBlock = new WavingTrianglesBlock();
        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
        SoundPlayer.play(Sound.GamOver);
    }
    onHide() {
        this.trianglesBlock.clear();
    }
}
