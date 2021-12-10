import {
    Keys,
    KEY_TO_PLAYER_ACTION,
    PLAYER_TYPE_TO_SUPPORTED_KEYS,
} from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Position, Renderable } from "../../../interfaces";
import { PlayerAction, PlayerType, PLAYER_SPEED } from "../constants";

export default class MoveManager implements Renderable {
    constructor(
        public position: Position,
        private updatePosCallback: (pos: Position) => void,
        private playerType: PlayerType
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
                Number(this.getPressedKeyState(PlayerAction.MoveLeft)) * -1 +
                Number(this.getPressedKeyState(PlayerAction.MoveRight)) * 1,
            y:
                Number(this.getPressedKeyState(PlayerAction.MoveUp)) * -1 +
                Number(this.getPressedKeyState(PlayerAction.MoveDown)) * 1,
        };
        return {
            x: this.position.x + velocity.x * PLAYER_SPEED,
            y: this.position.y + velocity.y * PLAYER_SPEED,
        };
    }

    private getPressedKeyState(action: PlayerAction) {
        // find key responsible for given action for
        const foundKey = Object.keys(KEY_TO_PLAYER_ACTION).find(
            (key) =>
                PLAYER_TYPE_TO_SUPPORTED_KEYS[this.playerType].includes(
                    key as Keys
                ) && KEY_TO_PLAYER_ACTION[key as Keys] == action
        );

        return foundKey ? pressedKeys[foundKey as Keys] : 0;
    }
}
