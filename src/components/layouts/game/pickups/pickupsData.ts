import { Position, Size } from "../../../interfaces";
import { Pickups } from "../constants";

interface PickupData {
  texture_offset: Position;
  size: Size;
}

export const PICKUP_DATA: { [key in Pickups]: PickupData } = {
  [Pickups.Fuel]: {
    texture_offset: { x: 150, y: 500 },
    size: { width: 61, height: 67 },
  },
};
