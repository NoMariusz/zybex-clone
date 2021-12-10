import {
    Keys,
    KEY_TO_PLAYER_ACTION,
    PLAYER_TYPE_TO_SUPPORTED_KEYS,
} from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Renderable } from "../../../interfaces";
import { AnimationName } from "../../../animating/animationNames";
import Animator from "../../../animating/Animator";
import { PlayerAction, PlayerType } from "../constants";

const ACTION_TO_ANIM: { [key in PlayerAction]?: AnimationName } = {
    [PlayerAction.MoveUp]: AnimationName.PlayerMoveUp,
    [PlayerAction.MoveDown]: AnimationName.PlayerMoveDown,
    [PlayerAction.MoveRight]: AnimationName.PlayerMoveForward,
    [PlayerAction.MoveLeft]: AnimationName.PlayerMoveBackward,
};

export default class MoveAnimationManager implements Renderable {
    animator: Animator;
    locked: boolean = false;
    supportedKeys: Keys[];

    constructor(animator: Animator, private playerType: PlayerType) {
        this.animator = animator;
        this.supportedKeys = PLAYER_TYPE_TO_SUPPORTED_KEYS[this.playerType];
    }

    render() {
        for (const key of this.supportedKeys) {
            const mappedKey = key as Keys;
            const action = KEY_TO_PLAYER_ACTION[mappedKey];
            const animName = ACTION_TO_ANIM[action];

            if (!animName) continue;

            if (pressedKeys[mappedKey] && !this.locked) {
                this.animator.safeStartAnim(animName);
            } else {
                this.animator.endAnim(animName);
            }
        }
    }
}
