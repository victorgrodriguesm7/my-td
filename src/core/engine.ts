export default class Engine {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    screenSize: ScreenSize;

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
    }

    addComponent(component: Component){
        this.components.push(component);
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
        
        let lastFrame = startTime;

        const loop = () => {
            requestAnimationFrame(loop)

            const currentFrame = Date.now();
            const elapsedTime = currentFrame - lastFrame;

            if (elapsedTime > fpsInterval){
                this.clearCanvas();
                lastFrame = currentFrame - (elapsedTime % fpsInterval);

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