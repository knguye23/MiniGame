class Background {
    constructor(gameEngine) {
        Object.assign(this, {gameEngine});
        
        this.grass = ASSET_MANAGER.getAsset("./topdown_shooter/background/grass1.png");
        this.animation = new Animator(this.grass, 0, 0, 1350, 900, 1, 1, 0, false, true);
    }; 

    draw(ctx) {
        this.animation.drawFrame(this.gameEngine.clockTick, ctx, 0, 0, 1);
    };

    update() {};
}