import Group from 'zrender/lib/container/Group';
import BezierCurve from 'zrender/lib/graphic/shape/BezierCurve';
import Circle from 'zrender/lib/graphic/shape/Circle';
import {getCollisionBetweenCircleAndBezier} from '../helper/utils';
import {EdgeGraphOption, Shape, Point} from '../interfaces';
import {registerShape} from './shape';

class Edge implements Shape {

    public g: Group;

    public options: EdgeGraphOption;

    constructor(options: EdgeGraphOption) {
        this.options = options;
    }

    public render(): void {
        this.g = new Group();
        const {start, end} = this.options;
        const startCenter = [start.options.x, start.options.y];
        const endCenter = [end.options.x, end.options.y];
        const cp = [
            (startCenter[0] + endCenter[0] ) / 2 - (startCenter[1] - endCenter[1]) * 0.7,
            (startCenter[1] + endCenter[1] ) / 2 - (endCenter[0] - startCenter[0]) * 0.7,
        ];
        const curveLine = new BezierCurve({
            shape: {
                x1: startCenter[0],
                y1: startCenter[1],
                x2: endCenter[0],
                y2: endCenter[1],
                cpx1: cp[0],
                cpy1: cp[1],
            },
            style: {
                stroke: '#3498eb',
            },
        });
        const p = getCollisionBetweenCircleAndBezier(
            {center: endCenter as Point, r: end.options.size / 2},
            {p0: startCenter as Point, p1: endCenter as Point, cp: [cp[0], cp[1]]});

        const c = new Circle({
            shape: {
                cx: p[0],
                cy: p[1],
                r: 3,
            },
            style: {
                stroke: '#3498eb',
            },
            z: 100,
        });
        this.g.add(c);
        this.g.add(curveLine);
    }
}

registerShape<Edge, EdgeGraphOption>('Edge', Edge);

export default Edge;
