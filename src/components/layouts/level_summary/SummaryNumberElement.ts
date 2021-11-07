import { CanvasElement } from "../../rendering/interfaces";
import { SUMMARY_NUMBERS_Y } from "./constans";

export default class SummaryNumberElement implements CanvasElement {
    texture_offset = {
        x: 0,
        y: 2700,
    };

    position = {
        x: 0,
        y: SUMMARY_NUMBERS_Y,
    };

    size = {
        width: 60,
        height: 64,
    };

    texture = "screens_sprite";

    changeNum(number: number) {
        if (number < 0 || number > 9) {
            return;
        }
        this.texture_offset.x = number * 60;
    }
}
