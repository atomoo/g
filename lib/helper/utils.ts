import {BezierShap, CircleShap, Point} from '../interfaces';

function quadraticBezier(p0: Point, cp: Point, p1: Point, t: number): Point {
    const k = 1 - t;
    const x = k * k * p0[0] + 2 * ( 1 - t ) * t * cp[0] + t * t * p1[0];
    const y = k * k * p0[1] + 2 * ( 1 - t ) * t * cp[1] + t * t * p1[1];
    return [x, y];
}

function distance(p0: Point, p1: Point): number {
    return Math.sqrt(Math.pow(p0[0] - p1[0], 2) + Math.pow(p0[1] - p1[1], 2));
}

export function getCollisionBetweenCircleAndBezier(circle: CircleShap, bezier: BezierShap): Point {
    let tempDistance = Infinity;
    let tempPoint = circle.center;
    for (let index = 0; index < 100; index++) {
        const p = quadraticBezier(bezier.p0, bezier.cp, bezier.p1, index / 100);
        const d = Math.abs(distance(circle.center, p) - circle.r);
        if (d < tempDistance) {
            tempDistance = d;
            tempPoint = p;
        }
        else {
            break;
        }
    }
    return tempPoint;
}
