export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Renderable {
  render(): void;
}

export interface Focusable {
  changeFocus(value: boolean): void;
  startFocus(): void;
  endFocus(): void;
}

export interface Collidable {
  position: Position;
  size: Size;
}
