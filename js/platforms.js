

class Platforms {

    constructor(ctx, canvasSize, platformPosX, platformPosY, platformSizeW, platformSizeH, id) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.id = id
        this.platformSpecs = {
            pos: { x: platformPosX, y: platformPosY },
            size: { w: platformSizeW, h: platformSizeH },
        }

        this.imageInstance()
        this.drawPlatforms()
    }

    imageInstance() {
        this.image = new Image
        this.image.src = './img/viga2.jpg'
    }

    drawPlatforms() {
        this.ctx.drawImage(
            this.image,
            this.platformSpecs.pos.x,
            this.platformSpecs.pos.y,
            this.platformSpecs.size.w,
            this.platformSpecs.size.h,
        )
    }
}