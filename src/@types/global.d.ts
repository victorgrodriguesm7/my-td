export {};

declare global {
    interface RenderProps {
        context: CanvasRenderingContext2D;
        screenSize: ScreenSize;
        deltaTime: number;
        components: Component[];
    }

    interface CustomMouseEvent {
        click: boolean;
        x?: number;
        y?: number;
    }

    interface ScreenSize {
        width: number;
        height: number;
    }

    abstract class Component {
        x: number;
        y: number;

        width: number;
        height: number;

        abstract update(props: RenderProps): void;
    }
}
