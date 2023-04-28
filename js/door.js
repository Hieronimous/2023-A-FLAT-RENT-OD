
class Door {

    constructor(ctx, canvasSize, doorPosX, doorPosY, doorSizeW, doorSizeH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageInstance = undefined
        this.doorSpecs = {
            pos: { x: doorPosX, y: doorPosY },
            size: { w: doorSizeW, h: doorSizeH },
        }

        this.init()
        this.drawDoor()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/d.png'
    }

    drawDoor() {
        this.ctx.drawImage(
            this.imageInstance,
            this.doorSpecs.pos.x,
            this.doorSpecs.pos.y,
            this.doorSpecs.size.w,
            this.doorSpecs.size.h,
        )
    }
}




