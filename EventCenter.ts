class EventCenter extends egret.EventDispatcher {

    private static _instance: EventCenter;
    protected constructor() {
        super();
    }
    /**懒汉式单例 */
    public get instance(): EventCenter {
        if (!EventCenter._instance) {
            EventCenter._instance = new EventCenter();
        }
        return EventCenter._instance;
    }
    /** */
    public static addMsg(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
        EventCenter._instance.addEventListener(type, listener, thisObject, useCapture, priority);
    }

    public static removeMsg(type: string, listener: Function, thisObject: any, useCapture?: boolean): void {
        EventCenter._instance.removeEventListener(type, listener, thisObject, useCapture);
    }
    public static addOnceMsg(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
        EventCenter._instance.once(type, listener, thisObject, useCapture, priority);
    }
    public static sendMsg(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
        EventCenter._instance.dispatchEvent(new egret.Event(type, bubbles, cancelable, data))
    }
    public static hasMsg(type: string): boolean {
        return EventCenter._instance.hasEventListener(type);
    }
}
