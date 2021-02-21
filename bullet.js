class Bullet {
    constructor(gameEngine, x, y, mouse, shootingEntity) {
        Object.assign(this, { gameEngine, x, y, mouse, shootingEntity });

        // animations
        this.img = ASSET_MANAGER.getAsset("./topdown_shooter/other/flamethrower_bullet.png");
        this.animation = new Animator(this.img, 0, 0, 26, 10, 1, 1, 0, false, true);
        this.cache = [];

        this.xOffset = 13;
        this.yOffset = 5;
        this.maxSpeed = 200;
        this.damage = 10;

        this.initX = this.x;
        this.initY = this.y;

        this.initMouseX = this.mouse.x;
        this.initMouseY = this.mouse.y;

        var dist = distance(this, this.mouse);
        this.velocity = {
            x: ((this.mouse.x - this.x) / dist) * this.maxSpeed,
            y: ((this.mouse.y - this.y) / dist) * this.maxSpeed,
        };

        this.updateBB();

        this.elapsedTime = 0;

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - this.offset, this.y - this.offset, 26 * params.bulletscale, 10 * params.bulletscale);
    };

    drawAngle(ctx, angle) {
        if (angle < 0 || angle > 359) return;

        if (!this.cache[angle]) {
            let radians = angle * Math.PI / 180;
            let offscreenCanvas = document.createElement('canvas');

            offscreenCanvas.width = Math.max(26, 10);
            offscreenCanvas.height = Math.max(26, 10);

            let offscreenCtx = offscreenCanvas.getContext('2d');
            offscreenCtx.imageSmoothingEnabled = false;
            offscreenCtx.setTransform(1, 0, 0, 1, offscreenCanvas.width / 2, offscreenCanvas.height / 2); // translate + scale
            offscreenCtx.rotate(radians); // rotate
            offscreenCtx.drawImage(this.img, -offscreenCanvas.width / 2, -offscreenCanvas.height / 2);
            offscreenCtx.setTransform(1, 0, 0, 1, 0, 0); // translate + scale
            this.cache[angle] = offscreenCanvas; // save into cache
        }
        ctx.drawImage(this.cache[angle], 0, 0, this.cache[angle].width, this.cache[angle].height, this.x - this.xOffset, this.y - this.yOffset, this.cache[angle].width, this.cache[angle].height);
    };

    draw(ctx) {
        let angle = Math.atan2(this.velocity.y, this.velocity.x);
        if (angle < 0) angle += 2 * Math.PI;
        let degrees = Math.floor(angle * 180 / Math.PI);

        this.drawAngle(ctx, degrees);
    };

    update() {
        this.elapsedTime += this.gameEngine.clockTick;

        var dist = distance(this, this.mouse);
        this.velocity = {
            x: ((this.mouse.x - this.x) / dist) * this.maxSpeed,
            y: ((this.mouse.y - this.y) / dist) * this.maxSpeed,
        };

        this.updateBB();

        // update position
        this.x += this.velocity.x * this.gameEngine.clockTick;
        this.y += this.velocity.y * this.gameEngine.clockTick;

        // slime collision
        for (var i = 0; i < this.gameEngine.entities.length; i++) {
            var ent = this.gameEngine.entities[i];
            if (ent instanceof Slime && ent.BB.collide(this)) {
                ent.takeHit(this.damage);
                this.removeFromWorld = true;
            }

        }

        // removing bullet from world
        let dx = this.x - this.initX;
        let dy = this.y - this.initY;
        let distTraveled = Math.sqrt(dx * dx + dy * dy);

        if (distTraveled > this.shootingEntity.range) {
            this.removeFromWorld = true;
        }

        if (Math.floor(this.x) == this.initMouseX
            || Math.ceil(this.x) == this.initMouseX
            || Math.floor(this.y) == this.initMouseY
            || Math.ceil(this.y) == this.initMouseY) {
            this.removeFromWorld = true;
        }
    };
}