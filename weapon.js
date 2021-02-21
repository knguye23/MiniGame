class Flamethrower {
    constructor(gameEngine, x, y, shooter) {
        Object.assign(this, { gameEngine, x, y, shooter });

        this.damage = 10;
        this.range = 100 * params.weaponscale;
        this.facing = this.shooter.facing;
        this.animations = [];
        this.north = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_up.png");
        this.northeast = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_diagup.png");
        this.east = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_side.png");
        this.southeast = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_diagdown.png");
        this.south = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_down.png");

        this.loadAnimations();

    };

    loadAnimations() {
        this.animations[0] = new Animator(this.north, 0, 0, 14, 17, 1, 1, 0, false, true);
        this.animations[1] = new Animator(this.northeast, 0, 0, 16, 16, 1, 1, 0, false, true);
        this.animations[2] = new Animator(this.east, 0, 0, 26, 9, 1, 1, 0, false, true);
        this.animations[3] = new Animator(this.southeast, 0, 0, 19, 14, 1, 1, 0, false, true);
        this.animations[4] = new Animator(this.south, 0, 0, 14, 17, 1, 1, 0, false, true);
    };

    draw(ctx) {
        const YOFFSET = 20;
        var yOffset = 0;
        var width = 0;

        switch (this.facing) {
            case 0:
                yOffset += YOFFSET;
                this.animations[this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y - yOffset, params.weaponscale);
                break;
            case 1:
                yOffset += YOFFSET;
                this.animations[this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x + 15, this.y - yOffset, params.weaponscale);
                break;
            case 2:
                this.animations[this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y - yOffset, params.weaponscale);
                break;

            case 3:
                this.animations[this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y - yOffset, params.weaponscale);
                break;
            case 4:
                this.animations[this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y - yOffset, params.weaponscale);
                break;
            case 5:
                width = 19;
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[8 - this.facing].drawFrame(this.gameEngine.clockTick, ctx, -(this.x) - width * params.weaponscale + 5 * params.charscale, this.y - yOffset, params.weaponscale);
                ctx.restore();
                break;
            case 6:
                width = 26;
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[8 - this.facing].drawFrame(this.gameEngine.clockTick, ctx, -(this.x) - width * params.weaponscale + 10 * params.charscale, this.y - yOffset, params.weaponscale);
                ctx.restore();
                break;
            case 7:
                yOffset += YOFFSET;
                width = 16;
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[8 - this.facing].drawFrame(this.gameEngine.clockTick, ctx, -(this.x) - width * params.weaponscale + 5 * params.charscale, this.y - yOffset, params.weaponscale);
                ctx.restore();
                break;

        }

    };

    update() {
        // update facing
        this.facing = this.shooter.facing;

        // update position
        this.x = this.shooter.x + 5 * params.charscale;
        this.y = this.shooter.y + 14 * params.charscale;

        // shoot
        var xOffset = 0;
        var yOffset = 0;
        if (this.gameEngine.click) {
            switch (this.facing) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
            }

            this.gameEngine.addEntity(new Bullet(this.gameEngine, this.x, this.y, this.gameEngine.mouse, this));
        }

    };
}
