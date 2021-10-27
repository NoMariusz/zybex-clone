import { Position, Size } from "../../../interfaces";

interface BulletData {
  texture_offset: Position;
  size: Size;
}

export enum BulletsCreators {
  Enemy,
  Orbit,
}

const bulletData: { [index: string]: BulletData } = {
  [BulletsCreators.Enemy]: {
    texture_offset: {
      x: 75,
      y: 250,
    },
    size: {
      width: 33,
      height: 26,
    },
  },
  [BulletsCreators.Orbit]: {
    texture_offset: {
      x: 0,
      y: 250,
    },
    size: {
      width: 33,
      height: 34,
    },
  },
};

export default bulletData;
