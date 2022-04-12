import { Bullet } from "./Bullet";
import Enemy from "./Enemy";

interface LightBulletProps {
    x: number;
    y: number;
    enemy: Enemy;
}

export default class LightBullet extends Bullet {
    constructor({
        x,
        y,
        enemy
    }: LightBulletProps){
        super({
            x,
            y,
            height: 1,
            width: 10,
            speed: 10,
            target: enemy
        })
    }

    update(props: RenderProps): void {
        const { context } = props;
        this.findAngle();    
        context.save();

        context.fillStyle = "#FF0";

        this.turnTowards(context);
        
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        context.restore();

        this.moveTowards();
    }
}