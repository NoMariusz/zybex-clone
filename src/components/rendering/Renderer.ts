import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";
import RendererImage from "./RendererImage";

import mainSprite from "../../../static/gfx/main_sprite_sheet.png";
import levelSprite from "../../../static/gfx/level_sprite.png";
import { TextureSpriteSheets } from "./constants";
import CanvasElement from "./CanvasElement";

export const contextModification = (
    target: Renderer,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
        this.contextChanged = true;
        return original.apply(this, args);
    };
};

const images: RendererImage[] = [
    new RendererImage(TextureSpriteSheets.Main, mainSprite),
    new RendererImage(TextureSpriteSheets.BertolusLevel, levelSprite),
];

class Renderer {
    /* Handle all rendering images at canvas */

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    contextChanged: boolean = false;

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
        // save basic context so we can restore it after transforms
        this.context.save();

        // made effects
        if (target.flip) {
            this.flip(target);
        }
        if (target.flipY) {
            this.flipY(target);
        }

        // draw
        if (target.texture_size) {
            this.drawWithScale(target);
        } else {
            this.draw(target);
        }

        if (this.contextChanged) {
            // restore context to base configuration
            this.context.restore();
            this.contextChanged = false;
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

    @contextModification
    flip(target: CanvasElement) {
        // move context to right, so after scale target be in apropriate pos
        const translateAxis = (target.position.x + target.size.width / 2) * 2;
        this.context.translate(translateAxis, 0);

        // scale to have mirror effect
        this.context.scale(-1, 1);
    }

    @contextModification
    flipY(target: CanvasElement) {
        // move context to right, so after scale target be in apropriate pos
        const translateAxis = (target.position.y + target.size.height / 2) * 2;
        this.context.translate(0, translateAxis);

        // scale to have mirror effect
        this.context.scale(1, -1);
    }
}

export default new Renderer();
