import Turret from "./Turret";

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
            height: 16,
            width: 16,
            radius: 100,
            firerate: 10,
        });

        this.targetAngle = 180;
    }

    draw(context: RenderProps["context"]){
        context.fillStyle = "#0F0";

        const sprite = document.createElement("img");

        sprite.src = "/light.png";
        
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
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
        const { context, components } = props;

        if (this.canShoot()){
            const target = this.findNearestEnemy(components);

            if (target){
                const { enemy } = target;

                this.findAngle(enemy);
                this.aim();
            }
        }
        // this.showRadius(props.context);

        this.draw(context);
    }
}