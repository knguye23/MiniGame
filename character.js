class Character {
    constructor(gameEngine, x, y) {
        Object.assign(this, { gameEngine, x, y });

        // states
        this.state = 0; // 0 = idle, 1 = moving
        this.facing = 2; // 0 = N, 1 = NE, 2 = E, 3 = SE, 4 = S, 5 = SW, 6 = W, 7 = NW        
        this.velocity = { x: 0, y: 0 };
        this.damage = 2;
        this.velocity = { x: 0, y: 0 };

        // animations
        this.animations = [];
        this.north = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_north.png");
        this.northeast = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_diagup.png");
        this.east = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_side.png");
        this.southeast = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_diagdown.png");
        this.south = ASSET_MANAGER.getAsset("./topdown_shooter/characters/1_south.png");
        this.loadAnimations();

        this.updateBB();

        // add weapon, weapon is drawn before character
        this.weapon = new Flamethrower(this.gameEngine, this.x + 5 * params.charscale, this.y + 14 * params.charscale, this);
        this.weaponIndex = this.gameEngine.entities.length;
        this.gameEngine.addEntity(this.weapon);
        this.characterIndex = this.gameEngine.entities.length;

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 20 * params.charscale, 24 * params.charscale);
    };

    loadAnimations() {
        const RUN_SPEED = 0.13;

        for (var i = 0; i < 2; i++) { // two states
            this.animations.push([]);
            for (var j = 0; j < 8; j++) { // eight directions
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
        this.animations[1][0] = new Animator(this.north, 0, 0, 20, 24, 4, RUN_SPEED, 0, false, true);
        this.animations[1][1] = new Animator(this.northeast, 0, 0, 20, 24, 4, RUN_SPEED, 0, false, true);
        this.animations[1][2] = new Animator(this.east, 0, 0, 20, 24, 4, RUN_SPEED, 0, false, true);
        this.animations[1][3] = new Animator(this.southeast, 0, 0, 20, 24, 4, RUN_SPEED, 0, false, true);
        this.animations[1][4] = new Animator(this.south, 0, 0, 20, 24, 4, RUN_SPEED, 0, false, true);

    };

    draw(ctx) {

        if (this.facing < 5) {
            this.animations[this.state][this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, params.charscale);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][8 - this.facing].drawFrame(this.gameEngine.clockTick, ctx, -(this.x) - 20 * params.charscale, this.y, params.charscale);
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

        const MIN_RUN = 4 * params.charscale;
        const MAX_RUN = 20 * params.charscale;

        if (this.gameEngine.mouse) {
            this.lastFacing = this.facing;
            this.facing = getFacing(this.gameEngine.mouse, this.x, this.y);

            // swap weapon and character
            if ((this.facing > 2 && this.facing < 6) && (this.lastFacing <= 2 || this.lastFacing >= 6)) {
                this.gameEngine.entities.swap(this.characterIndex, this.weaponIndex);
            } else if ((this.lastFacing > 2 && this.lastFacing < 6) && (this.facing <= 2 || this.facing >= 6)) {
                this.gameEngine.entities.swap(this.characterIndex, this.weaponIndex);
            }
        }

        if (!right && !left && !up && !down) {
            this.state = 0;
            this.velocity = { x: 0, y: 0 };
        }

        // horizontal 
        if (right && !left) {
            this.state = 1;
            this.velocity.x += MIN_RUN;   
        } else if (left && !right) {
            this.state = 1;
            this.velocity.x -= MIN_RUN;
        } else {
            this.velocity.x = 0;
        }
        
        // vertical 
        if (down && !up) {
            this.state = 1;
            this.velocity.y += MAX_RUN;
        } else if (up && !down) {
            this.state = 1;
            this.velocity.y -= MIN_RUN;
        } else {
            this.velocity.y = 0;
        }
        
        // keep character from speeding
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        if (this.velocity.y <= -MAX_RUN) this.velocity.y = -MAX_RUN;
        if (this.velocity.y >= MAX_RUN) this.velocity.y = MAX_RUN;

        // update x and y
        this.x += this.velocity.x * this.gameEngine.clockTick * params.charscale;
        this.y += this.velocity.y * this.gameEngine.clockTick * params.charscale;
        this.updateBB();

        
     
        // canvas collision
        if (this.x < 0) this.x = 0; // left side of canvas collision
        if (this.x > params.canvasWidth - 20 * params.charscale) this.x = params.canvasWidth - 20 * params.charscale; // right side of canvas collision 
        if (this.y < 0) this.y = 0; // top of canvas collision
        if (this.y > params.canvasHeight - 24 * params.charscale) this.y = params.canvasHeight - 24 * params.charscale; // bottom of canvas

        // entity collision
        for (var i = 0; i < this.gameEngine.entities.length; i++) {
            var ent = this.gameEngine.entities[i];
            // base
            if (ent instanceof Base && this.BB.collide(ent.BB)) {
                if (this.lastBB.bottom <= ent.BB.top) { // coming from top
                    this.y = ent.BB.top - 24 * params.charscale;
                    this.velocity.y = 0;
                    this.updateBB();
                }
                if (this.lastBB.top >= ent.BB.bottom) { // coming from right
                    this.y = ent.BB.bottom;
                    this.velocity.y = 0;
                    this.updateBB();
                }
                if (this.lastBB.right <= ent.BB.left) { // coming from left
                    this.x = ent.BB.left - 20 * params.charscale;
                    this.velocity.x = 0;
                    this.updateBB();
                }
                if (this.lastBB.left >= ent.BB.right) { // coming from right
                    this.x = ent.BB.right;
                    this.velocity.x = 0;
                    this.updateBB();
                }
            }

            // enemy
        }

        
    };
}