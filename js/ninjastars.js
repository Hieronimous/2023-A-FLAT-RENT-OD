
class Ninjastars {

    constructor(ctx, canvasSize, ninjastarsPosX, ninjastarsPosY, ninjastarsSizeW, ninjastarsSizeH) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.ninjastarsSpecs = {
            pos: { x: ninjastarsPosX, y: ninjastarsPosY, },
            size: { w: ninjastarsSizeW, h: ninjastarsSizeH },
            vel: { x: 10, y: 0 }
        }
        this.drawNinjastars()
    }

    drawNinjastars() {
        this.ninjaMove()
        this.ctx.fillStyle = "yellow"
        this.ctx.fillRect(this.ninjastarsSpecs.pos.x, this.ninjastarsSpecs.pos.y + 60, 25, 10)
    }

    ninjaMove() {
        this.ninjastarsSpecs.pos.x += this.ninjastarsSpecs.vel.x
    }
}