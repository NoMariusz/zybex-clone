import { Focusable } from "../../../../interfaces";
import { AVATAR_COLORS } from "../../../../../constants";
import BottomPanelEl from "./BottomPanelElement";
import {
    LEFT_AVATARS_X,
    MENU_SECTION_TEXTURE_Y_OFFSET,
    RIGHT_AVATARS_X,
} from "../../constants";

export default class PlayerAvatar extends BottomPanelEl implements Focusable {
    texture_offset = {
        x: RIGHT_AVATARS_X,
        y: AVATAR_COLORS.red + MENU_SECTION_TEXTURE_Y_OFFSET,
    };

    lastColor: AVATAR_COLORS = AVATAR_COLORS.red;

    size = {
        width: 67,
        height: 70,
    };

    changeFocus(value: boolean) {
        this.texture_offset.y = this.getMenuAvatarTextureYOffset(
            value ? AVATAR_COLORS.white : this.lastColor
        );
    }

    startFocus() {}
    endFocus() {
        this.texture_offset.y = this.getMenuAvatarTextureYOffset(
            this.lastColor
        );
    }

    changeColor() {
        let color: number = AVATAR_COLORS.red;
        let setNext = false;
        // loop in every color
        for (const col in AVATAR_COLORS) {
            // if in previous loop find color, then set color to actual iteration color
            if (Number(col) && setNext && Number(col) != AVATAR_COLORS.white) {
                color = Number(col);
                setNext = false;
                break;
            }
            // search for actual color
            if (col == this.lastColor.toString()) {
                setNext = true;
            }
        }
        // if find color was last at iteration, then set to red
        if (setNext) {
            color = AVATAR_COLORS.red;
        }

        this.texture_offset.y = this.getMenuAvatarTextureYOffset(color);
        this.lastColor = color;
    }

    getMenuAvatarTextureYOffset(x: number) {
        return x + MENU_SECTION_TEXTURE_Y_OFFSET;
    }

    useFlippedTexture() {
        this.texture_offset.x = LEFT_AVATARS_X;
    }
}
