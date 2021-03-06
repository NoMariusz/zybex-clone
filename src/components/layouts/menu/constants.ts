import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";

export const CHANGE_LAYOUT_TIMEOUT = 5000;

export const BOTTOM_PANEL_Y = (CANVAS_HEIGHT / 8) * 7;

export const BOTTOM_MENU_RADIUS = CANVAS_WIDTH / 4;

export const BOTTOM_ANIM_STEP = 5;
export const BOTTOM_ANIM_MAX_OFFSET = 120;

export const FOCUS_ANIM_MS = 250;

export const RIGHT_AVATARS_X = 1260;
export const LEFT_AVATARS_X = 1350;

export enum Pages {
    Main,
    Highscores,
}

export const HIGHSCORES_SCORE_LEFT_OFFSET = 350;
export const HIGHSCORES_NAME_LEFT_OFFSET = 850;
export const HIGHSCORES_TOP_OFFSET = 240;
export const HIGHSCORE_WIDTH = 90;
export const HIGHSCORE_ELEMENT_GAP = 1;

export const MENU_SECTION_TEXTURE_Y_OFFSET = 4850;

export const FOCUSED_START_ICO_Y = MENU_SECTION_TEXTURE_Y_OFFSET + 800;
export const START_ICO_Y = MENU_SECTION_TEXTURE_Y_OFFSET + 900;

export const SELECTED_SINGLE_PLAYER_ICO_Y = MENU_SECTION_TEXTURE_Y_OFFSET + 500;
export const SINGLE_PLAYER_ICO_Y = MENU_SECTION_TEXTURE_Y_OFFSET + 400;

export const SELECTED_MULTI_PLAYER_ICO_Y = MENU_SECTION_TEXTURE_Y_OFFSET + 700;
export const MULTI_PLAYER_ICO_Y = MENU_SECTION_TEXTURE_Y_OFFSET + 600;

export const NUMBER_ONE_POSITION = {
    x: 210,
    y: 242,
};
