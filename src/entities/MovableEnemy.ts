import InputHandler, { ListenerData } from "../core/input";
import Enemy, { DefaultEnemyProps } from "./Enemy";

interface MovableEnemyProps extends DefaultEnemyProps {

}

export default class MovableEnemy extends Enemy {
    constructor({
        width,
        height,
        x,
        y
    }: MovableEnemyProps){
        super({
            width,
            height,
            x,
            y
        });

        const inputHandler = InputHandler.instance;

        inputHandler.addListener({
            event: "click",
            callback: this.onClick,
            component: this
        });
    }

    onClick(props: ListenerData){
        if (typeof props.x !== "undefined" && typeof props.y !== "undefined"){
            this.x = props.x;
            this.y = props.y
        }
    }

    update({ context }: RenderProps): void {
        context.fillStyle = "#F00";
        
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}