
class Arrows {

    constructor(ctx, canvasSize, arrowsPosX, arrowsPosY, arrowsSizeW, arrowsSizeH) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.arrowsSpecs = {
            pos: { x: arrowsPosX, y: arrowsPosY, },
            size: { w: arrowsSizeW, h: arrowsSizeH },
            vel: { x: 10, y: 0 }
        }
        this.drawArrows()
    }

    drawArrows() {
        this.arrowMove()
        this.ctx.fillStyle = "yellow"
        this.ctx.fillRect(this.arrowsSpecs.pos.x, this.arrowsSpecs.pos.y + 60, 25, 10)
    }

    arrowMove() {
        this.arrowsSpecs.pos.x -= this.arrowsSpecs.vel.x
    }
}