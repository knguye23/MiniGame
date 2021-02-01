class Character {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});

        // states
        this.state = 0; // 0 = idle, 1 = moving
        this.facing = 4; // 0 = N, 1 = NE, 2 = E, 3 = SE, 4 = S, 5 = SW, 6 = W, 7 = NW        
        this.velocity = {x: 0, y: 0};
        this.xOffset = 10 * params.charscale;
        this.yOffset = 23 * params.charscale;
        this.damage = 2;
        this.velocity = {x: 0, y: 0};

        // animations
        this.animations = [];
        this.north = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_north.png");
        this.northeast = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_diagup.png");
        this.east = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_side.png");
        this.southeast = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_diagdown.png");
        this.south = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_south.png");
        this.loadAnimations();

        this.updateBB();

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - this.xOffset, this.y - this.yOffset, 20 * params.charscale, 24 * params.charscale);

    }
    loadAnimations() {
        for(var i = 0; i < 2; i++) { // two states
            this.animations.push([]);
            for(var j = 0; j < 8; j++) { // eight directions
                this.animations[i].push([]);
            }
        }

        // idle
        this.animations[0][0] = new Animator(this.north, 0, 0, 20, 24, 1, 1, 0, false, true); // N
        this.animations[0][1] = new Animator(this.northeast, 0, 0, 20, 24, 1, 1, 0, false, true); // NE
        this.animations[0][2] = new Animator(this.east, 0, 0, 20, 24, 1, 1, 0, false, true); // E
        this.animations[0][3] = new Animator(this.southeast, 0, 0, 20, 24, 1, 1, 0, false, true); // SE
        this.animations[0][4] = new Animator(this.south, 0, 0, 20, 24, 1, 1, 0, false, true); // S
        
        // moving
        this.animations[1][0] = new Animator(this.north, 0, 0, 20, 24, 4, 0.25, 0, false, true);
        this.animations[1][1] = new Animator(this.northeast, 0, 0, 20, 24, 4, 0.25, 0, false, true);
        this.animations[1][2] = new Animator(this.east, 0, 0, 20, 24, 4, 0.25, 0, false, true);
        this.animations[1][3] = new Animator(this.southeast, 0, 0, 20, 24, 4, 0.25, 0, false, true);
        this.animations[1][4] = new Animator(this.south, 0, 0, 20, 24, 4, 0.25, 0, false, true);

    };

    draw(ctx) {
        
        if (this.facing < 5) {
            this.animations[this.state][this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x - this.xOffset, this.y - this.yOffset, params.charscale);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][8-this.facing].drawFrame(this.gameEngine.clockTick, ctx, -(this.x) - 20*params.charscale + this.xOffset, this.y - this.yOffset, params.charscale);
            ctx.restore();
        }

        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };

    update() {
        let right = this.gameEngine.right;
        let left = this.gameEngine.left;
        let up = this.gameEngine.up;
        let down = this.gameEngine.down;

        if (this.gameEngine.mouse) {
            this.facing = getFacing(this.gameEngine.mouse, this.x, this.y);
        }

        if (!right && !left && !up && !down) {
            this.state = 0;
            this.velocity = {x:0, y:0};
        }

        if (right) {
            this.state = 1;
            this.velocity.x += 10;
        }

        if (down) {
            this.state = 1;
            this.velocity.y += 10;
        }

        if (left) {
            this.state = 1;
            this.velocity.x -= 10;
        }

        if (up) {
            this.state = 1;
            this.velocity.y -= 10;
        }

        if (this.x < 10 * params.charscale) this.x = 10 * params.charscale;
        if (this.x > params.canvasWidth - 10 * params.charscale) this.x = params.canvasWidth - 10 * params.charscale;
        if (this.y < 23 * params.charscale) this.y = 23 * params.charscale;
        if (this.y > params.canvasHeight - 3 * params.charscale) this.y = params.canvasHeight - 3 * params.charscale;
        
        this.updateBB();

        if (this.gameEngine.click)
            this.gameEngine.addEntity(new Bullet(this.gameEngine, this.x, this.y - 10, this.gameEngine.mouse.x, this.gameEngine.mouse.y, this));

        // for (var i = 0; i < this.gameEngine.entities.length; i++) {
        //     var ent = this.gameEngine.entities[i];    
        //     if (ent instanceof Base && this.BB.collide(ent.BB)) {
        //         this.velocity = {x:0, y:0};
        //     } 
        // }

        this.x += this.velocity.x * this.gameEngine.clockTick;
        this.y += this.velocity.y * this.gameEngine.clockTick;
    };

    shoot(target) {
        
    }
}