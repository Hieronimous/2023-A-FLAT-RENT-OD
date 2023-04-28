
class Key {

    constructor(ctx, canvasSize, keyPosX, keyPosY, keySizeW, keySizeH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageInstance = undefined
        this.keySpecs = {
            pos: { x: keyPosX, y: keyPosY },
            size: { w: keySizeW, h: keySizeH },
        }

        this.init()
        this.drawKey()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/key.png'
    }

    drawKey() {
        this.ctx.drawImage(
            this.imageInstance,
            this.keySpecs.pos.x,
            this.keySpecs.pos.y,
            this.keySpecs.size.w,
            this.keySpecs.size.h,
        )
    }
}