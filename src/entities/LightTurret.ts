import Turret from "./Turret";
import spriteUrl from '../assets/light_turret_32x32.png';
import spriteBaseUrl from '../assets/light_turret_base_32x32.png';
import LightBullet from "./LightBullet";

interface LightTurretProps {
    x: number;
    y: number;
}

export default class LightTurret extends Turret {
    i = 0;
    constructor({
        x,
        y        
    }: LightTurretProps){
        super({
            x,
            y,
            height: 32,
            width: 32,
            radius: 200,
            firerate: 1,
            maxLife: 100,
            baseValue: 100
        });

        this.targetAngle = 180;
    }

    draw(context: RenderProps["context"]){
        const sprite = document.createElement("img");

        sprite.src = spriteUrl;

        const spriteBase = document.createElement("img");
        spriteBase.src = spriteBaseUrl;

        context.drawImage(
            spriteBase,
            this.x,
            this.y
        );

        context.save();

        context.translate(
            this.x + this.width / 2,
            this.y + this.height /2
        );
        
        context.rotate(this.currentAngle * Math.PI / 180);

        context.translate(
            - this.x - this.width / 2,
            - this.y - this.height / 2
        );

        context.drawImage(
            sprite,
            this.x,
            this.y
        );

        context.restore();

        this.i++;
    }

    update(props: RenderProps): void {
        const { context, components, addComponent } = props;

        if (this.selected) this.showRadius(context);

        const target = this.findNearestEnemy(components);

        if (target){
            const { enemy } = target;

            this.findAngle(enemy);
            const aim = this.aim();

            if (aim && this.canShoot()){
                const bullet = new LightBullet({
                    x: this.x,
                    y: this.y,
                    enemy
                });

                addComponent(bullet);

                this.lastShoot = Date.now();
            }
        }

        this.showLifeBar(context);

        this.draw(context);
    }
}