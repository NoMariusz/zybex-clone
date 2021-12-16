import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";
import RendererImage from "./RendererImage";

import mainSprite from "../../../static/gfx/main_sprite_sheet.png";
import levelSprite from "../../../static/gfx/level_sprite.png";
import { TextureSpriteSheets } from "./constants";
import CanvasElement from "./CanvasElement";

const images: RendererImage[] = [
    new RendererImage(TextureSpriteSheets.Main, mainSprite),
    new RendererImage(TextureSpriteSheets.BertolusLevel, levelSprite),
];

class Renderer {
    /* Handle all rendering images at canvas */

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.loadContext();
    }

    loadContext() {
        const canvas = document.querySelector("#root");
        if (!canvas) throw new Error(`Can't find canvas`);
        this.canvas = canvas as HTMLCanvasElement;

        const context = this.canvas.getContext("2d");
        if (!context) throw new Error(`Can't get context from canvas`);
        this.context = context;
    }

    render(target: CanvasElement) {
        // draw
        if (target.texture_size) {
            this.drawWithScale(target);
        } else {
            this.draw(target);
        }
    }

    clear() {
        this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    getImage(name: TextureSpriteSheets) {
        const image = images.find((i) => i.name == name);
        if (!image) throw new Error(`Can't find ${name} image in images`);
        return image;
    }

    draw(target: CanvasElement) {
        const image = this.getImage(target.texture);

        this.context.drawImage(
            image.image,
            target.texture_offset.x,
            target.texture_offset.y,
            target.size.width,
            target.size.height,
            target.position.x,
            target.position.y,
            target.size.width,
            target.size.height
        );
    }

    drawWithScale(target: CanvasElement) {
        if (!target.texture_size) throw new Error("Try to draw ");

        const image = this.getImage(target.texture);

        this.context.drawImage(
            image.image,
            target.texture_offset.x,
            target.texture_offset.y,
            target.texture_size.width,
            target.texture_size.height,
            target.position.x,
            target.position.y,
            target.size.width,
            target.size.height
        );
    }
}

export default new Renderer();
