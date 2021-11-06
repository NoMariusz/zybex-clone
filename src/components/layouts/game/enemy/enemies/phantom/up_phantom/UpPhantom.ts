import { Position } from "../../../../../../interfaces";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../../../constants";
import DownPhantom from "../down_phantom/DownPhantom";
import UpPhantomSection from "./UpPhantomSection";

export default class UpPhantom extends DownPhantom {
    static sectionCount = 6;

    initSections() {
        for (let i = 0; i < UpPhantom.sectionCount; i++) {
            const section = new UpPhantomSection(i);
            this.sections.push(section);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: BOARD_WIDTH / 8 + idx * 68,
            y: (BOARD_HEIGHT / 10) * 9,
        };
    }
}
