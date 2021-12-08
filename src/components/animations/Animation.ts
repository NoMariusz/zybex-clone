import CanvasElement from "../rendering/CanvasElement";
import { AnimationName } from "./animationNames";

export default interface Animation {
    name: AnimationName;
    active: boolean;

    tickIntervalTime: number;

    interval: NodeJS.Timer;

    element: CanvasElement;

    tick: () => void;
    start: () => void;
    end: () => void;
}

// prepare simple implementation to get class type singature
class AnimationImpl implements Animation {
    name: AnimationName;
    active: boolean;

    tickIntervalTime: number;

    interval: NodeJS.Timer;

    element: CanvasElement;

    tick: () => void;
    start: () => void;
    end: () => void;

    constructor(element: CanvasElement) {}
}

export type AnimationClass = typeof AnimationImpl;
