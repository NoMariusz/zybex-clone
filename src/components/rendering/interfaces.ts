import { Position, Size } from "../interfaces";

export interface CanvasElement {
  position: Position;
  texture: string;
  texture_offset: Position;
  size: Size;
  flip?: boolean;
  texture_size?: Size;
}
