// overall things

import { AVATAR_COLORS, CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";

export const BOARD_Y = 105;
export const BOARD_HEIGHT = CANVAS_HEIGHT - BOARD_Y * 2;
export const BOARD_X = 0;
export const BOARD_WIDTH = CANVAS_WIDTH;

// game configuration

export const PLAYER_SPEED = 8;

export const PLAYER_IMMORTALITY_TIME = 5 * 1000;

export const LEVEL_TEXTURE_FULL_WIDTH = 7264;
export const LEVEL_TEXTURE_FULL_HEIGHT = 128;

export const LEVEL_TEXTURE_SCALE = LEVEL_TEXTURE_FULL_HEIGHT / BOARD_HEIGHT;

export const PLAYFIELD_SCROLL_SPEED = 0.5;
export const BOARD_SCROLL_SPEED = PLAYFIELD_SCROLL_SPEED / LEVEL_TEXTURE_SCALE;

export const PLAYFIELD_COLLIDE_TOLERANCY = 255 * 3;

export const BASE_ENEMY_HP = 100;

// weapons

export enum Weapons {
  Orbit,
  Pulse,
}

// ui stuff

export const COLOR_TO_GAME_AVATAR_Y = {
  [AVATAR_COLORS.red]: 0,
  [AVATAR_COLORS.blue]: 100,
  [AVATAR_COLORS.aqua]: 200,
  [AVATAR_COLORS.green]: 300,
  [AVATAR_COLORS.white]: 400,
};

export const NUMBER_OFF = [
  { x: 0, y: 350 },
  { x: 0, y: 400 },
  { x: 0, y: 450 },
  { x: 0, y: 500 },
  { x: 0, y: 550 },
  { x: 75, y: 350 },
  { x: 75, y: 400 },
  { x: 75, y: 450 },
  { x: 75, y: 500 },
  { x: 75, y: 550 },
];

export const PLAYER_TAGS = [
  { x: 0, y: 200 },
  { x: 75, y: 200 },
];

export const SCORE_ELEMENTS_OFFSET = 130;

export const BOTTOM_UI_POS_Y = BOARD_Y + BOARD_HEIGHT + 45;
export const TOP_UI_POS_Y = 45;

// weapons

export const WEAPON_TO_NAME_TEXTURE = {
  [Weapons.Orbit]: { x: 0, y: 300 },
  [Weapons.Pulse]: { x: 300, y: 300 },
};

export const WEAPON_TO_TEXTURE = {
  [Weapons.Orbit]: { x: 0, y: 100 },
  [Weapons.Pulse]: { x: 300, y: 100 },
};

export const WEAPON_TO_X_POSITION = {
  [Weapons.Orbit]: 250,
  [Weapons.Pulse]: 800,
};

export const WEAPON_LEVELS_TEXTURES = [
  { x: 0, y: 0 },
  { x: 150, y: 0 },
];
