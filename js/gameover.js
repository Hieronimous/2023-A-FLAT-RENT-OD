

class Gameover {

    constructor(ctx, canvasSize, gameoverPosX, gameoverPosY, gameoverSizeW, gameoverSizeH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageInstance = undefined
        this.gameoverSpecs = {
            pos: { x: gameoverPosX, y: gameoverPosY },
            size: { w: gameoverSizeW, h: gameoverSizeH },
        }

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/img_gameover.png'
    }

    drawGameover() {
        console.log(this.imageInstance,
            this.gameoverSpecs.pos.x,
            this.gameoverSpecs.pos.y,
            this.gameoverSpecs.size.w,
            this.gameoverSpecs.size.h,)
        this.ctx.drawImage(
            this.imageInstance,
            this.gameoverSpecs.pos.x,
            this.gameoverSpecs.pos.y,
            this.gameoverSpecs.size.w,
            this.gameoverSpecs.size.h,
        )
    }
}




