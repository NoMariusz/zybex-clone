import { Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
    LEVEL_TEXTURE_FULL_WIDTH,
    LEVEL_TEXTURE_SCALE,
    PLAYFIELD_SCROLL_SPEED,
} from "../constants";
import Player from "../player/Player";
import PlayfieldCollider from "./PlayfieldCollider";
import PlayfieldElement from "./PlayfieldElement";

export default class PlayfieldManager implements Renderable {
    playfieldElement: PlayfieldElement;
    playfieldCollider: PlayfieldCollider;

    constructor(private players: Player[]) {
        this.playfieldElement = new PlayfieldElement();
        this.playfieldCollider = new PlayfieldCollider();
    }

    render() {
        this.scroll();
        for (const player of this.players) {
            this.checkCollision(player);
        }
        Renderer.render(this.playfieldElement);
    }

    scroll() {
        this.playfieldElement.texture_offset.x += PLAYFIELD_SCROLL_SPEED;
        // to show something when level texture ended and detect that event
        if (this.playfieldElement.texture_offset.x > LEVEL_TEXTURE_FULL_WIDTH) {
            this.playfieldElement.texture_offset.x =
                -this.playfieldElement.size.width * LEVEL_TEXTURE_SCALE;
            this.onLevelEnded();
        }
    }

    checkCollision(player: Player) {
        const { pos, size } = this.getPlayerLevelImagePosition(player);
        const res = this.playfieldCollider.checkCollision(pos, size);
        if (res) {
            player.takeDamage();
        }
    }

    getPlayerLevelImagePosition(player: Player) {
        /**
         * calculate and tranform player position and size to position and size on level image
         * @return: {pos: Position, size: Size}
         */
        // get base values
        const pos = { ...player.position };
        const size = { ...player.size };
        //tranform them
        pos.x = Math.round(
            pos.x * LEVEL_TEXTURE_SCALE + this.playfieldElement.texture_offset.x
        );
        pos.y = Math.round(pos.y * LEVEL_TEXTURE_SCALE);
        size.width = Math.round(size.width * LEVEL_TEXTURE_SCALE);
        size.height = Math.round(size.height * LEVEL_TEXTURE_SCALE);
        return { pos, size };
    }

    onLevelEnded() {
        /* Make all necessary stuff, like play endgame animation, change screen */
    }
}
