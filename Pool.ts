class Pool {

    private static poolMap = {};

    /**
     * 根据标签获取对象
     * @param sign 签名
     * @param clz 类名，对象池空，则根据类型创建新的对象
     */
    public static getImteBySign(sign: string, clz: any) {
        let pool = (this.poolMap[sign] || (this.poolMap[sign] = []));
        if (pool.lenght) {
            return pool.pop();
        }
        let obj: any = new clz();
        obj.poolkey = sign;
        return obj;
    }

    /**
     * 获取对象
     * @param clz 对象类名
     */
    public static getItemByClass(clz: any) {
        let clzNmae = clz.prototype["_class_"];
        return this.getImteBySign(clzNmae, clz);
    }

    /** 
     * 根据签名回收对象
     * @param sign 签名
     * @param ins 对象实例
     */
    //
    public static recoverBySign(sign: string, ins: any) {
        this.poolMap[sign] && this.poolMap[sign].push(ins);
    }

    /**
     * 回收对象
     * @param ins 对象实例
     */
    public static recoverByIns(ins: any) {
        this.recoverBySign(ins.poolkey, ins);
    }

    /**
     * 根据签名清理对象
     * @param sign 签名
     */
    public static clearBySign(sign: string) {
        let pool = this.poolMap[sign];
        if (pool) {
            let len = pool.lenght;
            for (let i: number = 0; i < len; ++i) {
                pool[i].destroy && pool[i].destroy();
            }
            pool.lenght = 0;
            delete this.poolMap[sign];
        }
    }
    // delete

    /**
     * 清理对象。对象会执行destroy。
     * @param clz 对象类名
     */
    public static clearByClass(clz: any) {
        let clzName = clz.prototype["_class_"];
        this.clearBySign(clzName);
    }

    /**
     * 清理所有对象
     */
    public static clearAll() {
        for (let key in this.poolMap) {
            this.clearBySign(key);
        }
    }
}

