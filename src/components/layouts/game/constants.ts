// overall things

import { AVATAR_COLORS, CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";
import { Position } from "../../interfaces";
import { AnimationName } from "./animations/animationNames";

export const BOARD_Y = 105;
export const BOARD_HEIGHT = CANVAS_HEIGHT - BOARD_Y * 2;
export const BOARD_X = 0;
export const BOARD_WIDTH = CANVAS_WIDTH;

// game configuration

// player

export enum PlayerStatuses {
    Playing, // player is controling a player
    TempLocked, // player lock player controls
    HardLocked, // other systems lock player to monipulate him
}

// disable player loosing hp for testing purpouses
export const PLAYER_IMMORTAL = false;

export const BASE_PLAYER_LIVES = 2;
export const PLAYER_SPEED = 8;
export const PLAYER_IMMORTALITY_TIME = 5 * 1000;

export const MAX_ATTACK_SPEED_MULTIPLIER = 2.5;
export const MIN_WEAPON_SHOT_TIMEOUT = 150;

export const ENTRANCE_MAX_DISTANCE = BOARD_WIDTH / 6;

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

// const to define pickup should be for all enemy section
export const ALL_ENEMY_SECTIONS = Infinity;

// pickups

export const RANDOM_PICKUPS = false;

// in scale 0 to 10, 0 - no chance, 10 - certain
export const RANDOM_PICKUP_CHANCE = 8;

// weapons

export enum Weapons {
    Orbit,
    EightWay,
    RGun,
    Pulse,
}

export const MAX_IPLEMENTED_WEAPON_LEVEL = 4;

export const ROTATE_BULLET_DISTANCE = 60;

// ui stuff

export const COLOR_TO_GAME_AVATAR_Y = {
    [AVATAR_COLORS.red]: 0,
    [AVATAR_COLORS.blue]: 100,
    [AVATAR_COLORS.aqua]: 200,
    [AVATAR_COLORS.green]: 300,
    [AVATAR_COLORS.white]: 400,
};

export const PLAYER_TAGS = [
    { x: 0, y: 200 },
    { x: 75, y: 200 },
];

export const SCORE_ELEMENTS_OFFSET = 130;

export const BOTTOM_UI_POS_Y = BOARD_Y + BOARD_HEIGHT + 45;
export const TOP_UI_POS_Y = 30;

// weapons ui stuff

interface WeaponUiData {
    nameTexture: Position;
    texture: Position;
    uiXPosition: number;
    animationName: AnimationName;
}

type WeaponUiDataList = {
    [key in Weapons]: WeaponUiData;
};

export const WEAPON_UI_DATA: WeaponUiDataList = {
    [Weapons.Orbit]: {
        nameTexture: { x: 0, y: 300 },
        texture: { x: 0, y: 100 },
        uiXPosition: 250,
        animationName: AnimationName.OrbitUse,
    },
    [Weapons.Pulse]: {
        nameTexture: { x: 300, y: 300 },
        texture: { x: 300, y: 100 },
        uiXPosition: 800,
        animationName: AnimationName.PulseUse,
    },
    [Weapons.EightWay]: {
        nameTexture: { x: 300, y: 250 },
        texture: { x: 450, y: 100 },
        uiXPosition: 430,
        animationName: AnimationName.EightWayUse,
    },
    [Weapons.RGun]: {
        nameTexture: { x: 300, y: 350 },
        texture: { x: 150, y: 100 },
        uiXPosition: 610,
        animationName: AnimationName.RGunUse,
    },
};

export const WEAPON_LEVELS_TEXTURES: Position[] = [
    { x: 0, y: 0 },
    { x: 150, y: 0 },
    { x: 300, y: 0 },
    { x: 400, y: 0 },
];

// level compleeted ship animation

export const PLAYER_SHIP_DISTANCE = 90;
export const PLAYER_SHIP_SPEED = BOARD_SCROLL_SPEED;
