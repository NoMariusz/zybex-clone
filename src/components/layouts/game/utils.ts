import { Position } from "../../interfaces";
import { BOARD_Y } from "./constants";

export const translateToCanvasPos = (boardPos: Position) => {
  return {
    x: boardPos.x,
    y: boardPos.y + BOARD_Y,
  };
};
