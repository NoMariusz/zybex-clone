import { Position, Size } from "../../../interfaces";
import { TextureSpriteSheets } from "../../../rendering/constants";
import Renderer from "../../../rendering/Renderer";
import {
    LEVEL_TEXTURE_FULL_HEIGHT,
    LEVEL_TEXTURE_FULL_WIDTH,
    LEVEL_TEXTURE_SCALE,
    PLAYFIELD_COLLIDE_TOLERANCY,
} from "../constants";

export default class PlayfieldCollider {
    /* Detect collision with background */

    // pixel data of background image in original size
    imageData: ImageData;

    constructor() {
        this.loadImageData();
    }

    loadImageData() {
        // make in memory cavas to get context
        const canvas = document.createElement("canvas");
        canvas.width = LEVEL_TEXTURE_FULL_WIDTH;
        canvas.height = LEVEL_TEXTURE_FULL_HEIGHT;
        // get context
        const context = canvas.getContext("2d");
        if (!context) throw new Error(`Can't get context`);
        // get image
        const img = Renderer.getImage(TextureSpriteSheets.BertolusLevel).image;
        // draw image to context
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        //get image data
        this.imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    checkCollision(pos: Position, size: Size): boolean {
        /**
         * @param pos: Position - position of entity to check if collide, on level image
         * @param size: Size - size of that entity
         *
         * @return: boolean - tell if collide or not
         */

        // to check if collide, check how much green are pixels under entity
        let sumOfGreenValues = 0;

        // loop for every pixel position for colliding entity
        for (let x = pos.x; x < pos.x + size.width; x++) {
            for (let y = pos.y; y < pos.y + size.height; y++) {
                // get index of pixel green value for that position
                const [redI, greenI, blueI, alpaI] =
                    this.getColorIndicesForCoord(x, y);
                sumOfGreenValues += this.imageData.data[greenI];
            }
        }

        return sumOfGreenValues >= PLAYFIELD_COLLIDE_TOLERANCY;
    }

    getColorIndicesForCoord(x: number, y: number) {
        const red = y * (this.imageData.width * 4) + x * 4;
        return [red, red + 1, red + 2, red + 3];
    }
}
