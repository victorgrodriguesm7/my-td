import './style.css';
import Engine from "./core/engine";

const canvas = document.querySelector("canvas");


class Test implements Component {
    x: number  = 0;
    y: number  = 0;
    width: number = 10;
    height: number = 10;

    update({ context, screenSize: { width } }: RenderProps): void {
        context.fillRect(
            this.x, this.y, this.width, this.height
        )

        this.x += 2;

        if (this.x > width){
            this.x = 0;
        }
    }
}

if (canvas){
    canvas.width = 320;
    canvas.height = 320;

    const engine = new Engine(canvas);

    engine.components.push(new Test())

    engine.run();
}