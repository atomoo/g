/**
 * @file lib/index
 * @author y
 */
import zrender from 'zrender';
import Vector from './helper/vector';
import {EdgeGraphOption, EdgeOption, GraphData, GraphOption, NodeOption, Point} from './interfaces';
import {getShapeClazz} from './view';
import Edge from './view/edge';
import Node from './view/node';

export default class Graph {

    public data: GraphData;

    public g: any;

    private zr: any;

    private nodes: Node[] = [];

    private edges: Edge[] = [];

    constructor(dom: HTMLElement, options?: GraphOption) {
        options = Object.assign(
            {},
            {
                renderer: 'canvas',
                devicePixelRatio: 2,
                width: 'auto',
                height: 'auto',
            },
            options,
        );
        this.zr = zrender.init(dom, options);
    }

    public setData(data: GraphData): void {
        this.data = data;
    }

    public getNodeById(id: string): Node {
        return this.nodes.find((node) => node.id === id);
    }

    public addNode(node: NodeOption): void {
        if (!this.getNodeById(node.id)) {
            const shapeType = node.shape || 'Node';
            const NodeClazz = getShapeClazz<Node, NodeOption>(shapeType);
            const nodeGraph = new NodeClazz(node);
            nodeGraph.render();
            this.nodes.push(nodeGraph);
            this.g.add(nodeGraph.g);
        }
    }

    public addEdge(edge: EdgeOption): void {
        const sourceNode = this.getNodeById(edge.source);
        const targetNode = this.getNodeById(edge.target);
        if (sourceNode && targetNode) {
            const shapeType = edge.shape || 'Edge';
            const Clazz = getShapeClazz<Edge, EdgeGraphOption>(shapeType);
            const edgeGraph = new Clazz({
                start: sourceNode,
                end: targetNode,
            });
            edgeGraph.render();
            this.g.add(edgeGraph.g);
            this.edges.push(edgeGraph);
        }
    }

    public render(): void {
        this.g = new zrender.Group();
        if (Array.isArray(this.data.nodes)) {
            this.data.nodes.forEach((node) => {
                this.addNode(node);
            });
        }
        if (Array.isArray(this.data.edges)) {
            this.data.edges.forEach((edge) => {
                this.addEdge(edge);
            });
        }
        this.zr.add(this.g);
    }

    private getEdgePoint(startNodeCenter: number[], endNodeCenter: number[], r: number): Point {
        const v = new Vector(endNodeCenter[0] - startNodeCenter[0], endNodeCenter[1] - startNodeCenter[1]);
        const normal = v.normalize();
        return [
            startNodeCenter[0] + normal.x * r,
            startNodeCenter[1] + normal.y * r,
        ];
    }
}
