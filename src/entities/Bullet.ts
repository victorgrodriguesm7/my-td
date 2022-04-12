import getCenter from "../utils/getCenter";
import Angle from "../utils/angle";
import Enemy from "./Enemy";

export interface BulletProps {
    x: number;
    y: number;
    height: number;
    width: number;
    speed: number;
    target: Enemy;
}

export abstract class Bullet implements Component {
    x: number;
    y: number;
    height: number;
    width: number;
    target: Enemy;
    angle: number = 0;
    speed: number;

    constructor({
        x,
        y,
        height,
        width,
        speed,
        target
    }: BulletProps){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.speed = speed;
        this.target = target;

        this.findAngle();
    }

    findAngle(){
        const center = {
            turret: getCenter(this),
            enemy: getCenter(this.target)
        }

        const angle = Angle.between({
            origin: center.turret,
            target: center.enemy
        });

        if (angle < 0){
            this.angle = angle + 360
        } else {
            this.angle = angle;
        }
    }
    
    turnTowards(context: RenderProps["context"]){
        context.translate(
            this.x + this.width / 2,
            this.y + this.height /2
        );
        
        context.rotate(this.angle * Math.PI / 180);

        context.translate(
            - this.x - this.width / 2,
            - this.y - this.height / 2
        );
    }

    moveTowards(){
        const widthInterval = 1000 / this.speed;
        const dx = (this.x - this.target.x) / widthInterval * -1;
        const dy = (this.y - this.target.y) / widthInterval * -1;

        this.x += dx * (this.speed);
        this.y += dy * (this.speed);
    }

    update(_props: RenderProps): void {}
}