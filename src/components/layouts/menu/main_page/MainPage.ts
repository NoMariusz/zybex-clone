import { Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import MainBackground from "./MainBackground";

export default class MainPage implements Renderable {
    background: MainBackground;

    constructor() {
        this.background = new MainBackground();
    }

    render() {
        Renderer.render(this.background);
    }
}
