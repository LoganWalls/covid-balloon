import * as PIXI from "pixi.js"
import { StringIndexable } from "./util"
import { clamp, range } from "./math"
import { Balloon } from "./balloon"
import { ValueSlider } from "./ui"


// Initialize simulation parameters
let simParams: StringIndexable = {
    infectedPopulation: 1.,
    infectionRate: 1.,
    removalRate: 0.,
    maxInfected: 4.,
    minInfected: 0.05,
}
let animParams = {
    ticksPerStep: 45,
    ticksSince: 0,
}


const canvasContainer = document.getElementById('canvas-container')!
const controlsContainer = document.getElementById('controls-container')!

const app = new PIXI.Application({
    resizeTo: canvasContainer,
    backgroundColor: 0xFFFFFF,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
})
canvasContainer.appendChild(app.view)


// Setup Sliders
const infectionRateSlider = new ValueSlider(
    controlsContainer,
    "Infection Rate",
    range(1, 3, 0.1).map(x => x.toFixed(2)),
    function (slider: ValueSlider, ev: InputEvent) {
        simParams['infectionRate'] = slider.value
    })
const removalRateSlider = new ValueSlider(
    controlsContainer,
    "Removal Rate",
    range(0, 3, 0.1).map(x => x.toFixed(2)),
    function (slider: ValueSlider, ev: InputEvent) {
        simParams['removalRate'] = slider.value
    })




// Create balloon
const centerX = Math.round(app.screen.width / 2)
const centerY = Math.round(app.screen.height / 2)
const balloon = new Balloon(app, centerX, centerY, 50, 50)


function dynamics(delta: number) {
    if ((animParams.ticksSince + delta) > animParams.ticksPerStep) {
        animParams.ticksSince = 0
        let newInfectedPop = (
            simParams.infectedPopulation * simParams.infectionRate - simParams.removalRate)
        simParams.infectedPopulation = clamp(newInfectedPop, simParams.minInfected, simParams.maxInfected)
        balloon.scale({
            x: simParams.infectedPopulation,
            y: simParams.infectedPopulation
        }, animParams.ticksPerStep)
    }
    animParams.ticksSince += 1;
    balloon.tick()
}


// Handle window sizing
function resize() {
    const parent = app.view.parentElement!
    const width = parent.clientWidth
    const height = parent.clientHeight
    app.view.width = width
    app.view.style.width = `${width}px`
    app.view.height = height
    app.view.style.height = `${height}px`
    app.renderer.resize(width, height)
    balloon.sprite.position.set(Math.round(app.screen.width / 2), Math.round(app.screen.height / 2))
}



// Start
window.addEventListener('load', function () {
    resize()
    window.addEventListener('resize', resize)
    app.ticker.add(dynamics)
})


