
class Winner {

    constructor(ctx, canvasSize, winnerPosX, winnerPosY, winnerSizeW, winnerSizeH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageInstance = undefined
        this.winnerSpecs = {
            pos: { x: winnerPosX, y: winnerPosY },
            size: { w: winnerSizeW, h: winnerSizeH },
        }
        this.intanceWinner()
        this.drawWinner()
    }

    intanceWinner() {
        this.image = new Image()
        this.image.src = './img/winner.jpg'
    }

    drawWinner() {
        this.ctx.drawImage(
            this.image,
            this.winnerSpecs.pos.x,
            this.winnerSpecs.pos.y,
            this.winnerSpecs.size.w,
            this.winnerSpecs.size.h,
        )
    }
}