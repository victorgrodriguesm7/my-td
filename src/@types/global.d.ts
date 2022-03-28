export {};

declare global {
    interface RenderProps {
        context: CanvasRenderingContext2D;
        screenSize: ScreenSize;
        deltaTime: number;
        components: Component[];
    }

    type PartialRecord<K extends keyof any, T> = {
        [P in K]?: T;
    };

    interface ScreenSize {
        width: number;
        height: number;
    }

    interface Coordinates {
        x: number;
        y: number
    }

    type Quadrant = 1 | 2 | 3 | 4;

    interface Component {
        x: number;
        y: number;

        width: number;
        height: number;

        update(props: RenderProps): void;
    }
}
