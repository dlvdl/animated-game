import {Player} from "./Player.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.player = new Player(this);
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }

        canvas.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        });

        canvas.addEventListener('mouseup', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        });

        canvas.addEventListener('mousemove', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });
    }

    render(context) {
        this.player.draw(context);
    }
}