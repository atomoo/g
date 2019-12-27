/**
 * @file lib/index
 * @author y
 */
import zrender from 'zrender';
import Circle from 'zrender/lib/graphic/shape/Circle';
import Vector from './helper/vector';
import {IEdgeGraphOption, IEdgeOption, IGraphData, IGraphOption, INodeOption} from './interfaces';
import {getShapeClazz} from './view';
import Edge from './view/edge';
import Node from './view/node';

export default class Graph {

    public data: IGraphData;

    public g: any;

    private zr: any;

    private nodes: Node[] = [];

    private edges: Edge[] = [];

    constructor(dom: HTMLElement, options?: IGraphOption) {
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

    public setData(data: IGraphData) {
        this.data = data;
    }

    public getNodeById(id: string): Node {
        return this.nodes.find((node) => node.id === id);
    }

    public addNode(node: INodeOption) {
        if (!this.getNodeById(node.id)) {
            const shapeType = node.shape || 'Node';
            const NodeClazz = getShapeClazz<Node, INodeOption>(shapeType);
            const nodeGraph = new NodeClazz(node);
            nodeGraph.render();
            this.nodes.push(nodeGraph);
            this.g.add(nodeGraph.g);
        }
    }

    public addEdge(edge: IEdgeOption) {
        const sourceNode = this.getNodeById(edge.source);
        const targetNode = this.getNodeById(edge.target);
        if (sourceNode && targetNode) {
            const shapeType = edge.shape || 'Edge';
            const Clazz = getShapeClazz<Edge, IEdgeGraphOption>(shapeType);
            const startNodeCenter = [sourceNode.options.x, sourceNode.options.y];
            const endNodeCenter = [targetNode.options.x, targetNode.options.y];
            const edgePoints = [
                startNodeCenter,
                endNodeCenter,
            ];
            const edgeGraph = new Clazz({
                start: sourceNode,
                end: targetNode,
            });
            edgeGraph.render();
            this.g.add(edgeGraph.g);
            this.edges.push(edgeGraph);
        }
    }

    public render() {
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

    private getEdgePoint(startNodeCenter: number[], endNodeCenter: number[], r: number) {
        const v = new Vector(endNodeCenter[0] - startNodeCenter[0], endNodeCenter[1] - startNodeCenter[1]);
        const normal = v.normalize();
        return [
            startNodeCenter[0] + normal.x * r,
            startNodeCenter[1] + normal.y * r,
        ];
    }
}
