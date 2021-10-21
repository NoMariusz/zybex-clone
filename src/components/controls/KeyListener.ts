export default class KeyListener {
  subscribedFunc: (key: string) => void;

  constructor() {
    const root: HTMLBodyElement = document.querySelector("body");
    root.onkeyup = (e) => {
      this.subscribedFunc(e.key);
    };
  }
}
