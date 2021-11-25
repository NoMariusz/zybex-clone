export interface Highscore {
    playerName: string;
    score: number;
}

export interface Highscores extends Array<Highscore> {}
