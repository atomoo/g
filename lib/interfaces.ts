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
    start: number[];
    end: number[];
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
    render(container?: any): any;
};

export interface ShapeConstructor {
    new (...args: any[]): Shape
}

