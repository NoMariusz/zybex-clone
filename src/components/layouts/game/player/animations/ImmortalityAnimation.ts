import { AVATAR_COLORS } from "../../../../../constants";
import { Position } from "../../../../interfaces";
import AvatarElement from "../AvatarElement";
import Animation from "./Animation";

export default class ImmortalityAnimation implements Animation {
  active = false;
  name = "immortality";

  tickIntervalTime = 100;
  interval: NodeJS.Timer;

  avatar: AvatarElement;
  baseTexture: Position;

  colorQueue = [AVATAR_COLORS.red, AVATAR_COLORS.green, AVATAR_COLORS.blue];
  actualColorIdx = 0;

  constructor(avatar: AvatarElement) {
    this.avatar = avatar;
  }

  start() {
    this.baseTexture = this.avatar.texture_offset;
    this.actualColorIdx = 0;
  }

  end() {
    this.avatar.texture_offset = this.baseTexture;
  }

  tick() {
    const color = this.colorQueue[this.actualColorIdx];
    this.avatar.texture_offset.y = color;
    this.actualColorIdx++;
    if (this.actualColorIdx >= this.colorQueue.length) {
      this.actualColorIdx = 0;
    }
  }
}
