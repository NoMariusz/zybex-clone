import { Position, Size } from "../../../interfaces";

interface BulletData {
  texture_offset: Position;
  size: Size;
  damage: number;
}

export enum BulletType {
  Enemy,
  Orbit,
  Pulse1,
  Pulse2,
}

const bulletData: { [key in BulletType]: BulletData } = {
  [BulletType.Enemy]: {
    texture_offset: {
      x: 75,
      y: 250,
    },
    size: {
      width: 33,
      height: 26,
    },
    damage: 100,
  },
  [BulletType.Orbit]: {
    texture_offset: {
      x: 0,
      y: 250,
    },
    size: {
      width: 33,
      height: 34,
    },
    damage: 35,
  },
  [BulletType.Pulse1]: {
    texture_offset: {
      x: 225,
      y: 350,
    },
    size: {
      width: 27,
      height: 66,
    },
    damage: 20,
  },
  [BulletType.Pulse2]: {
    texture_offset: {
      x: 150,
      y: 350,
    },
    size: {
      width: 30,
      height: 112,
    },
    damage: 20,
  },
};

export default bulletData;
