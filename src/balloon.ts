import * as PIXI from "pixi.js"
import { Vector, asVector, vsub, vdiv, vadd } from "./math"


export class Balloon {
    public sprite: PIXI.Sprite
    public scaleTarget: Vector
    private scaleVelocity: Vector

    constructor(app: PIXI.Application, x: number, y: number, width: number, height: number) {
        // Create a sprite texture
        const balloonTexture = new PIXI.Graphics()
        balloonTexture.beginFill(0x8a0000, 1)
        balloonTexture.drawEllipse(x, y, width, height)
        balloonTexture.endFill()

        // Create a sprite from the texture
        let balloon = new PIXI.Sprite(
            app.renderer.generateTexture(
                balloonTexture,
                PIXI.SCALE_MODES.NEAREST,
                2)
        )
        balloon.anchor.set(0.5)
        balloon.position.set(x, y)
        balloon.interactive = true
        balloon.buttonMode = true

        // Initialize sprite/animation
        this.sprite = balloon
        this.scaleTarget = balloon.scale
        this.scaleVelocity = { x: 0, y: 0 }

        // Add the sprite to the stage
        app.stage.addChild(this.sprite)
    }

    scale(target: Vector, duration: number) {
        this.scaleTarget = target
        this.scaleVelocity = vdiv(vsub(target, this.sprite.scale), asVector(duration))
    }

    tick() {
        const distance = vsub(this.scaleTarget, this.sprite.scale)
        if (Math.abs(distance.x) < Math.abs(this.scaleVelocity.x)) {
            this.scaleVelocity.x = distance.x
        }
        if (Math.abs(distance.y) < Math.abs(this.scaleVelocity.y)) {
            this.scaleVelocity.x = distance.y
        }
        const scale = vadd(this.sprite.scale, this.scaleVelocity)
        this.sprite.scale.set(scale.x, scale.y)
    }
}