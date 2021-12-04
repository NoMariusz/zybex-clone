import { TextureSpriteSheets } from "./constants";

export default class RendererImage {
    /* Represents image data in renderer */
    name: TextureSpriteSheets;
    image: HTMLImageElement;

    constructor(imgName: TextureSpriteSheets, imageData: string) {
        this.name = imgName;

        this.image = new Image();
        this.image.src = imageData;
    }
}
