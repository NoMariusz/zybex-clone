import { CANVAS_HEIGHT, CANVAS_WIDTH, TEXTURE_SCALE } from "../../constants";
import { CanvasElement } from "./interfaces";
import RendererImage from "./RendererImage";

import menuBackground1 from "../../../static/gfx/menu/background_1.png";
import menuBackground2 from "../../../static/gfx/menu/background_2.png";

const images: RendererImage[] = [
    new RendererImage(
        "menu_background_1",
        menuBackground1
    ),
    new RendererImage(
        "menu_background_2",
        menuBackground2
    )
];

class Renderer {
    /* Handle all rendering images at canvas */
    
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.querySelector("#root");
        this.context = this.canvas.getContext("2d");
    }

    render(target: CanvasElement) {
        const image = images.find((i) => i.name == target.texture);

        this.context.drawImage(
            image.image,
            target.texture_offset.x,
            target.texture_offset.y,
            target.size.width / TEXTURE_SCALE,
            target.size.height / TEXTURE_SCALE,
            target.position.x,
            target.position.y,
            target.size.width,
            target.size.height
        );
    }

    clear() {
        this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

export default new Renderer();
