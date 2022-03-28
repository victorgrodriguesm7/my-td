import './style.css';
import Engine from "./core/engine";
import InputHandler from "./core/input";
import LightTurret from './entities/LightTurret';
import MovableEnemy from './entities/MovableEnemy';
const canvas = document.querySelector("canvas");



if (canvas){    
    canvas.width = 320;
    canvas.height = 320;

    const engine = new Engine(canvas);

    const inputHandler = InputHandler.instance;

    inputHandler.init(canvas);

    const turret = new LightTurret({
        x: canvas.width / 2,
        y: canvas.height / 2
    });

    const movableEnemy = new MovableEnemy({
        width: 10,
        height: 10,
        x: 20,
        y: 0
    });

    engine.addComponent(turret);

    engine.addComponent(movableEnemy);
    
    engine.run();
}