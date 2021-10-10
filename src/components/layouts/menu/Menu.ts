import Renderer from "../../rendering/Renderer";
import { Layout } from "../interfaces";
import { CHANGE_LAYOUT_TIMEOUT } from "./constants";
import MenuBackground from "./layout_items/MenuBackground";

export default class Menu implements Layout {
    changeLayout: (layName: string) => void;

    actualPage: number;
    changePageInterval: NodeJS.Timer;

    // items
    background: MenuBackground;

    constructor(changeLayout: (layName: string) => void) {
        this.changeLayout = changeLayout;
        this.actualPage = 1;

        this.background = new MenuBackground();
    }

    render() {
        Renderer.render(this.background);
    }

    onShow() {
        this.actualPage = 1;
        this.changePageInterval = setInterval(
            () => this.changePage(),
            CHANGE_LAYOUT_TIMEOUT
        );
    }

    onHide() {
        clearInterval(this.changePageInterval);
    }

    changePage() {
        this.actualPage = this.actualPage == 1 ? 2 : 1;
        this.background.changeTexture(this.actualPage);
    }
}
