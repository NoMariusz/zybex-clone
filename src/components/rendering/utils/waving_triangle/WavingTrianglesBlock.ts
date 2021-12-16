import { CANVAS_WIDTH } from "../../../../constants";
import { AnimationName } from "../../../animating/animationNames";
import Animator from "../../../animating/Animator";
import SafeAnimatorsStore from "../../../animating/utils/SafeAnimatorsStore";
import { Position, Renderable } from "../../../interfaces";
import { WAVING_TRIANGLE_WIDTH } from "../../constants";
import Renderer from "../../Renderer";
import WavingTriangleElement from "./WavingTriangleElement";

export default class WavingTrianglesBlock
    extends SafeAnimatorsStore
    implements Renderable
{
    wavingTriangles: WavingTriangleElement[] = [];

    constructor() {
        super();
        this.intTriangles();
    }

    private intTriangles() {
        for (let i = 0; i < 2; i++) {
            const position = {
                x: (CANVAS_WIDTH - WAVING_TRIANGLE_WIDTH) / 2,
                y: i == 0 ? 75 : 555,
            };
            const flip = i == 0;
            this.intTriangle(position, flip);
        }
    }

    private intTriangle(pos: Position, flip: boolean) {
        const triangle = new WavingTriangleElement(pos, flip);
        this.wavingTriangles.push(triangle);
        const animator = new Animator(triangle);
        animator.startAnim(
            flip
                ? AnimationName.ReverseTriangleWaving
                : AnimationName.TriangleWaving
        );
        this.animators.push(animator);
    }

    render() {
        for (const triangle of this.wavingTriangles) {
            Renderer.render(triangle);
        }
    }
}
