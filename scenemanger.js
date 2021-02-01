class Scenemanager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.elapsedTime = 0;
        this.loadObjects();
    };

    loadObjects() {
        this.elapsedTime += this.gameEngine.clockTick;

        var grass = new Background(this.gameEngine);
        this.gameEngine.addEntity(grass);

        var player = new Character(this.gameEngine, 500, 600);
        this.gameEngine.addEntity(player);

        var base = new Base(this.gameEngine, 1350/2, 900/2);
        this.gameEngine.addEntity(base);

        for(var i = 0; i < 2; i++) {
            this.gameEngine.addEntity(new Slime(this.gameEngine, 0, randomInt(params.canvasHeight+1)));
            this.gameEngine.addEntity(new Slime(this.gameEngine, params.canvasWidth, randomInt(params.canvasHeight+1)));

        }

        
    };
}