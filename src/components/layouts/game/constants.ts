// overall things

import { AVATAR_COLORS, CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";
import { Position } from "../../interfaces";

export const BOARD_Y = 105;
export const BOARD_HEIGHT = CANVAS_HEIGHT - BOARD_Y * 2;
export const BOARD_X = 0;
export const BOARD_WIDTH = CANVAS_WIDTH;

// game configuration

// player

export enum PlayerStatuses {
    Playing,
    TempLocked,
    HardLocked,
}

// disable player loosing hp for testing purpouses
export const PLAYER_IMMORTAL = false;
export const PLAYER_SPEED = 8;
export const PLAYER_IMMORTALITY_TIME = 5 * 1000;

export const MAX_ATTACK_SPEED_MULTIPLIER = 2.5;

// level/board

export const LEVEL_TEXTURE_FULL_WIDTH = 7264;
export const LEVEL_TEXTURE_FULL_HEIGHT = 128;

export const LEVEL_TEXTURE_SCALE = LEVEL_TEXTURE_FULL_HEIGHT / BOARD_HEIGHT;

export const PLAYFIELD_SCROLL_SPEED = 0.5;
export const BOARD_SCROLL_SPEED = PLAYFIELD_SCROLL_SPEED / LEVEL_TEXTURE_SCALE;

export const PLAYFIELD_COLLIDE_TOLERANCY = 255 * 3;

// enemies

export const BASE_ENEMY_HP = 100;
export const COIN_WALL_HP = 250;
export const WORM_HP = 200;
export const TARGETED_BIRD_HP = 30;

export const BIRD_WALL_WAIT_TIME = 2500;

export const SCORE_FOR_ENEMY = 50;

// in scale 0 to 10, 0 - no chance, 10 - certain
export const PICKUP_CHANCE = 8;

// weapons

export enum Weapons {
    Orbit,
    EightWay,
    RGun,
    Pulse,
}

export const MAX_IPLEMENTED_WEAPON_LEVEL = 2;

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

// weapons ui stuff

interface WeaponUiData {
    nameTexture: Position;
    texture: Position;
    uiXPosition: number;
}

type WeaponUiDataList = {
    [key in Weapons]: WeaponUiData;
};

export const WEAPON_UI_DATA: WeaponUiDataList = {
    [Weapons.Orbit]: {
        nameTexture: { x: 0, y: 300 },
        texture: { x: 0, y: 100 },
        uiXPosition: 250,
    },
    [Weapons.Pulse]: {
        nameTexture: { x: 300, y: 300 },
        texture: { x: 300, y: 100 },
        uiXPosition: 800,
    },
    [Weapons.EightWay]: {
        nameTexture: { x: 300, y: 250 },
        texture: { x: 450, y: 100 },
        uiXPosition: 430,
    },
    [Weapons.RGun]: {
        nameTexture: { x: 300, y: 350 },
        texture: { x: 150, y: 100 },
        uiXPosition: 610,
    },
};

export const WEAPON_LEVELS_TEXTURES = [
    { x: 0, y: 0 },
    { x: 150, y: 0 },
];

// level compleeted ship animation

export const PLAYER_SHIP_DISTANCE = 90;
