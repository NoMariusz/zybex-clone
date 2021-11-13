import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { RANDOM_PICKUPS, RANDOM_PICKUP_CHANCE } from "../constants";
import { randomEnum } from "../utils";
import PickUp from "./Pickup";
import { Pickups } from "./pickupsData";

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

    onEnemyDie(position: Position, pickupType?: Pickups) {
        const pickup = RANDOM_PICKUPS
            ? this.doRandomPickup(position)
            : this.doNormalPickup(position, pickupType);
        if (pickup) this.pickups.push(pickup);
    }

    doRandomPickup(position: Position) {
        // calc chance to drop pickup
        if (Math.random() * 10 > RANDOM_PICKUP_CHANCE) return;

        const randomPickupType = randomEnum(Pickups);
        return new PickUp(randomPickupType, position);
    }

    doNormalPickup(position: Position, pickupType?: Pickups) {
        if (!pickupType) return;
        return new PickUp(pickupType, position);
    }

    //clearing

    checkPickups() {
        for (const pickup of this.pickups) {
            if (pickup.position.x < -pickup.size.width)
                this.clearPickup(pickup);
        }
    }

    clearPickup(pickup: PickUp) {
        const idx = this.pickups.findIndex((p) => p == pickup);
        this.pickups.splice(idx, 1);
    }
}
