import { Keys } from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Position, Renderable } from "../../../interfaces";
import { PLAYER_SPEED } from "../constants";

export default class MoveManager implements Renderable {
    constructor(
        public position: Position,
        private updatePosCallback: (pos: Position) => void
    ) {}

    render() {
        this.movePlayer();
    }

    private movePlayer() {
        this.updatePosCallback(this.getPlayerNewPos());
    }

    private getPlayerNewPos(): Position {
        const velocity: Position = {
            x:
                Number(pressedKeys[Keys.LEFT]) * -1 +
                Number(pressedKeys[Keys.RIGHT]) * 1,
            y:
                Number(pressedKeys[Keys.UP]) * -1 +
                Number(pressedKeys[Keys.DOWN]) * 1,
        };
        return {
            x: this.position.x + velocity.x * PLAYER_SPEED,
            y: this.position.y + velocity.y * PLAYER_SPEED,
        };
    }
}
