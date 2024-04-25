import {Player} from "./Player.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.player = new Player(this);
    }
    render(context) {
        this.player.draw(context);
    }
}