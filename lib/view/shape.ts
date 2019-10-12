import { ShapeMap, Shape } from "../interfaces";

const shapeClazz: ShapeMap = {};

type Type<T, K> = new (options: K) => T;

export function registerShape<T extends Shape, K>(shapeType: string, clazz: Type<T, K>) {
    if (shapeClazz[shapeType]) {
        throw new Error('Duplicate shape type');
    }
    else {
        shapeClazz[shapeType] = clazz;
    }
}

export function getShapeClazz<T extends Shape, K>(shapeType: string): Type<T, K> {
    return shapeClazz[shapeType] as Type<T, K>;
}
