var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// character
ASSET_MANAGER.queueDownload("./topdown_shooter/characters/1_north.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/characters/1_diagup.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/characters/1_side.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/characters/1_diagdown.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/characters/1_south.png");
// weapon
ASSET_MANAGER.queueDownload("./topdown_shooter/guns/flamthrower/flamethrower_up.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/guns/flamthrower/flamethrower_diagup.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/guns/flamthrower/flamethrower_side.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/guns/flamthrower/flamethrower_diagdown.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/guns/flamthrower/flamethrower_down.png");

// bullet
ASSET_MANAGER.queueDownload("./topdown_shooter/other/flamethrower_bullet.png");

//enemy
ASSET_MANAGER.queueDownload("./topdown_shooter/monster/slime1_front.png");

// background
ASSET_MANAGER.queueDownload("./topdown_shooter/background/grass.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/background/grass1.png");
ASSET_MANAGER.queueDownload("./topdown_shooter/background/MiniGameMap.png");


// base
ASSET_MANAGER.queueDownload("./topdown_shooter/other/base.png");

// cursor
ASSET_MANAGER.queueDownload("./topdown_shooter/cursors/4crosshair.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);
	new Scenemanager(gameEngine);
	gameEngine.start();
});
