import { Sound, SOUNDS_PATH } from "./constants";

class SoundPlayer {
    private activeAudios: HTMLAudioElement[] = [];

    play(sound: Sound, looped = false) {
        const audio = this.makeAudio(sound);
        audio.loop = looped;

        audio.oncanplaythrough = () => {
            audio.play();
        };
        audio.onended = () => {
            this.removeAudio(audio);
        };

        this.activeAudios.push(audio);

        return audio;
    }

    cancel(audio: HTMLAudioElement) {
        this.cancelAudio(audio);
    }

    clearAllSounds() {
        for (const audio of this.activeAudios) {
            this.stopPlaying(audio);
        }
        this.activeAudios = [];
    }

    private makeAudio(sound: Sound) {
        return new Audio(SOUNDS_PATH + sound);
    }

    private cancelAudio(audio: HTMLAudioElement) {
        this.stopPlaying(audio);
        this.removeAudio(audio);
    }

    private stopPlaying(audio: HTMLAudioElement) {
        audio.oncanplaythrough = null; // to secure from start playing after audio is removed
        audio.pause();
    }

    private removeAudio(audio: HTMLAudioElement) {
        // to not remove audio not existing in list
        const i = this.activeAudios.findIndex((e) => e == audio);
        if (i != -1) this.activeAudios.splice(i, 1);
    }
}

export default new SoundPlayer();
