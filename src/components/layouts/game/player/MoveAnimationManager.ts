import { Keys } from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Renderable } from "../../../interfaces";
import { AnimationName } from "../../../animations/animationNames";
import Animator from "../../../animations/Animator";

const KEY_TO_ANIM: { [key in Keys]?: AnimationName } = {
    [Keys.UP]: AnimationName.PlayerMoveUp,
    [Keys.DOWN]: AnimationName.PlayerMoveDown,
    [Keys.RIGHT]: AnimationName.PlayerMoveForward,
    [Keys.LEFT]: AnimationName.PlayerMoveBackward,
};

export default class MoveAnimationManager implements Renderable {
    animator: Animator;
    locked: boolean = false;

    constructor(animator: Animator) {
        this.animator = animator;
    }

    render() {
        for (const key in KEY_TO_ANIM) {
            const mappedKey = key as Keys;
            const animName = KEY_TO_ANIM[mappedKey];

            if (!animName) continue;

            if (pressedKeys[mappedKey] && !this.locked) {
                this.animator.safeStartAnim(animName);
            } else {
                this.animator.endAnim(animName);
            }
        }
    }
}
