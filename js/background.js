
class Background {

    constructor(ctx, backgroundPosX, backgroundPosY, backgroundSizeW, backgroundSizeH) {
        this.ctx = ctx
        this.imageInstance = undefined
        this.backgroundSpecs = {
            pos: { x: backgroundPosX, y: backgroundPosY },
            size: { w: backgroundSizeW, h: backgroundSizeH },
        }

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/Fondo_OK.jpg'
    }

    drawBackground() {
        this.ctx.drawImage(
            this.imageInstance,
            this.backgroundSpecs.pos.x,
            this.backgroundSpecs.pos.y,
            this.backgroundSpecs.size.w,
            this.backgroundSpecs.size.h,
        )
    }
}