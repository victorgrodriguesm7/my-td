const events = [
    "click"
] as const;
const strategies = [
    "none",
    "hitbox"
]  as const;

export type Events = typeof events[number];
export type EventStrategy = typeof strategies[number];

export type ListenerData = {
    type: Events;
    x?: number;
    y?: number;
}
export type Listener = (props: ListenerData) => void;
export type Listeners = PartialRecord<Events, Listener[]>;

interface AddListenerProps {
    event: Events;
    strategy?: EventStrategy;
    component: Component;
    callback: Listener;
}

export default class InputHandler {
    private static _instance: InputHandler;

    canvas?: HTMLCanvasElement;
    listeners: Listeners = {};

    private constructor(){
        
    }
    
    init(canvas: HTMLCanvasElement){
        this.canvas = canvas;

        canvas.addEventListener("click", this.handleClick.bind(this));
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    getCursorPosition(event: MouseEvent) {
        if (this.canvas){
            const rect = this.canvas.getBoundingClientRect()
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
    
            return { x, y };
        }

        throw new Error("InputHandlerError: Canvas not defined");
    }

    handleClick(event: MouseEvent){
        const { x, y } = this.getCursorPosition(event);
        

        const clickListeners = this.listeners["click"];

        if (!clickListeners) return;

        for (const callback of clickListeners){
            callback({
                type: "click",
                x,
                y
            });
        }
    }

    addListener({ event, strategy = "none", component, callback }: AddListenerProps){
        if (!this.listeners[event]){
            this.listeners[event] = [];
        }

        callback = callback.bind(component);


        const eventCallback = (props: ListenerData) => {
            const { type, x, y}  = props;
            if (strategy === "none"){
                callback(props);
            } else if (strategy === "hitbox"){
                if (type === "click" && typeof x !== "undefined" && typeof y !== "undefined"){
                    if (
                        component.x < x && 
                        component.x + component.width < x &&
                        component.y < y &&
                        component.y + component.height > y
                    ) {
                        callback(props)
                    }
                }
            }

        };

        this.listeners[event]?.push( eventCallback );
    }
}