
class Enemies {

    constructor(ctx, canvasSize, enemiesPosX, enemiesPosY, enemiesSizeW, enemiesSizeH, platform) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platform = platform
        this.imageInstance = undefined
        this.gravity = 0.5
        this.bullets = []
        this.enemiesSpecs = {
            pos: { x: enemiesPosX, y: enemiesPosY },
            size: { w: enemiesSizeW, h: enemiesSizeH },
            vel: { x: 0.5, y: 0 }
        }

        this.init()
        this.drawEnemies()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/Zombie1_OK.png'
    }

    drawEnemies() {
        this.move()
        this.ctx.drawImage(
            this.imageInstance,
            this.enemiesSpecs.pos.x,
            this.enemiesSpecs.pos.y,
            this.enemiesSpecs.size.w,
            this.enemiesSpecs.size.h,
        )
    }

    move() {

        if (this.enemiesSpecs.pos.x >= this.platform.posX) this.turn()
        if (this.enemiesSpecs.pos.x + this.enemiesSpecs.size.w < this.platform.posX + this.platform.width) this.turn()

        this.enemiesSpecs.pos.x += this.enemiesSpecs.vel.x
    }

    turn() {
        this.enemiesSpecs.vel.x *= -1
    }
}