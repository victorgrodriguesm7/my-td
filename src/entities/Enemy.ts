export interface DefaultEnemyProps {
    height: number;
    width: number;
    x: number;
    y: number ;   
}

export default abstract class Enemy implements Component {
    height: number;
    width: number;
    x: number;
    y: number ;

    constructor({
        height,
        width,
        x,
        y
    }: DefaultEnemyProps){
        this.height = height
        this.width = width;
        this.x = x;
        this.y = y
    }

    update(_props: RenderProps): void {};
}