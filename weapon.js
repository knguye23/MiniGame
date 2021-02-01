class Flamethrower {
    constructor(gameEngine, x, y, facing) {
        Object.assign(this, {gameEngine, x, y, facing});

        this.animations = [];
        this.north = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_up.png");
        this.northeast = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_diagup.png");
        this.east = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_side.png");
        this.southeast = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_diagdown.png");
        this.south = ASSET_MANAGER.getAsset("./topdown_shooter/guns/flamthrower/flamethrower_down.png");

    };

    loadAnimations() {
        this.animations[0] = new Animator(this.north, 0, 0, 14, 17, 1, 1, 0, false, true);
        this.animations[1] = new Animator(this.north, 0, 0, 16, 16, 1, 1, 0, false, true);
        this.animations[2] = new Animator(this.north, 0, 0, 26, 9, 1, 1, 0, false, true);
        this.animations[3] = new Animator(this.north, 0, 0, 19, 14, 1, 1, 0, false, true);
        this.animations[4] = new Animator(this.north, 0, 0, 14, 17, 1, 1, 0, false, true);

    }
    draw(ctx) {
        
        if (this.facing < 5) {
            this.animations[this.facing].drawFrame(this.gameEngine.clockTick, ctx, this.x - pageXOffset, this.y - pageYOffset, params.weaponscale);
        }
    };

    update() {

    };
}
