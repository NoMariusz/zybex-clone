import { Position, Size } from "../../../interfaces";

interface BulletData {
  texture_offset: Position;
  size: Size;
}

const bulletData: { [index: string]: BulletData } = {
  enemy: {
    texture_offset: {
      x: 75,
      y: 250,
    },
    size: {
      width: 33,
      height: 26,
    },
  },
};

export default bulletData;
