import { AVATAR_COLORS } from "../../../../../constants";
import { Position } from "../../../../interfaces";
import AvatarElement from "../AvatarElement";
import Animation from "./Animation";

export default class DeathAnimation implements Animation {
  active = false;
  name = "death";

  tickIntervalTime = 200;
  interval: NodeJS.Timer;

  avatar: AvatarElement;
  baseTexture: Position;

  textures: Position[] = [
    {
      x: 600,
      y: 500,
    },
    {
      x: 700,
      y: 500,
    },
    {
      x: 800,
      y: 500,
    },
    {
      x: 900,
      y: 500,
    },
    {
      x: 1000,
      y: 500,
    },
    {
      x: 1100,
      y: 500,
    },
    {
      x: 1200,
      y: 500,
    },
  ];
  actualTextureIdx = 0;

  constructor(avatar: AvatarElement) {
    this.avatar = avatar;
  }

  start() {
    this.baseTexture = this.avatar.texture_offset;
    this.actualTextureIdx = 0;
  }

  end() {
    this.avatar.texture_offset = this.baseTexture;
  }

  tick() {
    if (this.actualTextureIdx >= this.textures.length) {
      return;
    }
    const tex = this.textures[this.actualTextureIdx];
    this.avatar.texture_offset = tex;
    this.actualTextureIdx++;
  }
}
