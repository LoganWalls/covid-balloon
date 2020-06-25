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

// Setup Sliders
let controlsContainer = document.getElementById('controls-container')!
let infectionRateSlider = new ValueSlider(
    controlsContainer,
    "Infection Rate",
    range(1, 3, 0.1).map(x => x.toFixed(2)),
    function (slider: ValueSlider, ev: InputEvent) {
        simParams['infectionRate'] = slider.value
    })
let removalRateSlider = new ValueSlider(
    controlsContainer,
    "Removal Rate",
    range(0, 3, 0.1).map(x => x.toFixed(2)),
    function (slider: ValueSlider, ev: InputEvent) {
        simParams['removalRate'] = slider.value
    })


const app = new PIXI.Application({
    // width: 800,
    // height: 600,
    backgroundColor: 0xFFFFFF,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
})
document.getElementById('canvas-container')?.appendChild(app.view)


// Create balloon
const centerX = Math.round(app.view.width / 2)
const centerY = Math.round(app.view.height / 2)
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
    // console.log(simParams.infectedPopulation)
    // console.log(balloon.scaleTarget)
}

app.ticker.add(dynamics)


