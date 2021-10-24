import AvatarElement from "../AvatarElement";

export default interface Animation {
  name: string;
  active: boolean;

  tickIntervalTime: number;

  interval: NodeJS.Timer;

  avatar: AvatarElement;

  tick: () => void;
  start: () => void;
  end: () => void;
}
