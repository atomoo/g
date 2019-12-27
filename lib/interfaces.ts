import Node from './view/node';

/**
 * @file interfaces
 * @author y
 */

// 配置项，参考zrender
export interface IGraphOption {
    renderer: 'canvas' | 'svg' | 'vml';
    devicePixelRatio: number;
    width: number | string;
    height: number | string;
}

export interface INodeOption {
    id: string;
    x: number;
    y: number;
    shape?: string;
    size?: number;
}

export interface IEdgeOption {
    source: string;
    target: string;
    shape?: string;
}

export interface IEdgeGraphOption {
    start: Node;
    end: Node;
}

export interface IGraphData {
    nodes: INodeOption[];
    edges: IEdgeOption[];
}

export interface IShapeMap {
    [key: string]: ShapeConstructor;
}

export interface IShape {
    g: any;
    options: any;
    render(container?: any): any;
}

export type ShapeConstructor = new (...args: any[]) => IShape;

export interface ICircleShap {
    center: Point;
    r: number;
}

export type Point = [number, number];

export interface IBezierShap {
    p0: Point;
    p1: Point;
    cp: Point;
}
