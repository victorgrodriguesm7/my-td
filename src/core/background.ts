import dirt from '../assets/terrain/dirt.png';
import getCellsCount from '../utils/getCellsCount';

const terrain = {
    "dirt": dirt
}

type TerrainType = keyof typeof terrain;

export default class Background implements Component {
    x = 0;
    y = 0;
    width: number;
    height: number;
    screenSize: ScreenSize;

    background?: HTMLImageElement;
    loading: boolean = true;
    
    constructor(screenSize: ScreenSize){
        this.width = screenSize.width;
        this.height = screenSize.height;
        this.screenSize = screenSize;
    }

    async generateMap(map: number[][]){
        this.loading = true;
        const { width, height } = this.screenSize;
        const terrainTypes = Object.keys(terrain);
        const background = document.createElement("canvas");

        background.width = width;
        background.height = height;

        const cellsCount = getCellsCount(this.screenSize, 32);

        const context = background.getContext("2d");

        if (context){
            for (let column = 0; column < cellsCount.horizontal; column++){
                for (let row =0; row < cellsCount.vertical; row++){
                    const index = row + (cellsCount.horizontal * column);
                    
                    const tiles = map[index];

                    for (const tile of tiles){
                        const terrainType = terrainTypes[tile];
    
                        if (terrainType){
                            const terrainTile = terrain[terrainType as TerrainType];
                            const img = document.createElement('img');
    
                            img.src = terrainTile;
    
    
                            await new Promise<void>((resolve) => {
                                img.onload = () => {
                                    context.drawImage(
                                        img,
                                        column * 32,
                                        row * 32,
                                        32,
                                        32
                                    );
    
                                    resolve();
                                }
                            })
                        }
                    }
                }
            }

            this.background = document.createElement('img');
            this.background.src = background.toDataURL();

            this.background.onload = () => {
                this.loading = false;
            }
        }
    }

    update({ context }: RenderProps): void {
        if (this.background){
            context.drawImage(
                this.background,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}