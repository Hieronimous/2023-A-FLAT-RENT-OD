
const game = {

    appName: '2023: A FLAT RENT ODYSSEY',
    author: 'Helena y Victor',
    version: '1.0.0',
    license: undefined,
    description: 'Basic plattform game',
    ctx: undefined,
    framesIndex: 0,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    player: undefined,
    background: undefined,
    gravity: undefined,
    platforms: undefined,
    key: undefined,
    winner: undefined,
    gameover: undefined,
    gameInterval: undefined,
    platArray: [],
    enemies: [],
    backgroundAudio: new Audio('./sounds/plat.mp3'),
    finalAudio: new Audio('./sounds/chotis.mp3'),
    keySound: new Audio('./sounds/Gold.mp3'),
    monsterSound: new Audio('./sounds/monster.mp3'),
    canvasSize: {
        w: undefined,
        h: undefined
    },

    getPlatformsData() {
        return [
            {
                posX: 0,
                posY: this.canvasSize.h / 3,
                width: this.canvasSize.w / 6,
                height: 30,
            },
            {
                posX: this.canvasSize.w / 2 - ((this.canvasSize.w / 3) / 2),
                posY: this.canvasSize.h / 2.2,
                width: this.canvasSize.w / 3,
                height: 30,
            },
            {
                posX: this.canvasSize.w - (this.canvasSize.w / 4),
                posY: this.canvasSize.h / 1.6,
                width: this.canvasSize.w / 4,
                height: 30,
            },
            {
                posX: 0,
                posY: this.canvasSize.h / 1.6,
                width: this.canvasSize.w / 5,
                height: 30,
            },
            {
                posX: this.canvasSize.w / 4.4,
                posY: this.canvasSize.h / 1.5,
                width: this.canvasSize.w / 20,
                height: 30
            },
            {
                posX: this.canvasSize.w / 3.5,
                posY: this.canvasSize.h / 1.4,
                width: this.canvasSize.w / 20,
                height: 30
            },
            {
                posX: 0,
                posY: this.canvasSize.h - 50,
                width: this.canvasSize.w,
                height: 50
            },
            {
                posX: this.canvasSize.w - (this.canvasSize.w / 3),
                posY: this.canvasSize.h / 4.4,
                width: this.canvasSize.w / 3,
                height: 30
            }
        ]
    },

    getPlaform(index) {
        return this.getPlatformsData()[index]
    },

    init() {
        this.setContext()
        this.setDimensions()
        this.start()
        this.createPlayer()
        this.createEnemies()
        this.createPlatforms()
        this.createDoor()
        this.createKey()
        this.createWinner()
        this.createGameover()
        this.createBackground()
        addEventListener('keydown', e => {

            if (e.key === 'ArrowRight') {

                this.backgroundAudio.play()

            }
        })
    },

    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },

    start() {

        this.gameInterval = setInterval(() => {

            this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++
            this.framesCounter++
            this.clearAll()
            this.drawAll()
            this.clearNinjastars()
            this.clearArrows()
            this.isPlayerCollision()
            this.isNinjastarCollision()
            this.isArrowCollision()

        }, 100 / this.FPS)
    },

    createBackground() {
        this.background = new Background(this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize, 50, 0, 75, 90, this.enemies)
    },

    createGameover() {
        this.gameover = new Gameover(this.ctx, this.canvasSize, 500, 200, this.canvasSize.w / 2.5, this.canvasSize.h / 2.5)
    },

    createWinner() {
        this.winner = new Winner(this.ctx, this.canvasSize, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createPlatforms() {
        this.platArray = this.getPlatformsData().map(elm => new Platforms(this.ctx, this.canvasSize, elm.posX, elm.posY, elm.width, elm.height))
    },

    createEnemies() {
        this.enemies.push(
            new Enemies(this.ctx, this.canvasSize, this.canvasSize.w / 2 - ((this.canvasSize.w / 4.5) / 2), (this.canvasSize.h / 2.2) - 130, 70, 130, this.getPlaform(1)),
            new Enemies(this.ctx, this.canvasSize, this.canvasSize.w - (this.canvasSize.w / 5), (this.canvasSize.h / 1.6) - 130, 70, 130, this.getPlaform(2)),
            new Enemies(this.ctx, this.canvasSize, 100, (this.canvasSize.h / 1.6) - 130, 70, 130, this.getPlaform(3)),
            new Enemies(this.ctx, this.canvasSize, 45, this.canvasSize.h - 180, 70, 130, this.getPlaform(6)),
            new Enemies(this.ctx, this.canvasSize, this.canvasSize.w - 100, this.canvasSize.h - 180, 70, 130, this.getPlaform(6)),
            new Enemies(this.ctx, this.canvasSize, this.canvasSize.w - (this.canvasSize.w / 3), (this.canvasSize.h / 4.4) - 130, 70, 130, this.getPlaform(7))
        )
    },

    createDoor() {
        this.door = new Door(this.ctx, this.canvasSize, this.canvasSize.w / 20, this.canvasSize.h - 200, 70, 150)
    },

    createKey() {
        this.key = new Key(this.ctx, this.canvasSize, this.canvasSize.w - (this.canvasSize.w / 3.5), (this.canvasSize.h / 4.4) - 90, 90, 70)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        this.background.drawBackground()
        this.enemies.forEach(elm => elm.drawEnemies())
        this.platArray.forEach(plataforma => plataforma.drawPlatforms())
        this.player.drawPlayer(this.framesCounter)
        this.isEnemiesDead()
        this.playerPosition()
        this.displayDoor()
    },

    playerPosition() {
        for (let i = 0; i < this.platArray.length; i++) {
            const plat = this.platArray[i]
            if (
                this.player.playerSpecs.pos.y +
                this.player.playerSpecs.size.h <=
                plat.platformSpecs.pos.y &&
                this.player.playerSpecs.pos.y +
                this.player.playerSpecs.size.h +
                this.player.playerSpecs.vel.y >=
                plat.platformSpecs.pos.y &&
                plat.platformSpecs.pos.x +
                plat.platformSpecs.size.w >=
                this.player.playerSpecs.pos.x &&
                this.player.playerSpecs.pos.x +
                this.player.playerSpecs.size.w >
                plat.platformSpecs.pos.x &&
                this.player.playerSpecs.pos.x <
                plat.platformSpecs.pos.x +
                plat.platformSpecs.size.w
            ) {
                this.player.playerSpecs.vel.y = 0
                this.player.playerSpecs.pos.y =
                    plat.platformSpecs.pos.y - this.player.playerSpecs.size.h
            }
        }
    },

    isPlayerCollision() {
        for (let i = 0; i < this.enemies.length; i++) {
            const eachEnemie = this.enemies[i]
            if (this.player.playerSpecs.pos.x <
                eachEnemie.enemiesSpecs.pos.x +
                eachEnemie.enemiesSpecs.size.w &&
                this.player.playerSpecs.pos.x +
                this.player.playerSpecs.size.w >
                eachEnemie.enemiesSpecs.pos.x &&

                this.player.playerSpecs.pos.y <
                eachEnemie.enemiesSpecs.pos.y +
                eachEnemie.enemiesSpecs.size.h &&

                this.player.playerSpecs.size.h +
                this.player.playerSpecs.pos.y >
                eachEnemie.enemiesSpecs.pos.y) {
                clearInterval(this.gameInterval)
                this.gameover.drawGameover()
                this.backgroundAudio.pause()
                this.monsterMusic()
            }
        }
    },

    isNinjastarCollision() {
        this.enemies.forEach((enemy, i) => {
            this.player.ninjastars.forEach((star, j) => {
                if (enemy.enemiesSpecs.pos.x <
                    star.ninjastarsSpecs.pos.x +
                    star.ninjastarsSpecs.size.w &&
                    enemy.enemiesSpecs.pos.x +
                    enemy.enemiesSpecs.size.w >
                    star.ninjastarsSpecs.pos.x &&

                    enemy.enemiesSpecs.pos.y - 50 <
                    star.ninjastarsSpecs.pos.y +
                    star.ninjastarsSpecs.size.h &&

                    enemy.enemiesSpecs.size.h +
                    enemy.enemiesSpecs.pos.y - 50 >
                    star.ninjastarsSpecs.pos.y) {
                    this.enemies.splice(i, 1)
                    this.player.ninjastars.splice(j, 1)
                }
            })
        })
    },

    isArrowCollision() {
        this.enemies.forEach((enemy, i) => {
            this.player.arrows.forEach((arrow, j) => {
                if (enemy.enemiesSpecs.pos.x <
                    arrow.arrowsSpecs.pos.x +
                    arrow.arrowsSpecs.size.w &&
                    enemy.enemiesSpecs.pos.x +
                    enemy.enemiesSpecs.size.w >
                    arrow.arrowsSpecs.pos.x &&

                    enemy.enemiesSpecs.pos.y - 50 <
                    arrow.arrowsSpecs.pos.y +
                    arrow.arrowsSpecs.size.h &&

                    enemy.enemiesSpecs.size.h +
                    enemy.enemiesSpecs.pos.y - 50 >
                    arrow.arrowsSpecs.pos.y) {
                    this.enemies.splice(i, 1)
                    this.player.arrows.splice(j, 1)
                }
            })
        })
    },

    isKeycollision() {
        if (this.player.playerSpecs.pos.x <
            this.key.keySpecs.pos.x +
            this.key.keySpecs.size.w &&
            this.player.playerSpecs.pos.x +
            this.player.playerSpecs.size.w >
            this.key.keySpecs.pos.x &&

            this.player.playerSpecs.pos.y <
            this.key.keySpecs.pos.y +
            this.key.keySpecs.size.h &&

            this.player.playerSpecs.size.h +
            this.player.playerSpecs.pos.y >
            this.key.keySpecs.pos.y) {
            this.key = undefined
            this.keyMusic()
        }
    },

    isEnemiesDead() {
        if (this.enemies.length === 0 && this.key !== undefined) {
            {
                this.key.drawKey(), this.isKeycollision()
            }
        }
    },

    displayDoor() {
        if (this.enemies.length === 0 && this.key === undefined) {
            this.door.drawDoor(), this.isDoorCollision()
        }
    },

    isDoorCollision() {
        if (this.player.playerSpecs.pos.x <
            this.door.doorSpecs.pos.x +
            this.door.doorSpecs.size.w &&
            this.player.playerSpecs.pos.x >
            this.door.doorSpecs.pos.x &&

            this.player.playerSpecs.pos.y <
            this.door.doorSpecs.pos.y +
            this.door.doorSpecs.size.h &&

            this.player.playerSpecs.size.h +
            this.player.playerSpecs.pos.y >
            this.door.doorSpecs.pos.y) {
            clearInterval(this.gameInterval)
            this.clearAll()

            this.winner.drawWinner()
            this.party()
        }
    },

    clearNinjastars() {
        this.player.ninjastars = this.player.ninjastars.filter(eachstar => eachstar.ninjastarsSpecs.pos.x < this.canvasSize.w)
    },

    clearArrows() {
        this.player.arrows = this.player.arrows.filter(eachArrow => eachArrow.arrowsSpecs.pos.x > 0)
    },

    party() {
        this.backgroundAudio.pause()
        this.finalAudio.play()
    },

    keyMusic() {
        this.keySound.loop = false;
        this.keySound.play()
    },

    monsterMusic() {
        this.monsterSound.play()
    }
}


