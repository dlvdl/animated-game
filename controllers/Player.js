export class Player {
    constructor(game) {
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 30;
        this.speedX = 0;
        this.speedY = 0;
        this.dx = 0;
        this.dy = 0;
        this.speedModifier = 5;
        this.image = document.getElementById('bull');
        this.spriteWidth = 255;
        this.spriteHeight = 255;
        this.height = this.spriteHeight;
        this.width = this.spriteWidth;
        this.spriteX = 0;
        this.spriteY = 0;
    }

    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.game.mouse.x, this.game.mouse.y);
        context.stroke();
    }

    update() {
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;

        const distance = Math.hypot(this.dy, this.dx);

        if (distance > this.speedModifier) {
            this.speedY = this.dy / distance || 0;
            this.speedX = this.dx / distance || 0;
        } else {
            this.speedY = 0;
            this.speedX = 0;
        }

        this.collisionX += this.speedX * this.speedModifier;
        this.collisionY += this.speedY * this.speedModifier;

        // align sprite position against cursor
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 100;

        // handle collision with obstacles
        this.game.obstacles.forEach((obstacle) => {
            const {collision, dx, dy, sumOfRadii, distance} = this.game.checkCollision(this, obstacle);

            if (collision) {
                const unit_x = dx / distance;
                const unit_y = dy / distance;

                this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unit_x;
                this.collisiony = obstacle.collisionY + (sumOfRadii + 1) * unit_y;
            }
        });
    }
}