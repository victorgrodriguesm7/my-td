import InputHandler from "../core/input";
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
    baseValue: number;
    maxLife: number;
}

interface NearestEnemy {
    enemy: Component;
    distance: number;
}

export default class Turret implements Component {
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

    baseValue: number;

    life: number;
    maxLife: number;

    constructor({
        x,
        y,
        width,
        height,
        firerate,
        radius,
        baseValue,
        maxLife
    }: TurretBaseProps){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.firerate = firerate;
        this.radius = radius;
        this.baseValue = baseValue;
        this.maxLife = maxLife;
        this.life = maxLife;

        const inputHandler = InputHandler.instance;

        inputHandler.addListener({
            event: "click",
            strategy: "hitbox",
            callback: this.toggleRadius,
            component: this
        });
    }

    get currentValue(): number {
        return this.baseValue * (this.level + 1 / 10)
    }

    get upgradeValue(): number {
        return this.baseValue * (this.level + 1 / 10)
    }
    
    get sellValue(): number {
        const currentValue = this.baseValue * (this.level / 10)
        
        return currentValue - (currentValue * 0.2);
    }

    get repairCost(): number {
        return 100 - this.life * this.currentValue / this.maxLife
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

    aim(): boolean {
        const lerp = 1;

        if (Math.round(this.currentAngle) === Math.round(this.targetAngle)){
            return true;
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

        return false;
    }

    toggleRadius() {
        this.selected = !this.selected;
    }

    showRadius(context: RenderProps["context"]){
        context.beginPath();

        context.lineWidth = 1;
        context.strokeStyle = "rgba(52, 152, 219, 0.5)";

        const center = getCenter(this);

        context.arc(
            center.x,
            center.y,
            this.radius,
            0,
            2 * Math.PI
        );

        context.stroke();
    }

    showLifeBar(context: RenderProps["context"]){
        const lifePercent = this.life / this.maxLife;

        if (lifePercent === 1){
            return;
        }

        context.fillStyle = "#F00";

        context.fillRect(
            this.x,
            this.y + this.height,
            this.width,
            4
        );

        context.fillStyle = "#0F0";

        context.fillRect(
            this.x,
            this.y + this.height,
            this.width * lifePercent,
            4
        );
    }

    update(_props: RenderProps): void {}
}