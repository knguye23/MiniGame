class Base {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});
        
        this.gameEngine.base = this;

        this.img = ASSET_MANAGER.getAsset("./topdown_shooter/other/base.png");
        this.base = new Animator(this.img, 0, 0, this.framewidth = 48, this.frameheight = 48, 1, 1, 0, false, true);
        // stats
        this.HP;

        this.xOffset = this.framewidth/2 * params.basescale;
        this.yOffset = this.frameheight/2 * params.basescale;
        
        this.BB = new BoundingBox(this.x - this.xOffset, this.y - this.yOffset, this.framewidth * params.basescale, this.frameheight * params.basescale);
    }

    draw(ctx) {     
        this.base.drawFrame(this.gameEngine.clockTick, ctx, this.x - this.xOffset, this.y - this.yOffset, params.basescale);

        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

    };

    update() {

    }
}