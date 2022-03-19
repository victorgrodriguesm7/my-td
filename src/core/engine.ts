export default class Engine {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    screenSize: ScreenSize;
    mouseEvent: CustomMouseEvent = {
        click: false
    };

    components: Component[] = [];

    constructor(
        canvas: HTMLCanvasElement
    ){
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
        this.screenSize = {
            width: canvas.width,
            height: canvas.height
        }
        this.canvas.addEventListener("click", this.handleMouseEvent as any as EventListener);
    }
    
    handleMouseEvent(_canvas: HTMLCanvasElement, event: MouseEvent){
        console.log(event)
    }

    clearCanvas(){
        const { width, height } = this.screenSize;
        
        this.context.clearRect(0, 0, width, height)
    }

    run(){
        const
            maxFps = 60,
            fpsInterval = 1000 / maxFps, // 60 fps in a Second
            startTime = Date.now();
        
        let then = startTime;

        const loop = () => {
            requestAnimationFrame(loop)

            const now = Date.now();
            const elapsedTime = now - then;

            if (elapsedTime > fpsInterval){
                this.clearCanvas();
                then = now - (elapsedTime % fpsInterval);

                const props: RenderProps = {
                    components: this.components,
                    screenSize: this.screenSize,
                    context: this.context,
                    deltaTime: elapsedTime
                };
            
                for (const component of this.components){
                    component.update(props)
                }
            }
        }

        loop();
    }
}