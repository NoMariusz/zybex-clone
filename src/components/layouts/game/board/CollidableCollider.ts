import { Collidable } from "../../../interfaces";

export default class CollidableCollider {
  /* Detect collision with collidables */

  checkCollision(element1: Collidable, element2: Collidable): boolean {
    /**
     * check if two rectangle elements collide, by checking for every 4 corners of element1
     * if they are in element's 2 area
     * ! elemet1 should be that smaller element, to detect collisions correct
     */

    if (!this.validateElements(element1, element2))
      throw new Error(
        "Element1 should be not so much bigger that element2 to detect collisions correct!"
      );

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

  private validateElements(element1: Collidable, element2: Collidable) {
    return (
      element1.size.height <= element2.size.height * 2 ||
      element1.size.width <= element2.size.height * 2
    );
  }
}
