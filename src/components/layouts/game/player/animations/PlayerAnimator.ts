import Avatar from "../AvatarElement";
import Animation from "./Animation";
import ImmortalityAnimation from "./ImmortalityAnimation";

export default class PlayerAnimator {
  /* Handle starting and ending animations and protect animations from overlaping */
  avatar: Avatar;

  // list of animation in sorted by importance
  animations: Animation[];

  constructor(avatar: Avatar) {
    this.avatar = avatar;

    this.animations = [new ImmortalityAnimation(this.avatar)];
  }

  startAnim(name: string) {
    const anim = this.animations.find((a) => a.name == name);
    if (!anim) return;

    anim.start();
    anim.active = true;

    anim.interval = setInterval(() => {
      if (this.checkIfCanPlay(anim.name)) anim.tick();
    }, anim.tickIntervalTime);
  }

  endAnim(name: string) {
    const anim = this.animations.find((a) => a.name == name);
    if (!anim) return;

    anim.end();
    anim.active = false;

    clearInterval(anim.interval);
  }

  clearAnims() {
    for (const anim of this.animations) {
      this.endAnim(anim.name);
    }
  }

  checkIfCanPlay(animName: string) {
    /* Check if animation can play, so check if there is active
    animation that is more important */
    const animIdx = this.animations.findIndex((a) => a.name == animName);
    const idx = this.animations.findIndex(
      (anim, i) => anim.active && i < animIdx
    );

    return idx == -1;
  }
}
