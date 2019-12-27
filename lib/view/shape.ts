import {IShape, IShapeMap} from '../interfaces';

const shapeClazz: IShapeMap = {};

type Type<T, K> = new (options: K) => T;

export function registerShape<T extends IShape, K>(shapeType: string, clazz: Type<T, K>) {
    if (shapeClazz[shapeType]) {
        throw new Error('Duplicate shape type');
    }
    else {
        shapeClazz[shapeType] = clazz;
    }
}

export function getShapeClazz<T extends IShape, K>(shapeType: string): Type<T, K> {
    return shapeClazz[shapeType] as Type<T, K>;
}
