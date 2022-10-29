import kaboom from "kaboom"

kaboom()

loadSprite("player", "sprites/player.png")
loadSprite('grass', 'sprites/grass.png')
loadSprite('enemy', 'sprites/enemy.png')

scene('game', () => {
	const SPEED = 50;

	debug.inspect = true
	const player = add([
		sprite('player'),
		pos(center()),
		area(),
		solid(),
	])

	// Game Variables
	const PLAYER_SPEED = 300
	const BULLET_SPEED = PLAYER_SPEED * 1.5;
	const ENEMY_SPEED = 150

	var ENEMY_DIRECTION = DOWN

	function spawnEnemy() {
		add([
			sprite('enemy'),
			pos(rand(0, width()) ,0),
			area(),
			move(DOWN, 50),
			'enemy',
		])
	}



	const grass = add([
		sprite("grass"),
		pos(80,80),
		area(),
		'grass',
		solid(),
		
	])

	


	function makeGrassWall(p) {
		add([
			sprite("grass"),
			pos(p),
			area(),
			'grass',
		])	
	}
	
	onKeyDown('v', () => {
		makeGrassWall(player.pos.sub(0,50))
	})

	onKeyDown('left', () => {
		player.move(-PLAYER_SPEED, 0)
	})
	onKeyDown('right', () => {
		player.move(PLAYER_SPEED, 0)
	})
	onKeyDown('up', () => {
		player.move(0, -PLAYER_SPEED)
	})
	onKeyDown('down', () => {
		player.move(0, PLAYER_SPEED)
	})
	
	function spawnBullet(p) {
		add([
			rect(12, 48),
			area(),
			pos(p),
			color(127, 127, 255),
			outline(4),
			move(UP, BULLET_SPEED),
			cleanup(),
			solid(),
			// strings here means a tag
			"bullet",
		])
	}
	
	onUpdate("bullet", (b) => {
		b.color = rand(rgb(0, 0, 0), rgb(255, 255, 255))
	})

	onCollide('bullet', 'enemy', (b, e) => {
		destroy(e)
	})
	
	onKeyPress("space", () => {
		spawnBullet(player.pos.sub(-20, 20))
	})


	spawnEnemy()

})


go('game');



