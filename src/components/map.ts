import { Container, Graphics, Point, Sprite, Spritesheet } from "pixi.js";
import { Game } from "src/game";
import { InteractionData, MapData } from "./map-data";

export class Map {
    public tiles: Sprite[][][];
    public shadows: Graphics[];

    constructor(private game: Game, public sheet: Spritesheet, public mapData: MapData, stage: Container) {
        this.tiles = [];
        for (let layer = 0; layer < this.mapData.tiles.length; layer++) {
            this.tiles.push([]);
            const layerContainer = new Container();
            stage.addChild(layerContainer);
            for (let x = 0; x < this.mapData.tiles[layer].length; x++) {
                this.tiles[layer].push([]);
                for (let y = 0; y < this.mapData.tiles[layer][x].length; y++) {
                    const textureData = this.mapData.tiles[layer][y][x]?.split("/");
                    const rotation = (textureData && textureData[1]) ? Number(textureData[1]) : 0;
                    const xOffset = (textureData && textureData[2]) ? Number(textureData[2]) : 0;
                    const yOffset = (textureData && textureData[3]) ? Number(textureData[3]) : 0;
                    const xScale = (textureData && textureData[4]) ? Number(textureData[4]) : 1;
                    const yScale = (textureData && textureData[5]) ? Number(textureData[5]) : 1;
                    const tile = new Sprite();
                    if (textureData) {
                        const image = `${textureData[0]}.png`;
                        tile.texture = sheet.textures[image];
                    }
                    tile.width = 100 * xScale;
                    tile.height = 100 * yScale;
                    tile.x = (100 * x) + 50 + xOffset;
                    tile.y = (100 * y) + 50 + yOffset;
                    tile.anchor.set(0.5, 0.5);
                    tile.angle = rotation;
                    layerContainer.addChild(tile);
                    this.tiles[layer][x].push(tile);
                }
            }
        }

        const entryway = new Graphics();
        entryway.beginFill(0xEEEEEE);
        entryway.moveTo(100, 400);
        entryway.lineTo(400, 400);
        entryway.lineTo(400, 100);
        entryway.lineTo(900, 100);
        entryway.lineTo(900, 500);
        entryway.lineTo(100, 500);
        entryway.lineTo(100, 400);
        entryway.endFill();

        const mainroom = new Graphics();
        mainroom.beginFill(0xEEEEEE);
        mainroom.moveTo(100, 500);
        mainroom.lineTo(900, 500);
        mainroom.lineTo(900, 900);
        mainroom.lineTo(100, 900);
        mainroom.lineTo(100, 500);
        mainroom.endFill();

        this.shadows = [ entryway, mainroom ];

        this.shadows.forEach((x) => {
            stage.addChildAt(x, 3);
        });

        (window as any).hideShadows = () => this.shadows.forEach((x) => x.visible = false);
        (window as any).hideTile = (l: number, x: number, y: number) => this.tiles[l][x][y].visible = false;
    }

    public setTile(layer: number, x: number, y: number, texture: string): void {
        this.tiles[layer][x][y].texture = this.sheet.textures[`${texture}.png`];
    }

    public canLeave(x: number, y: number, direction: number): boolean {
        const leaveCollision = this.mapData.collisionLeave[y][x];
        if (typeof(leaveCollision) === "boolean") {
            return !leaveCollision;
        } else {
            return !leaveCollision[direction];
        }
    }

    public canEnter(x: number, y: number): boolean {
        if (y > 0 && y < this.mapData.tiles[0].length && x > 0 && x < this.mapData.tiles[0][0].length) {
            return !this.mapData.collisionEnter[y][x];
        } else {
            return false;
        }
    }

    public checkInteraction(x: number, y: number): InteractionData | undefined {
        const index = this.mapData.interactions[y][x];
        return this.mapData.events[index];
    }
}
