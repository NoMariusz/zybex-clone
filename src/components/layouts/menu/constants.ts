import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";

export const CHANGE_LAYOUT_TIMEOUT = 2500;

export enum AVATAR_COLORS {
  red = 0,
  blue = 100,
  aqua = 200,
  green = 300,
  white = 1000,
}

export const BOTTOM_PANEL_Y = (CANVAS_HEIGHT / 8) * 7;
export const BOTTOM_MENU_RADIUS = CANVAS_WIDTH / 4;

export const BOTTOM_ANIM_MIN_OFFSET = 20;
export const BOTTOM_ANIM_STEP = 5;
export const BOTTOM_ANIM_MAX_OFFSET = 120;

export const FOCUS_ANIM_MS = 600;
