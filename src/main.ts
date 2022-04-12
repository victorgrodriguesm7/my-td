import './style.css';
import Engine from "./core/engine";
import InputHandler from "./core/input";
import LightTurret from './entities/LightTurret';
import MovableEnemy from './entities/MovableEnemy';
import Background from './core/background';
import getCellsCount from './utils/getCellsCount';
const canvas = document.querySelector("canvas");

const screen: ScreenSize = {
    width: 32 * 20,
    height: 32 * 20
};

const background = new Background(screen);
const cells = getCellsCount(screen, 32);
const map = new Array(cells.total).fill([ 0 ]);

background.generateMap(
    map
);

if (canvas){    
    canvas.width = screen.width;
    canvas.height = screen.height;

    const engine = new Engine(canvas);

    const inputHandler = InputHandler.instance;

    inputHandler.init(canvas);

    const turret = new LightTurret({
        x: canvas.width / 2,
        y: canvas.height / 2
    });

    const movableEnemy = new MovableEnemy({
        width: 32,
        height: 32,
        x: 0,
        y: 0
    });

    engine.changeBackground(background);

    engine.addComponent(turret);

    engine.addComponent(movableEnemy);
    
    engine.run();
}