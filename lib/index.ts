/**
 * @file lib/index
 * @author y
 */
import zrender from 'zrender';
import Circle from 'zrender/lib/graphic/shape/Circle';
import {GraphOption, GraphData, NodeOption, EdgeOption, EdgeGraphOption} from './interfaces';
import {getShapeClazz} from './view';
import Node from './view/node';
import Edge from './view/edge';
import Vector from './helper/vector';

export default class Graph {

    private _zr: any;

    public data: GraphData;

    public g: any;

    private nodes: Node[] = [];

    private edges: Edge[] = [];

    constructor(dom: HTMLElement, options?: GraphOption) {
        options = Object.assign(
            {},
            {
                renderer: 'canvas',
                devicePixelRatio: 2,
                width: 'auto',
                height: 'auto'
            },
            options
        );
        this._zr = zrender.init(dom, options);
    }

    public setData(data: GraphData) {
        this.data = data;
    }

    public getNodeById(id: string): Node {
        return this.nodes.find(node => node.id === id);
    }

    public addNode(node: NodeOption) {
        if (!this.getNodeById(node.id)) {
            const shapeType = node.shape || 'Node';
            const NodeClazz = getShapeClazz<Node, NodeOption>(shapeType);
            const nodeGraph = new NodeClazz(node);
            nodeGraph.render();
            this.nodes.push(nodeGraph);
            this.g.add(nodeGraph.g);
        }
    }

    public addEdge(edge: EdgeOption) {
        const sourceNode = this.getNodeById(edge.source);
        const targetNode = this.getNodeById(edge.target);
        if (sourceNode && targetNode) {
            const shapeType = edge.shape || 'Edge';
            const Clazz = getShapeClazz<Edge, EdgeGraphOption>(shapeType);
            const startNodeCenter = [sourceNode.options.x, sourceNode.options.y];
            const endNodeCenter = [targetNode.options.x, targetNode.options.y];
            const edgePoints = [
                startNodeCenter,
                endNodeCenter
            ];
            const edgeGraph = new Clazz({
                start: edgePoints[0],
                end: edgePoints[1]
            });
            edgeGraph.render();
            this.g.add(edgeGraph.g);
            this.edges.push(edgeGraph);
        }
    }

    public render() {
        this.g = new zrender.Group();
        if (Array.isArray(this.data.nodes)) {
            this.data.nodes.forEach(node => {
                this.addNode(node);
            });
        }
        if (Array.isArray(this.data.edges)) {
            this.data.edges.forEach(edge => {
                this.addEdge(edge);
            });
        }
        this._zr.add(this.g);
    }

    private getEdgePoint(startNodeCenter: number[], endNodeCenter: number[], r: number) {
        const v = new Vector(endNodeCenter[0] - startNodeCenter[0], endNodeCenter[1] - startNodeCenter[1]);
        const normal = v.normalize();
        return [
            startNodeCenter[0] + normal.x * r,
            startNodeCenter[1] + normal.y * r
        ];
    }
}

