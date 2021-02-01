class Slime {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});

        this.img = ASSET_MANAGER.getAsset("./topdown_shooter/monster/slime1_front.png");
        this.animation = new Animator(this.img, 0, 0, 16, 16, 4, 0.15, 0, false, true);

        this.target = this.gameEngine.base;
        this.velocity = {x: 0, y: 0};
        this.maxSpeed = 30;
        this.HP = 10;
        this.offset = 8 * params.enemyscale;

        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - this.offset, this.y - this.offset, 16 * params.enemyscale, 16 * params.enemyscale);

    }
    draw(ctx) { 
        this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x - this.offset, this.y - this.offset, params.enemyscale);

        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };

    update() {  
        var dist = distance(this, this.target);
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.updateBB();

        for (var i = 0; i < this.gameEngine.entities.length; i++) {
            var ent = this.gameEngine.entities[i];

            if (ent instanceof Base && this.BB.collide(ent.BB)) {
                this.velocity = {x:0, y:0};
                this.x += this.velocity.x * this.gameEngine.clockTick;
                this.y += this.velocity.y * this.gameEngine.clockTick;
            }
        }

        this.x += this.velocity.x * this.gameEngine.clockTick;
        this.y += this.velocity.y * this.gameEngine.clockTick;
        
    };

    takeHit(damage) {
        this.HP = Math.min(0, this.HP - damage);

        if (this.HP === 0) {
            this.removeFromWorld = true;
        }
    }
}

