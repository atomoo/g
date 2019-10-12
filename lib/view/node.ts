import Group from 'zrender/lib/container/Group';
import Circle from 'zrender/lib/graphic/shape/Circle';
import {registerShape} from './shape';
import {NodeOption, Shape} from '../interfaces';

class Node implements Shape {

    public g: any;

    public id: string;

    public options: NodeOption;

    constructor(options: NodeOption) {
        this.id = options.id;
        this.options = options;
    }

    public render() {
        this.g = new Group();
        this.g.position = [this.options.x, this.options.y];
        const circle = new Circle({
            shape: {
                cx: 0,
                cy: 0,
                r: this.options.size /2
            },
            style: {
                fill: '#FFF',
                stroke: '#000'
            },
            z: 10
        });
        this.g.add(circle);

        const center = new Circle({
            shape: {
                cx: 0,
                cy: 0,
                r: 1
            }
        });
        this.g.add(center);
    }
}

registerShape<Node, NodeOption>('Node', Node);

export default Node;
