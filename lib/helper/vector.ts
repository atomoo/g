export default class Vector {

    public x: number;

    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // 获取向量大小（即向量的模），即两点间距离
    public getMagnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    // 点积的几何意义之一是：一个向量在平行于另一个向量方向上的投影的数值乘积。
    public dotProduct(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y;
    }

    // 向量相减
    public subtarct(vector: Vector): Vector {
        const v = new Vector(this.x - vector.x, this.y - vector.y);
        return v;
    }

    // 获取当前向量的法向量（垂直）
    public perpendicular(): Vector {
        const v = new Vector(this.y, -this.x);
        return v;
    }

    // 获取单位向量（即向量大小为1，用于表示向量方向），一个非零向量除以它的模即可得到单位向量
    public normalize(): Vector {
        const v = new Vector(0, 0);
        const m = this.getMagnitude();
        if (m !== 0) {
            v.x = this.x / m;
            v.y = this.y / m;
        }
        return v;
    }

}
