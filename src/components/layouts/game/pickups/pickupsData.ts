import { Position, Size } from "../../../interfaces";
import { Weapons } from "../constants";
import Weapon from "../weapons/Weapon";

export enum Pickups {
    Orbit,
    EightWay,
    RGun,
    Pulse,
    Fuel,
}

export const PICKUP_TO_WEAPON = {
    [Pickups.Orbit]: Weapons.Orbit,
    [Pickups.EightWay]: Weapons.EightWay,
    [Pickups.RGun]: Weapons.RGun,
    [Pickups.Pulse]: Weapons.Pulse,
};

interface PickupData {
    texture_offset: Position;
    size: Size;
}

export const PICKUP_DATA: { [key in Pickups]: PickupData } = {
    [Pickups.Fuel]: {
        texture_offset: { x: 150, y: 500 },
        size: { width: 61, height: 67 },
    },
    [Pickups.Orbit]: {
        texture_offset: { x: 300, y: 500 },
        size: { width: 57, height: 57 },
    },
    [Pickups.RGun]: {
        texture_offset: { x: 225, y: 500 },
        size: { width: 65, height: 61 },
    },
    [Pickups.Pulse]: {
        texture_offset: { x: 300, y: 400 },
        size: { width: 63, height: 69 },
    },
    [Pickups.EightWay]: {
        texture_offset: { x: 375, y: 400 },
        size: { width: 60, height: 63 },
    },
};
