export const BOARD_Y = 100;
export const BOARD_HEIGHT = 700;

export enum Weapons {
  Orbit,
  Pulse,
}

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
