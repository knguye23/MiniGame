class Bullet {
    constructor(gameEngine, x, y, mouseX, mouseY, shootingEntity) {
        Object.assign(this, {gameEngine, x, y, mouseX, mouseY, shootingEntity});

        // animations
        this.img = ASSET_MANAGER.getAsset("./topdown_shooter/other/bulleta.png");
        this.animation = new Animator(this.img, 0, 0, 6, 6, 1, 1, 0, false, true);

        this.maxSpeed = 200;
        this.offset = 3;

        var dist = distance(this, {x: this.mouseX, y: this.mouseY});
        this.velocity = {
            x: ((this.mouseX - this.x) / dist) * this.maxSpeed,
            y: ((this.mouseY - this.y) / dist) * this.maxSpeed,
        };
        
        console.log(this.velocity);

        this.updateBB();

        this.elapsedTime = 0;

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - this.offset, this.y - this.offset, 6 * params.bulletscale, 6 * params.bulletscale);

    }

    draw(ctx) {
        this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x - this.offset, this.y - this.offset, params.bulletscale);
    };

    update() {
        this.elapsedTime += this.gameEngine.clockTick;

        var dist = distance(this, {x: this.mouseX, y: this.mouseY});
        this.velocity = {x: ((this.mouseX - this.x) / dist) * this.maxSpeed, y: ((this.mouseY - this.y) / dist) * this.maxSpeed};

        this.updateBB();

        for (var i = 0; i < this.gameEngine.entities.length; i++) {
            var ent = this.gameEngine.entities[i];    
            if (ent instanceof Slime && this.shootingEntity instanceof Character && this.BB.collide(ent.BB)) {
              ent.takeHit(this.shootingEntity.damage);
              this.removeFromWorld = true;
            } 

            if (this.elapsedTime > 3) this.removeFromWorld = true;
        }

        this.x += this.velocity.x * this.gameEngine.clockTick;
        this.y += this.velocity.y * this.gameEngine.clockTick;


    };
}