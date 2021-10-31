import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { Pickups, PICKUP_CHANCE } from "../constants";
import { randomEnum } from "../utils";
import PickUp from "./Pickup";

export default class PickupsManager implements Renderable {
  /* store, handle adding and collisions for pickups */

  pickups: PickUp[];

  constructor() {
    this.pickups = [];
  }

  render() {
    this.checkPickups();
    for (const pickup of this.pickups) {
      pickup.render();
    }
  }

  onEnemyDie(position: Position) {
    // calc chance to drop pickup
    if (Math.random() * 10 > PICKUP_CHANCE) return;

    // make random pickup
    const randomPickupType = randomEnum(Pickups);
    const pickup = new PickUp(randomPickupType, position);

    this.pickups.push(pickup);
  }

  //clearing

  checkPickups() {
    for (const pickup of this.pickups) {
      if (pickup.position.x < -pickup.size.width) this.clearPickup(pickup);
    }
  }

  clearPickup(pickup: PickUp) {
    const idx = this.pickups.findIndex((p) => p == pickup);
    this.pickups.splice(idx, 1);
  }
}
