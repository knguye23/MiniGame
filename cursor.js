class Cursor {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        if (this.gameEngine.mouse) {
            this.mouseX = this.gameEngine.mouse.x;
            this.mouseY = this.gameEngine.mouse.y;
        }

        this.img = ASSET_MANAGER.getAsset("./topdown_shooter/cursors/4crosshair.png");
        this.animation = new Animator(this.img, 0, 0, 31, 31, 1, 1, 0, false, true);
    };

    draw(ctx) {
        var xOffset = 31/2 * params.cursorscale;
        var yOffset = 31/2 * params.cursorscale;

        this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.mouseX - xOffset, this.mouseY - yOffset);
    };

    update() {

    };
}