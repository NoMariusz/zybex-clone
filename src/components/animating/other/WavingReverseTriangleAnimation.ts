import CanvasElement from "../../rendering/CanvasElement";
import WavingTriangleAnimation from "./WavingTriangleAnimation";

const REVERSE_WAVING_ANIMATION_Y_OFFSET = 1052;

export default class WavingReverseTriangleAnimation extends WavingTriangleAnimation {
    constructor(element: CanvasElement) {
        super(element);
        // map textures to reverse triangle by y offset
        this.textures = this.textures.map((t) => ({
            ...t,
            y: t.y + REVERSE_WAVING_ANIMATION_Y_OFFSET,
        }));
    }
}
