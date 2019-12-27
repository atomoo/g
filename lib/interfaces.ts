import Node from "./view/node";

/**
 * @file interfaces
 * @author y
 */

// 配置项，参考zrender
export interface GraphOption {
    renderer: 'canvas' | 'svg' | 'vml';
    devicePixelRatio: number;
    width: number | string;
    height: number | string;
}

export interface NodeOption {
    id: string;
    x: number;
    y: number;
    shape?: string;
    size?: number;
}

export interface EdgeOption {
    source: string;
    target: string;
    shape?: string;
}

export interface EdgeGraphOption {
    start: Node;
    end: Node;
}

export interface GraphData {
    nodes: NodeOption[];
    edges: EdgeOption[];
}

export interface ShapeMap {
    [key: string]: ShapeConstructor;
}

export interface Shape {
    g: any;
    options: any;
    render(container?: any): any;
};

export interface ShapeConstructor {
    new (...args: any[]): Shape
}


export interface CircleShap {
    center: Point;
    r: number;
};


export type Point = [number, number];

export interface BezierShap {
    p0: Point;
    p1: Point;
    cp: Point;
}

