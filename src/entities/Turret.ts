import Angle from "../utils/angle";
import getCenter from "../utils/getCenter";
import Enemy from "./Enemy";

export interface TurretBaseProps {
    x: number;
    y: number;
    width: number;
    height: number;
    firerate: number;
    radius: number;
}

interface NearestEnemy {
    enemy: Component;
    distance: number;
}

export default abstract class Turret implements Component {
    x: number;
    y: number;
    width: number;
    height: number;
    firerate: number;
    radius: number;
    lastShoot: number = 0;
    selected: boolean = false;

    targetAngle: number = 0;
    currentAngle: number = 0;
    
    level: number = 1;
    MAX_LEVEL: number = 3;

    constructor({
        x,
        y,
        width,
        height,
        firerate,
        radius
    }: TurretBaseProps){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.firerate = firerate;
        this.radius = radius;
    }

    findNearestEnemy(components: Component[]): NearestEnemy | null {
        let nearestEnemy = null;

        for (let component of components){
            if (component instanceof Enemy){ 
                const distance = Math.sqrt(
                    (this.x - component.x) ** 2
                    +
                    (this.y - component.y) ** 2
                );

                if (this.radius >= distance){
                    
                    if (nearestEnemy){
                        if (nearestEnemy.distance > distance){
                            nearestEnemy = {
                                distance,
                                enemy: component
                            }
                        }
                    }

                    nearestEnemy = {
                        distance,
                        enemy: component
                    };
                }
            }
        }

        return nearestEnemy;
    }

    canShoot(){
        const now = Date.now();
        const fireInterval = 1000 / this.firerate;

        return (now - this.lastShoot > fireInterval);
    }

    findAngle(enemy: Enemy){
        const center = {
            turret: getCenter(this),
            enemy: getCenter(enemy)
        }

        const angle = Angle.between({
            origin: center.turret,
            target: center.enemy
        });

        if (angle < 0){
            this.targetAngle = angle + 360
        } else {
            this.targetAngle = angle;
        }
    }

    aim(){
        const lerp = 1;

        if (Math.round(this.currentAngle) === Math.round(this.targetAngle)){
            return;
        }

        const distanceSum = this.targetAngle - this.currentAngle;
        const distanceSub = Math.min(360 - Math.abs(distanceSum), 360);

        if (distanceSum < 0 && Math.abs(distanceSum) < distanceSub){
            if (this.currentAngle < 0){
                this.currentAngle = 360;
            } else {
                this.currentAngle -= lerp;
            }
        } else {
            if (distanceSub <= distanceSum){
                if (this.currentAngle < 0){
                    this.currentAngle = 360
                } else {
                    this.currentAngle -= lerp;
                }
            } else {
                if (this.currentAngle > 360){
                    this.currentAngle = 0;
                } else {
                    this.currentAngle += lerp;
                }
            }
        }
    }

    showRadius(context: RenderProps["context"]){
        context.beginPath();

        context.lineWidth = 1;
        context.strokeStyle = "rgba(52, 152, 219, 0.5)";

        context.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI
        );

        context.stroke();
    }

    update(_props: RenderProps): void {}
}