import { Collidable, Position, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
  LEVEL_TEXTURE_FULL_HEIGHT,
  LEVEL_TEXTURE_FULL_WIDTH,
  LEVEL_TEXTURE_SCALE,
  PLAYFIELD_COLLIDE_TOLERANCY,
} from "../constants";

export default class CollidableCollider {
  /* Detect collision with collidables */

  checkCollision(element1: Collidable, element2: Collidable): boolean {
    // check if two rectangle elements collide, by checking for every 4 corners of element1
    // if they are in element's 2 area

    const { x: x1, y: y1 } = element1.position;
    const { x: x2, y: y2 } = element2.position;
    const xx1 = x1 + element1.size.width;
    const xx2 = x2 + element2.size.width;
    const yy1 = y1 + element1.size.height;
    const yy2 = y2 + element2.size.height;

    return (
      (x1 >= x2 && x1 <= xx2 && y1 >= y2 && y1 <= yy2) ||
      (xx1 >= x2 && xx1 <= xx2 && yy1 >= y2 && yy1 <= yy2) ||
      (x1 >= x2 && x1 <= xx2 && yy1 >= y2 && yy1 <= yy2) ||
      (xx1 >= x2 && xx1 <= xx2 && y1 >= y2 && y1 <= yy2)
    );
  }
}
