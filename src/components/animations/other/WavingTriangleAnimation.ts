import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class WavingTriangleAnimation extends FrameAnimation {
    name = AnimationName.TriangleWaving;
    tickIntervalTime = 120;

    textures: Position[] = [
        { x: 0, y: 7803 },
        { x: 532, y: 7803 },
        { x: 1064, y: 7803 },
        { x: 0, y: 8066 },
        { x: 532, y: 8066 },
        { x: 1064, y: 8066 },
        { x: 0, y: 8329 },
        { x: 532, y: 8329 },
        { x: 1064, y: 8329 },
        { x: 0, y: 8592 },
    ];
}
