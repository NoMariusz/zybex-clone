import { Position } from "../../../../../../interfaces";
import CanvasElement from "../../../../../../rendering/CavnasElement";

const stageToTexture = [
    { x: 0, y: 700 },
    { x: 75, y: 700 },
    { x: 150, y: 700 },
    { x: 225, y: 700 },
    { x: 300, y: 700 },
    { x: 450, y: 700 },
];

export default class CoinElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 0,
        y: 700,
    };
    size = {
        width: 75,
        height: 75,
    };

    changeStage(stage: number) {
        this.texture_offset = stageToTexture[stage];
    }
}
