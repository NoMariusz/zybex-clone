import Animation from "./Animation";
import ImmortalityAnimation from "./player/ImmortalityAnimation";
import DeathAnimation from "./player/DeathAnimation";
import { CanvasElement } from "../../../rendering/interfaces";
import FrameAnimation from "./FrameAnimation";
import { AnimationName } from "./animationNames";
import CoinIddleAnimation from "./enemies/CoinIddleAnimation";
import EnemyDeathAnimation from "./enemies/EnemyDeathAnimation";
import BirdIddleAnimation from "./enemies/BirdIddleAnimation";
import DragonflyIddleAnimation from "./enemies/DragonflyIddleAnimation";
import ButterflyIddleAnimation from "./enemies/ButterflyIddle";
import FiverIddleAnimation from "./enemies/FiverIddleAnimation";

export default class Animator {
    /* Handle starting and ending animations and protect animations from overlaping */
    element: CanvasElement;

    // list of animation in sorted by importance
    animations: Animation[];

    constructor(element: CanvasElement) {
        this.element = element;

        this.animations = [
            new DeathAnimation(this.element),
            new ImmortalityAnimation(this.element),
            new EnemyDeathAnimation(this.element),
            new CoinIddleAnimation(this.element),
            new BirdIddleAnimation(this.element),
            new DragonflyIddleAnimation(this.element),
            new ButterflyIddleAnimation(this.element),
            new FiverIddleAnimation(this.element),
        ];
    }

    getAnimByName(name: AnimationName) {
        return this.animations.find((a) => a.name == name);
    }

    startAnim(name: AnimationName) {
        /**
         * @returns number - animation playtime
         */
        const anim = this.getAnimByName(name);
        if (!anim) return;

        anim.start();
        anim.active = true;

        anim.interval = setInterval(() => {
            if (this.checkIfCanPlay(anim.name)) anim.tick();
        }, anim.tickIntervalTime);

        return this.getAnimTime(anim);
    }

    endAnim(name: AnimationName) {
        const anim = this.getAnimByName(name);
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
        const animIdx = this.animations.findIndex((a) => a.name == animName);
        const idx = this.animations.findIndex(
            (anim, i) => anim.active && i < animIdx
        );

        return idx == -1;
    }

    getAnimTime(anim: Animation) {
        return anim instanceof FrameAnimation ? anim.animTime : Infinity;
    }
}
