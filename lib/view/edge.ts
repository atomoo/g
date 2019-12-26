import Group from 'zrender/lib/container/Group';
import Line from 'zrender/lib/graphic/shape/Line';
import BezierCurve from 'zrender/lib/graphic/shape/BezierCurve';
import Circle from 'zrender/lib/graphic/shape/Circle';
import {registerShape} from './shape';
import {Shape, EdgeGraphOption} from '../interfaces';
import { getCollisionBetweenCircleAndBezier } from '../helper/utils';

class Edge implements Shape {

    public g: Group;

    public options: EdgeGraphOption;

    constructor(options: EdgeGraphOption) {
        this.options = options;
    }

    public render() {
        this.g = new Group();
        const {start, end} = this.options;
        const line = new Line({
            shape: {
                x1: start[0],
                y1: start[1],
                x2: end[0],
                y2: end[1]
            }
        });
        this.g.add(line);
        const cp = [
            (start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[1]) * 0.8,
            ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[0]) * 0.8
        ]
        const curveLine = new BezierCurve({
            shape: {
                x1: start[0],
                y1: start[1],
                x2: end[0],
                y2: end[1],
                cpx1: cp[0],
                cpy1: cp[1],
            },
            style: {
                stroke: '#3498eb',
            },
        });
        const p = getCollisionBetweenCircleAndBezier(
            {center: [start[0], start[1]], r: 30},
            {p0: [start[0], start[1]], p1: [end[0], end[1]], cp: [cp[0], cp[1]]});
        const c = new Circle({
            shape: {
                cx: p[0],
                cy: p[1],
                r: 3
            },
            style: {
                stroke: '#3498eb'
            },
            z: 100
        });
        this.g.add(c);
        this.g.add(curveLine);
    }
}

registerShape<Edge, EdgeGraphOption>('Edge', Edge);

export default Edge;
