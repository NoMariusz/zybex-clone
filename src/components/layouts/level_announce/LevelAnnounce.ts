import { Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import AnnounceBackground from "./AnnounceElement";
import Renderer from "../../rendering/Renderer";
import { Keys } from "../../controls/constants";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import SoundPlayer from "../../sounds/SoundPlayer";
import { Sound } from "../../sounds/constants";
import DoubleWavingTrianglesBlock from "../../rendering/utils/waving_triangle/WavingTrianglesBlock";

export default class LevelAnnounce extends LayoutBaseImplementation {
    announceBackground: AnnounceBackground;
    trianglesBlock: DoubleWavingTrianglesBlock;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.announceBackground = new AnnounceBackground();
    }

    render() {
        Renderer.render(this.announceBackground);
        this.trianglesBlock.render();
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.changeLayout(Layouts.GAME);
        }
    }

    onShow() {
        this.trianglesBlock = new DoubleWavingTrianglesBlock();
        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);

        SoundPlayer.play(Sound.LevelAnnounce);
    }

    onHide() {
        this.trianglesBlock.clear();
    }
}
