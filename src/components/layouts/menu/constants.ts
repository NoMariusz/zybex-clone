import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";

export const CHANGE_LAYOUT_TIMEOUT = 2500;

export const BOTTOM_PANEL_Y = (CANVAS_HEIGHT / 8) * 7;
export const BOTTOM_MENU_RADIUS = CANVAS_WIDTH / 4;

export const BOTTOM_ANIM_MIN_OFFSET = 20;
export const BOTTOM_ANIM_STEP = 5;
export const BOTTOM_ANIM_MAX_OFFSET = 120;

export const FOCUS_ANIM_MS = 600;

export enum Pages {
    Main,
    Highscores,
}

export const HIGHSCORES_SCORE_LEFT_OFFSET = 350;
export const HIGHSCORES_NAME_LEFT_OFFSET = 850;
export const HIGHSCORES_TOP_OFFSET = 240;
export const HIGHSCORE_WIDTH = 90;
export const HIGHSCORE_ELEMENT_GAP = 1;
