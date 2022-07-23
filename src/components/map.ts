import { Container, Graphics, Point, Sprite, Spritesheet } from "pixi.js";
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
        [ "tiles", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "tiles" ],
        [ "tiles", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "tiles" ],
        [ "tiles", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "tiles" ],
        [ "tiles", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "wood", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ],
        [ "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles", "tiles" ]
    ],
    [
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, "chair/270/-50/0", undefined, "barrels", "barrels_stacked/0/-5/-10", "chest/-10/-5/-10", undefined, undefined, undefined ],
        [ undefined, "bed", undefined, undefined, "carpet/90", "carpet/90", "carpet/90", "carpet/90", "carpet/90", "door_closed/270" ],
        [ undefined, undefined, undefined, "planks/0/-10/-10", undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, "door_closed/0/0/-20", undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, "trap_door/0/0/10/-0.8/0.8", undefined, undefined, undefined, undefined, undefined, "wall_demolished/0/0/-20/-1", undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, "puddle", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, "plants/0/5/-95/0.7/0.7", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ]
    ],
    [
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, "table/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, "table/90", undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, "table/90", undefined, undefined, undefined ],
        [ undefined, undefined, undefined, "table/0/0/-40/1/0.5", "table/0/0/-40/1/0.5", "table/0/0/-40/1/0.5", "table/0/0/-40/1/0.5", "table/0/0/-40/1/0.5", undefined, undefined ],
        [ undefined, undefined, undefined, "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", undefined, undefined ],
        [ undefined, undefined, undefined, "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", undefined, undefined ],
        [ undefined, undefined, undefined, "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", undefined, undefined ],
        [ undefined, undefined, undefined, "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", "table/0/0/-50/1/0.5", undefined, undefined ]
    ],
    [
        [ "inner_diagonal/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "wall/180", "inner_diagonal/270" ],
        [ "wall/90", undefined, undefined, undefined, "wall/270/-20/0", undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, "wall/270/-20/0", undefined, undefined, undefined, undefined, "door_closed/270" ],
        [ "wall/90", undefined, undefined, undefined, "wall/270/-20/0", undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", "wall/0/0/-20", undefined, "wall/0/0/-20", "inner_diagonal/0/-20/-20", undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", "wall/0/0/-20", "wall/0/0/-20", "wall/0/0/-20", "wall/0/0/-20", "wall/0/0/-20", "wall/0/0/-20", "wall_damaged/0/0/-20", "wall/0/0/-20", "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
        [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
        [ "inner_diagonal/90", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "inner_diagonal" ]
    ]
];

export const MapDataCollisionEnter = [
    [ true, true, true, true, true, true, true, true, true, true ],
    [ true, true, false, false, true, true, true, false, false, true ],
    [ true, false, false, false, false, false, false, false, false, true ],
    [ true, false, false, false, false, false, true, false, false, true ],
    [ true, false, true, false, false, false, true, false, false, true ],
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
    [ false, [true, false, true, false], [false, false, true, false], [true, false, true, false], [false, false, true, false], [false, false, true, false], [false, false, true, false], [false, false, true, false], [false, false, true, false], false ],
    [ false, [true, false, false, false], [true, false, false, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, false, false], false ],
    [ false, false, false, [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], false, false ],
    [ false, false, false, [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], false, false ],
    [ false, false, false, [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], false, false ],
    [ false, false, false, false, false, false, false, false, false, false ]
];

export const MapDataInteraction = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 2, 0, 0, 0, 0, 8, 0, 1, 0 ],
    [ 0, 6, 5, 4, 0, 0, 0, 0, 0, 0 ],
    [ 0, 9, 0, 0, 0, 0, 0, 7, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 12, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 13, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

export class Map {
    private tiles: Sprite[][][];
    private shadows: Graphics[];
    private interactions: InteractionData[] = [
        { interaction: false },
        { interaction: true, message: "A strong iron door stands before you.\nThere is no lock and no handle. It's basically a wall." },
        { interaction: true, message: "The bed I woke up in is uncomfortable and slightly damp." },
        {
            interaction: true, message: "There is a drawer under the table... it's locked.",
            itemRequired: "Drawer Key", itemMessage: "You unlocked the drawer! There is an old library card in there.\nIt doesn't have a name on it, but does have a colourful logo on the front.",
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
                    this.shadows[0].visible = false;
                    this.game.player!.clearInteraction();
                    this.tiles[1][2][4].texture = this.sheet.textures["doorway.png"];
                    this.game.message!.setText("You hear a small click and the door swings open!");
                }
            }
        },
        {
            interaction: true,
            prompt: "There are a few large cracks in this wall. Odd.",
            promptOptions: [ "Push on the wall", "Leave it alone" ],
            promptAction: (choice: string) => {
                if (choice === "Push on the wall") {
                    MapDataInteraction[4][7] = 0;
                    this.game.player!.enabled = false;
                    this.game.message!.setText("You push on the wall and one of the bricks falls down. You briefly see wooden boards on the other side, before the ceiling collapses above you.");
                    const showDeath = (ev: KeyboardEvent) => {
                        if (ev.key === " ") {
                            window.removeEventListener("keydown", showDeath);
                            this.game.showDeath();
                        }
                    };
                    window.addEventListener("keydown", showDeath);
                }
            }
        },
        {
            interaction: true,
            prompt: "There is a chest near a pile of old barrels. There is a padlock, but it appears to be unlocked.",
            promptOptions: [ "Open the chest", "Examine closer", "Leave it alone" ],
            promptAction: (choice: string) => {
                switch (choice) {
                    case "Open the chest":
                        MapDataInteraction[2][6] = 0;
                        this.game.player!.clearInteraction();
                        this.game.message!.setText("You open the chest. Something clicks behind it, but nothing happens. Oh well!\n Inside you find hundreds of gold coins! (jk) You find a rusty spade.");
                        this.game.inventory!.giveItem("Rusty Spade");
                        this.interactions[9].promptOptions!.unshift("Use the Rusty Spade");
                        break;
                    case "Examine closer":
                        MapDataInteraction[2][6] = 0;
                        this.game.player!.enabled = false;
                        this.game.message!.setText("You carefully examine the edges of the chest. As you lean around the back your arm brushes against a trip wire...\nA dart flies out and stabs you in the eye. The world goes black.");
                        const showDeath = (ev: KeyboardEvent) => {
                            if (ev.key === " ") {
                                window.removeEventListener("keydown", showDeath);
                                this.game.showDeath();
                            }
                        };
                        window.addEventListener("keydown", showDeath);
                        break;
                }
            }
        },
        {
            interaction: false,
            prompt: "You step forward and feel a loose floorboard... you think you can remove it.",
            promptOptions: [ "Use your hands", "Leave it alone" ],
            promptAction: (choice: string) => {
                switch (choice) {
                    case "Use the Rusty Spade":
                        MapDataInteraction[4][1] = 10;
                        MapDataInteraction[5][1] = 11;
                        this.game.message!.setText("You begin to pry the board up. There is a loud crack and the boards break revealing an underground passage. It's a tight fit. You'll have to leave the Rusty Spade behind.");
                        this.game.player!.move(1, 0);
                        this.tiles[1][1][4].texture = this.sheet.textures["puddle.png"];
                        this.tiles[1][1][4].tint = 0x000000;
                        this.tiles[1][1][4].width = 80;
                        this.tiles[1][1][4].height = 80;
                        this.tiles[1][1][4].angle = 90;
                        this.tiles[2][1][4].texture = this.sheet.textures["planks.png"];
                        break;
                    case "Use your hands":
                        MapDataInteraction[4][1] = 0;
                        this.game.player!.enabled = false;
                        this.game.message!.setText("You begin to pry the board up. There is a loud crack and you scream as your fingers are crushed between the boards. You are trapped.\nIt is a painful death as you slowly die of thirst, unable to free yourself.");
                        const showDeath = (ev: KeyboardEvent) => {
                            if (ev.key === " ") {
                                window.removeEventListener("keydown", showDeath);
                                this.game.showDeath();
                            }
                        };
                        window.addEventListener("keydown", showDeath);
                        break;
                    case "Leave it alone":
                        this.game.player!.move(1, 0);
                        break;
                }
            }
        },
        {
            interaction: false,
            action: () => {
                if (this.tiles[3][7][5].visible) {
                    this.game.inventory!.removeItem("Rusty Spade");
                }
                this.game.player!.teleport(1, 5);
                this.game.player!.move(1, 0);
                this.shadows[1].visible = false;
            }
        },
        {
            interaction: false,
            action: () => {
                if (this.tiles[3][7][5].visible) {
                    this.game.inventory!.giveItem("Rusty Spade");
                }
                this.game.player!.teleport(1, 4);
                this.game.player!.move(1, 0);
            }
        },
        {
            interaction: true,
            prompt: "There is a bookcase stood against the wall. Through the gaps in the books you can see the crumbling wall behind.",
            promptOptions: [ "Move the bookcase", "Leave it alone" ],
            promptAction: (choice: string) => {
                switch (choice) {
                    case "Move the bookcase":
                        this.interactions[12].promptOptions!.splice(1, 0, "Look at the books");
                        this.game.message!.setText("You try to move the bookcase, but it's just too heavy.\n You brace yourself, waiting for death... nothing happens. You aren't sure what you were expecting.");
                        break;
                    case "Look at the books":
                        const options = [ "Red, Blue, Green", "Blue, Green, Red", "Green, Red, Blue" ];
                        if (this.game.inventory!.hasItem("Library Card")) {
                            options[0] = "Red, Green, Blue!";
                        }
                        this.game.message!.setPrompt(
                            "The books are oddly positioned. You look closer and see they are all on hinges.\nMaybe if you pulled them out in the right order?",
                            options,
                            (choice: string) => {
                                switch (choice) {
                                    case "Red, Green, Blue!":
                                        this.game.message!.setText("You remember the library card! You move the books carefully...\nOnce the last book is moved, the bookcase slides to the side and the wall crumbles neatly to the floor.");
                                        this.tiles[2][7][5].visible = false;
                                        this.tiles[3][7][5].visible = false;
                                        MapDataCollisionLeave[5][7] = [false, false, true, false];
                                        MapDataCollisionLeave[4][7] = false;
                                        this.game.player!.clearInteraction();
                                        MapDataInteraction[5][7] = 0;
                                        MapDataInteraction[4][7] = 14;
                                        this.game.player!.enabled = false;
                                        const movePlayer = (ev: KeyboardEvent) => {
                                            if (ev.key === " ") {
                                                window.removeEventListener("keydown", movePlayer);
                                                this.game.player!.move(0, -1);
                                            }
                                        }
                                        window.addEventListener("keydown", movePlayer);
                                        break;
                                    default:
                                        this.game.message!.setText("You pull the books carefully, making sure not to move anything unintentionally.\nAs soon as you move the last book, you hear a click and spike shoot up from the floor impaling you.");
                                        this.game.player!.enabled = false;
                                        const showDeath = (ev: KeyboardEvent) => {
                                            if (ev.key === " ") {
                                                window.removeEventListener("keydown", showDeath);
                                                this.game.showDeath(this.game.inventory!.hasItem("Rusty Spade"));
                                            }
                                        }
                                        window.addEventListener("keydown", showDeath);
                                        break;
                                }
                            }
                        )
                        break;
                }
            }
        },
        {
            interaction: true,
            prompt: "A mound of dirt sits on the ground with small flowers growing out of it.",
            promptOptions: [ "Start digging...", "Leave it alone" ],
            promptAction: (choice: string) => {
                switch (choice) {
                    case "Start digging...":
                        this.game.player!.enabled = false;
                        this.game.message!.setText("You start digging...");
                        const showNext = (ev: KeyboardEvent) => {
                            if (ev.key === " ") {
                                if (this.game.inventory!.hasItem("Rusty Spade")) {
                                    this.game.message!.setText("You dig for what feels like hours. You eventually hit clay and your work is harder, but you persevere. If this doesn't work then it's over. You can feel it.");
                                } else {
                                    this.game.message!.setText("You dig for what feels like hours. Your fingers are bloody and sweat falls from your brow. You are on the brink of collapse when you fingers hit clay.");
                                }
                                const showNextNext = (ev: KeyboardEvent) => {
                                    if (ev.key === " ") {
                                        if (this.game.inventory!.hasItem("Rusty Spade")) {
                                            this.game.message!.setText("You make it through! The light is bright and warm... You eventually push your way outside.\nYou escape and learn to live your life again. Eventually you die of old age.");
                                        } else {
                                            this.game.message!.setText("No...\nThere is no way to get through. You just need to rest. Just for a minute...");
                                        }
                                        const showDeath = (ev: KeyboardEvent) => {
                                            if (ev.key === " ") {
                                                window.removeEventListener("keydown", showDeath);
                                                this.game.showDeath(this.game.inventory!.hasItem("Rusty Spade"));
                                            }
                                        }
                                        window.addEventListener("keydown", showDeath);
                                        window.removeEventListener("keydown", showNextNext);
                                    }
                                };
                                window.addEventListener("keydown", showNextNext);
                                window.removeEventListener("keydown", showNext);
                            }
                        };
                        window.addEventListener("keydown", showNext);
                        break;
                }
            }
        },
        {
            interaction: false,
            message: "You got your Rusty Spade back!",
            action: () => {
                MapDataInteraction[4][7] = 0;
                this.game.inventory!.giveItem("Rusty Spade");
                this.game.player!.clearInteraction();
                this.game.player!.enabled = true;
            }
        }
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
