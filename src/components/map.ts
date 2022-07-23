import { Container, Point, Sprite, Spritesheet } from "pixi.js";
import { Game } from "src/game";

export interface InteractionData {
    interaction: boolean;
    message?: string;

    action?: Function;

    itemRequired?: string;
    itemMessage?: string;

    itemAction?: Function;

    itemAlreadyUsed?: boolean;
    itemAlreadyUsedMessage?: string;

    prompt?: string;
    promptOptions?: string[];
    promptAction?: (choice: string) => void;
}

export const MapData = [
    [
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "wood", "wood", "wood", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "wood", "wood", "wood", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "wood", "wood", "wood", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ]
    ],
    [
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, "chair/270/-50/0", undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, "bed", undefined, undefined, undefined, undefined, undefined, undefined, undefined, "door_closed/270" ],
        [ undefined, undefined, undefined, "planks/0/-10/-10", undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, "door_closed/0/0/-20", undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ]
    ],
    [
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, "table/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ]
    ],
    [
        [ "inner_diagonal/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "inner_diagonal/270" ],
        [ "wall/90", undefined, undefined, undefined, "wall/270/-20/0", undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, "wall/270/-20/0", undefined, undefined, undefined, undefined, "door_closed/270" ],
        [ "wall/90", undefined, undefined, undefined, "wall/270/-20/0", undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", "wall/0/0/-20", undefined, "wall/0/0/-20", "inner_diagonal/0/-20/-20", undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
        [ "inner_diagonal/90", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "inner_diagonal" ]
    ]
];

export const MapDataCollisionEnter = [
    [ true, true, true, true, true, true, true, true, true, true ],
    [ true, true, false, false, false, false, false, false, false, true ],
    [ true, false, false, false, false, false, false, false, false, true ],
    [ true, false, false, false, false, false, false, false, false, true ],
    [ true, false, true, false, false, false, false, false, false, true ],
    [ true, false, false, false, false, false, false, false, false, true ],
    [ true, false, false, false, false, false, false, false, false, true ],
    [ true, false, false, false, false, false, false, false, false, true ],
    [ true, false, false, false, false, false, false, false, false, true ],
    [ true, true, true, true, true, true, true, true, true, true ]
];

export const MapDataCollisionLeave = [
    [ false, false, false, false, false, false, false, false, false, false ],
    [ false, false, false, [false, true, false, false], [false, false, false, true], false, false, false, false, false ],
    [ false, false, false, [false, true, false, false], [false, false, false, true], false, false, false, false, false ],
    [ false, [false, false, true, false], false, [false, true, true, false], [false, false, false, true], false, false, false, false, false ],
    [ false, [true, false, false, false], false, [true, false, false, false], false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false, false, false ]
];

export const MapDataInteraction = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 2, 0, 0, 0, 0, 0, 0, 1, 0 ],
    [ 0, 6, 5, 4, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

export class Map {
    private tiles: Sprite[][][];
    private interactions: InteractionData[] = [
        { interaction: false },
        { interaction: true, message: "The door is locked!" },
        { interaction: true, message: "The bed I woke up in is uncomfortable and slightly damp." },
        {
            interaction: true, message: "There is a drawer under the table... it's locked.",
            itemRequired: "Drawer Key", itemMessage: "You unlocked the drawer! There is an old library card in there.",
            itemAction: () => this.game.inventory!.giveItem("Library Card"),
            itemAlreadyUsed: false,
            itemAlreadyUsedMessage: "There is nothing else in the drawer."
        },
        {
            interaction: true, message: "There is a small key here!",
            action: () => {
                this.game.inventory!.giveItem("Drawer Key");
                MapDataInteraction[3][3] = 0;
                this.game.player!.clearInteraction();
            }
        },
        {
            interaction: true, message: "The door is locked. There is a gap though...\nif only I have something thin to open the lock with.",
            itemRequired: "Library Card", itemMessage: "As you push the library card into the gap, you feel something give! You have a moment of triumph before the blade swings down.",
            itemAction: () => {
                this.game.player!.enabled = false;
                const showDeath = (ev: KeyboardEvent) => {
                    if (ev.key === " ") {
                        window.removeEventListener("keydown", showDeath);
                        this.game.showDeath();
                    }
                };
                window.addEventListener("keydown", showDeath);
            }
        },
        {
            interaction: true,
            prompt: "There is a small hole in the wall there... you think you could fit your hand in it.",
            promptOptions: [ "Put your hand in", "Leave it alone" ],
            promptAction: (choice: string) => {
                if (choice === "Put your hand in") {
                    MapDataInteraction[3][1] = 0;
                    MapDataInteraction[3][2] = 0;
                    MapDataCollisionEnter[4][2] = false;
                    this.game.player!.clearInteraction();
                    this.tiles[1][2][4].texture = this.sheet.textures["doorway.png"];
                    this.game.message!.setText("You hear a small click and the door swings open!");
                }
            }
        },
    ];

    constructor(private game: Game, private sheet: Spritesheet, public startPosition: Point, stage: Container) {
        this.tiles = [];
        for (let layer = 0; layer < MapData.length; layer++) {
            this.tiles.push([]);
            const layerContainer = new Container();
            stage.addChild(layerContainer);
            for (let x = 0; x < MapData[layer].length; x++) {
                this.tiles[layer].push([]);
                for (let y = 0; y < MapData[layer][x].length; y++) {
                    const textureData = MapData[layer][y][x]?.split("/");
                    const rotation = (textureData && textureData[1]) ? Number(textureData[1]) : 0;
                    const xOffset = (textureData && textureData[2]) ? Number(textureData[2]) : 0;
                    const yOffset = (textureData && textureData[3]) ? Number(textureData[3]) : 0;
                    const tile = new Sprite();
                    if (textureData) {
                        const image = `${textureData[0]}.png`;
                        tile.texture = sheet.textures[image];
                    }
                    tile.width = 100;
                    tile.height = 100;
                    tile.x = (100 * x) + 50 + xOffset;
                    tile.y = (100 * y) + 50 + yOffset;
                    tile.anchor.set(0.5, 0.5);
                    tile.angle = rotation;
                    layerContainer.addChild(tile);
                    this.tiles[layer][x].push(tile);
                }
            }
        }
    }

    public setTile(layer: number, x: number, y: number, texture: string): void {
        this.tiles[layer][x][y].texture = this.sheet.textures[`${texture}.png`];
    }

    public canLeave(x: number, y: number, direction: number): boolean {
        const leaveCollision = MapDataCollisionLeave[y][x];
        if (typeof(leaveCollision) === "boolean") {
            return !leaveCollision;
        } else {
            return !leaveCollision[direction];
        }
    }

    public canEnter(x: number, y: number): boolean {
        if (y > 0 && y < MapData[0].length && x > 0 && x < MapData[0][0].length) {
            return !MapDataCollisionEnter[y][x];
        } else {
            return false;
        }
    }

    public checkInteraction(x: number, y: number): InteractionData | undefined {
        const index = MapDataInteraction[y][x];
        return this.interactions[index];
    }
}
