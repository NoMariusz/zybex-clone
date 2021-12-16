import { Focusable } from "../../../../interfaces";
import CanvasElement from "../../../../rendering/CanvasElement";
import { BOTTOM_PANEL_Y } from "../../constants";

export default abstract class BottomPanelElement
    extends CanvasElement
    implements Focusable
{
    position = {
        x: 0,
        y: BOTTOM_PANEL_Y,
    };

    texture_offset = {
        x: 0,
        y: 0,
    };

    size = {
        width: 0,
        height: 0,
    };

    // max position to reach at bottom panel animation
    maxPos: number = 0;
    // velocity in bottom panel animation
    velocity: number = 0;

    abstract changeFocus(value: boolean): void;

    abstract startFocus(): void;
    abstract endFocus(): void;
}
