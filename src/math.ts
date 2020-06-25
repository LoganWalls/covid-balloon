import { StringIndexable } from "./util"

export interface Vector extends StringIndexable {
    x: number,
    y: number,
}

export function asVector(x: number): Vector {
    return { x: x, y: x }
}

export function vclamp(v: Vector, min: number, max: number) {
    return {
        x: Math.min(Math.max(min, v.x), max),
        y: Math.min(Math.max(min, v.y), max)
    }
}


export function vadd(v1: Vector, v2: Vector) {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y,
    }
}

export function vsub(v1: Vector, v2: Vector) {
    return {
        x: v1.x - v2.x,
        y: v1.y - v2.y,
    }
}

export function vmul(v1: Vector, v2: Vector) {
    return {
        x: v1.x * v2.x,
        y: v1.y * v2.y,
    }
}

export function vdiv(v1: Vector, v2: Vector) {
    return {
        x: v1.x / v2.x,
        y: v1.y / v2.y,
    }
}


export function clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(min, x), max)
}

export function range(start: number, stop?: number, step: number = 1) {
    if ((stop === undefined)){
        stop = start
        start = 0
    }
    const result = []
    for (let i = start; i < stop; i += step) {
        result.push(i)
    }
    return result
}