import Animation from "./Animation";
import FrameAnimation from "./utils/FrameAnimation";
import { AnimationName } from "./animationNames";
import CanvasElement from "../rendering/CanvasElement";
import animationConfig from "./animationConfig";

export default class Animator {
    /* Handle starting and ending animations and protect animations from overlaping */
    element: CanvasElement;

    // list of animation in sorted by importance
    animations: Animation[];

    constructor(element: CanvasElement) {
        this.element = element;

        this.animations = [];
    }

    receiveAnimation(name: AnimationName) {
        // try to find and return already created anim
        const createdAnim = this.animations.find((a) => a.name == name);
        if (createdAnim) return createdAnim;
        // create new anim and save in animations
        const anim = new animationConfig[name].class(this.element);
        this.animations.push(anim);
        return anim;
    }

    private playAnim(anim: Animation) {
        /**
         * @returns number - animation playtime
         */
        anim.start();
        anim.active = true;

        anim.interval = setInterval(() => {
            if (this.checkIfCanPlay(anim.name)) anim.tick();
        }, anim.tickIntervalTime);

        return this.getAnimTime(anim);
    }

    startAnim(name: AnimationName) {
        /**
         * Start animation in normal mode
         */
        const anim = this.receiveAnimation(name);
        if (!anim) return;

        return this.playAnim(anim);
    }

    safeStartAnim(name: AnimationName) {
        /**
         * Start animation only if is not active
         */
        const anim = this.receiveAnimation(name);
        if (!anim || anim.active) return;

        return this.playAnim(anim);
    }

    endAnim(name: AnimationName) {
        const anim = this.receiveAnimation(name);
        if (!anim) return;

        if (anim.active) {
            anim.end();
            anim.active = false;
        }

        clearInterval(anim.interval);
    }

    clearAnims() {
        for (const anim of this.animations) {
            this.endAnim(anim.name);
        }
    }

    checkIfCanPlay(animName: AnimationName) {
        /* Check if animation can play, so check if there is active
        animation that is more important */
        const animationPriority = animationConfig[animName].priority;
        // try to find animation with higher priority
        const idx = this.animations.findIndex(
            (anim) =>
                anim.active &&
                animationConfig[anim.name].priority > animationPriority
        );

        return idx == -1;
    }

    getAnimTime(anim: Animation) {
        return anim instanceof FrameAnimation ? anim.animTime : Infinity;
    }
}
