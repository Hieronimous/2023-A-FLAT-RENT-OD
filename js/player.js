
class Player {

    constructor(ctx, canvasSize, playerPosX, playerPosY, playerSizeW, playerSizeH, enemiesArray) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemiesArray = enemiesArray
        this.imageInstance1 = undefined
        this.imageInstance2 = undefined
        this.gravity = 0.2
        this.ninjastars = []
        this.arrows = []
        this.keys = {
            ArrowLeft: {
                pressed: false,
            },
            ArrowRight: {
                pressed: false,
            }
        }

        this.playerSpecs = {
            pos: { x: playerPosX, y: playerPosY },
            size: { w: playerSizeW, h: playerSizeH },
            vel: { x: 5, y: 0 }
        }

        this.isMovinRight = false
        this.isMovinLeft = false

        this.init()
        this.drawPlayer()
        this.setEventListeners()
    }

    init() {
        this.imageInstance1 = new Image()
        this.imageInstance1.src = './img/female_walk_right_OK.png'
        this.imageInstance1.frames = 3
        this.imageInstance1.framesIndex = 0
        this.imageInstance2 = new Image()
        this.imageInstance2.src = './img/female_walk_left_OK.png'
        this.imageInstance2.frames = 3
        this.imageInstance2.framesIndex = 0
    }

    drawPlayer(framesCounter) {
        if (this.isMovinRight) {
            this.ctx.drawImage(
                this.imageInstance1,
                this.imageInstance1.width / this.imageInstance1.frames * this.imageInstance1.framesIndex,
                0,
                this.imageInstance1.width / this.imageInstance1.frames,
                this.imageInstance1.height,
                this.playerSpecs.pos.x,
                this.playerSpecs.pos.y,
                this.playerSpecs.size.w,
                this.playerSpecs.size.h,
            )
            this.animate(framesCounter)
        }
        if (this.isMovinLeft) {
            this.ctx.drawImage(
                this.imageInstance2,
                this.imageInstance2.width / this.imageInstance1.frames * this.imageInstance1.framesIndex,
                0,
                this.imageInstance2.width / this.imageInstance1.frames,
                this.imageInstance2.height,
                this.playerSpecs.pos.x,
                this.playerSpecs.pos.y,
                this.playerSpecs.size.w,
                this.playerSpecs.size.h,
            )
            this.animate2(framesCounter)
        }
        this.move()
        this.drawNinjastars()
        this.drawArrows()
        if (!this.isMovinLeft && !this.isMovinRight) {
            this.ctx.drawImage(
                this.imageInstance1,
                this.imageInstance1.width / this.imageInstance1.frames * this.imageInstance1.framesIndex,
                0,
                this.imageInstance1.width / this.imageInstance1.frames,
                this.imageInstance1.height,
                this.playerSpecs.pos.x,
                this.playerSpecs.pos.y,
                this.playerSpecs.size.w,
                this.playerSpecs.size.h,
            )
        }
    }

    animate(framesCounter) {
        if (framesCounter % 3 === 0) {
            this.imageInstance1.framesIndex++
        }
        if (this.imageInstance1.framesIndex >= this.imageInstance1.frames) {
            this.imageInstance1.framesIndex = 0
        }
    }

    animate2(framesCounter) {
        if (framesCounter % 3 === 0) {
            this.imageInstance1.framesIndex++
        }
        if (this.imageInstance1.framesIndex >= this.imageInstance1.frames) {
            this.imageInstance1.framesIndex = 0
        }
    }

    drawNinjastars() {
        this.ninjastars.forEach(elm => {
            elm.drawNinjastars()
        })
    }

    drawArrows() {
        this.arrows.forEach(elm => {
            elm.drawArrows()
        })
    }

    move() {
        if (this.playerSpecs.pos.x > this.canvasSize.w - this.playerSpecs.size.w) this.newPlaceRight()
        if (this.playerSpecs.pos.x < 0) this.newPlaceLeft()

        this.playerSpecs.pos.x += this.playerSpecs.vel.x
        this.playerSpecs.pos.y += this.playerSpecs.vel.y

        if (this.playerSpecs.pos.y +
            this.playerSpecs.size.h +
            this.playerSpecs.vel.y <= this.canvasSize.h - this.playerSpecs.size.w) {
            this.playerSpecs.vel.y += this.gravity

        } else {
            this.playerSpecs.vel.y = 0
        }

        this.playerSpecs.vel.x = 0
        if (this.keys.ArrowRight.pressed) this.playerSpecs.vel.x = 1
        else if (this.keys.ArrowLeft.pressed) this.playerSpecs.vel.x = -1
    }

    newPlaceRight() {
        this.playerSpecs.pos.x = this.canvasSize.w - this.playerSpecs.size.w
    }

    newPlaceLeft() {
        this.playerSpecs.pos.x = 0
    }

    createNinjastars() {
        this.ninjastars.push(new Ninjastars(this.ctx, this.canvasSize, this.playerSpecs.pos.x, this.playerSpecs.pos.y - (this.playerSpecs.size.h - 60), 3, 3))
    }

    createArrows() {
        this.arrows.push(new Arrows(this.ctx, this.canvasSize, this.playerSpecs.pos.x, this.playerSpecs.pos.y - (this.playerSpecs.size.h - 60), 3, 3))
    }

    setEventListeners() {
        addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowRight':
                    this.keys.ArrowRight.pressed = true
                    this.isMovinRight = true
                    break
                case 'ArrowLeft':
                    this.keys.ArrowLeft.pressed = true
                    this.isMovinLeft = true
                    break
                case 'ArrowUp':
                    if (this.playerSpecs.vel.y === 0) {
                        this.playerSpecs.vel.y = -10
                        this.jump()
                    }
                    break
                case 'd':
                    this.createNinjastars()
                    this.shoot()
                    break
                case 'a':
                    this.createArrows()
                    this.shoot()
                    break
            }
        })
        addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowRight':
                    this.keys.ArrowRight.pressed = false
                    this.isMovinRight = false
                    break
                case 'ArrowLeft':
                    this.keys.ArrowLeft.pressed = false
                    this.isMovinLeft = false
                    break
            }
        })
    }

    shoot() {
        this.shootSound = new Audio()
        this.shootSound.src = "./sounds/laser.mp3"
        this.shootSound.volume = 1
        this.shootSound.play()
    }

    jump() {
        this.jumpSound = new Audio()
        this.jumpSound.src = "./sounds/Jump.mp3"
        this.jumpSound.volume = 1
        this.jumpSound.play()
    }
}



