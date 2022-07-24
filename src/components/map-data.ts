import { Point } from "pixi.js";
import { Game } from "src/game";
import { InventoryItems } from "./inventory";

export interface InteractionData {
    interaction: boolean;
    action: (interaction: InteractionData) => void;
    extraData: { [key: string]: any };
    enabled: boolean;
}

export class MapData {
    public startPosition: Point = new Point(1, 2);

    public tiles = [
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
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, "trap_door/0/0/10/-0.8/0.8", undefined, undefined, undefined, undefined, undefined, "wall_demolished/0/0/-20/-1", undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, "dirt", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
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
            [ "wall/90", "wall/0/0/-20", "door_closed/0/0/-20", "wall/0/0/-20", "inner_diagonal/0/-20/-20", undefined, undefined, undefined, undefined, "wall/270" ],
            [ "wall/90", "wall/0/0/-20/1/1/0", "wall/0/0/-20/1/1/0", "wall/0/0/-20/1/1/0", "wall/0/0/-20/1/1/0", "wall/0/0/-20/1/1/0", "wall/0/0/-20/1/1/0", "wall/0/0/-20/1/1/0", "wall/0/0/-20/1/1/0", "wall/270" ],
            [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
            [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
            [ "wall/90", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "wall/270" ],
            [ "inner_diagonal/90", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "inner_diagonal" ]
        ],
        [
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, "spade/-10/50/0/0.7/0.7/0", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
            [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ]
        ]
    ];
    
    public collisionEnter = [
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
    
    public collisionLeave = [
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
    
    public interactions = [
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

    public events: InteractionData[] = [
        {
            interaction: false,
            action: () => null,
            extraData: {},
            enabled: true
        },
        {
            interaction: true,
            action: () => {
                this.game.message?.setText("A strong iron door stands before you.\nThere is no lock and no handle. It's basically a wall.");
            },
            extraData: {},
            enabled: true
        },
        {
            interaction: true,
            action: () => {
                this.game.message?.setText("The bed I woke up in is uncomfortable and slightly damp.");
            },
            extraData: {},
            enabled: true
        },
        {
            interaction: true,
            action: (interaction) => {
                if (interaction.extraData["open"]) {
                    this.game.message?.setText("The drawer is empty.");
                } else {
                    if (this.game.inventory?.hasItem(InventoryItems.DrawerKey)) {
                        this.game.message?.setText(
                            [
                                "You unlocked the drawer! There is an old library card in there.\nIt doesn't have a name on it, but does have a colourful logo on the front.",
                                "There is nothing else in the drawer."
                            ],
                            () => {
                                this.game.inventory?.removeItem(InventoryItems.DrawerKey);
                                this.game.inventory?.giveItem(InventoryItems.LibraryCard);
                                interaction.extraData["open"] = true;
                            }
                        );
                    } else {
                        this.game.message?.setText("There is a drawer under the table... it's locked.");
                    }
                }
            },
            extraData: {
                "open": false
            },
            enabled: true
        },
        {
            interaction: true,
            action: (interaction) => {
                this.game.message?.setText("There is a small key buried in these planks.", () => {
                    this.game.inventory?.giveItem(InventoryItems.DrawerKey);
                    interaction.enabled = false;
                });
            },
            extraData: {},
            enabled: true
        },
        {
            interaction: true,
            action: () => {
                if (this.game.inventory?.hasItem(InventoryItems.LibraryCard)) {
                    this.game.message?.setText(
                        "As you push the library card into the gap, you feel something give! You have a moment of triumph before the blade swings down.",
                        () => {
                            this.game.showDeath();
                        }
                    );

                } else {
                    this.game.message?.setText("The door is locked. There is a gap though...\nif only I have something thin to open the lock with.");
                }
            },
            extraData: {},
            enabled: true
        },
        {
            interaction: true,
            action: (interaction) => {
                this.game.message?.setPrompt(
                    "There is a small hole in the wall there... you think you could fit your hand in it.",
                    [ "Put your hand in", "Leave it alone" ],
                    (choice) => {
                        switch (choice) {
                            case "Put your hand in":
                                this.interactions[3][1] = 0;
                                this.interactions[3][2] = 0;
                                this.collisionEnter[4][2] = false;
                                this.game.map!.shadows[0].visible = false;
                                this.game.map!.tiles[3][2][4].texture = this.game.sheet!.textures["doorway.png"];
                                this.game.map!.tiles[3][7][5].texture = this.game.sheet!.textures["wall_damaged.png"];
                                for (let x = 1; x < 9; x++) {
                                    this.game.map!.tiles[3][x][5].alpha = 1;
                                }
                                this.game.message!.setText("You hear a small click and the door swings open!");
                                break;
                            case "Leave it alone":
                                this.game.player?.updateInteraction(interaction);
                                break;
                        }
                    }
                )
            },
            enabled: true,
            extraData: {}
        },
        {
            interaction: true,
            action: (interaction) => {
                this.game.message!.setPrompt(
                    "There are a few large cracks in this wall. Odd.",
                    [ "Push on the wall", "Leave it alone" ],
                    (choice: string) => {
                        if (choice === "Push on the wall") {
                            this.game.message?.setText(
                                "You push on the wall and one of the bricks falls down. You briefly see wooden boards on the other side, before the ceiling collapses above you.",
                                () => {
                                    this.game.showDeath();
                                }
                            );
                        } else {
                            this.game.player?.updateInteraction(interaction);
                        }
                    }
                )
            },
            enabled: true,
            extraData: {}
        },
        {
            interaction: true,
            action: (interaction) => {
                this.game.message?.setPrompt(
                    "There is a chest near a pile of old barrels. There is a padlock, but it appears to be unlocked.",
                    [ "Open the chest", "Examine closer", "Leave it alone" ],
                    (choice: string) => {
                        switch (choice) {
                            case "Open the chest":
                                interaction.enabled = false;
                                this.game.message!.setText("You open the chest. Something clicks behind it, but nothing happens. Oh well!\n Inside you find hundreds of gold coins! (jk) You find a rusty spade.");
                                this.game.inventory!.giveItem(InventoryItems.RustySpade);
                                break;
                            case "Examine closer":
                                interaction.enabled = false;
                                this.game.message!.setText("You carefully examine the edges of the chest. As you lean around the back your arm brushes against a trip wire...\nA dart flies out and stabs you in the eye. The world goes black.");
                                const showDeath = (ev: KeyboardEvent) => {
                                    if (ev.key === " ") {
                                        window.removeEventListener("keydown", showDeath);
                                        this.game.showDeath();
                                    }
                                };
                                window.addEventListener("keydown", showDeath);
                                break;
                            case "Leave it alone":
                                this.game.player?.updateInteraction(interaction);
                                break;
                        }
                    }
                )
            },
            enabled: true,
            extraData: {}
        },
        {
            interaction: false,
            action: () => {
                const options = [ "Use your hands", "Leave it alone" ];
                if (this.game.inventory?.hasItem(InventoryItems.RustySpade)) {
                    options.unshift("Use the Rusty Spade");
                }
                this.game.message?.setPrompt(
                    "You step forward and feel a loose floorboard... you think you can remove it.",
                    options,
                    (choice: string) => {
                        switch (choice) {
                            case "Use the Rusty Spade":
                                this.interactions[4][1] = 10;
                                this.interactions[5][1] = 11;
                                this.game.message!.setText("You begin to pry the board up. There is a loud crack and the boards break revealing an underground passage. It's a tight fit. You'll have to leave the Rusty Spade behind.");
                                this.game.player!.move(1, 0);
                                this.game.map!.tiles[1][1][4].texture = this.game.sheet!.textures["puddle.png"];
                                this.game.map!.tiles[1][1][4].tint = 0x000000;
                                this.game.map!.tiles[1][1][4].width = 80;
                                this.game.map!.tiles[1][1][4].height = 80;
                                this.game.map!.tiles[1][1][4].angle = 90;
                                this.game.map!.tiles[2][1][4].texture = this.game.sheet!.textures["planks.png"];
                                break;
                            case "Use your hands":
                                this.game.message!.setText(
                                    "You begin to pry the board up. There is a loud crack and you scream as your fingers are crushed between the boards. You are trapped.\nIt is a painful death as you slowly die of thirst, unable to free yourself.",
                                    () => {
                                        this.game.showDeath();
                                    }
                                );
                                break;
                            case "Leave it alone":
                                this.game.player!.move(1, 0);
                                break;
                        }
                    }
                )
            },
            enabled: true,
            extraData: {}
        },
        {
            interaction: false,
            action: () => {
                if (this.game.map!.tiles[3][7][5].visible) {
                    this.game.inventory!.removeItem(InventoryItems.RustySpade);
                    this.game.map!.tiles[4][1][4].alpha = 1;
                }
                this.game.player!.teleport(1, 5);
                this.game.player!.move(1, 0);
                this.game.map!.shadows[1].visible = false;
            },
            enabled: true,
            extraData: {}
        },
        {
            interaction: false,
            action: () => {
                if (this.game.map!.tiles[3][7][5].visible) {
                    this.game.inventory!.giveItem(InventoryItems.RustySpade);
                    this.game.map!.tiles[4][1][4].alpha = 0;
                }
                this.game.player!.teleport(1, 4);
                this.game.player!.move(1, 0);
            },
            enabled: true,
            extraData: {}
        },
        {
            interaction: true,
            action: (interaction) => {
                const options = [ "Move the bookcase", "Leave it alone" ];
                if (interaction.extraData["triedmove"]) {
                    options.splice(1, 0, "Look at the books");
                }
                this.game.message?.setPrompt(
                    "There is a bookcase stood against the wall. Through the gaps in the books you can see the crumbling wall behind.",
                    options,
                    (choice: string) => {
                        switch (choice) {
                            case "Move the bookcase":
                                this.game.message!.setText(
                                    "You try to move the bookcase, but it's just too heavy.\n You brace yourself, waiting for death... nothing happens. You aren't sure what you were expecting.",
                                    () => {
                                        interaction.extraData["triedmove"] = true;
                                        this.game.player?.updateInteraction(interaction);
                                    }
                                );
                                break;
                            case "Look at the books":
                                let message = "The books are oddly positioned. You look closer and see they are all on hinges.\nMaybe if you pulled them out in the right order?";
                                const options = [ "Red, Blue, Green?", "Blue, Green, Red?", "Green, Red, Blue?", "Leave it alone" ];
                                if (this.game.inventory!.hasItem(InventoryItems.LibraryCard)) {
                                    options[0] = "Red, Green, Blue!";
                                } else {
                                    message += "\nI'll have to guess...";
                                }
                                this.game.message!.setPrompt(
                                    message,
                                    options,
                                    (choice: string) => {
                                        switch (choice) {
                                            case "Red, Green, Blue!":
                                                this.game.message!.setText(
                                                    "You remember the library card! You move the books carefully...\nOnce the last book is moved, the bookcase slides to the side and the wall crumbles neatly to the floor.",
                                                    () => {
                                                        this.game.map!.tiles[2][7][5].visible = false;
                                                        this.game.map!.tiles[3][7][5].visible = false;
                                                        this.collisionLeave[5][7] = [false, false, true, false];
                                                        this.collisionLeave[4][7] = false;
                                                        this.interactions[5][7] = 0;
                                                        this.interactions[4][7] = 14;
                                                        this.game.player?.setEnabled(false, "bookcase");
                                                        this.game.player!.move(0, -1);
                                                    }
                                                );
                                                break;
                                            case "Leave it alone":
                                                this.game.player?.updateInteraction(interaction);
                                                break;
                                            default:
                                                this.game.message!.setText(
                                                    "You pull the books carefully, making sure not to move anything unintentionally.\nAs soon as you move the last book, you hear a click and spike shoot up from the floor impaling you.",
                                                    () => {
                                                        this.game.showDeath();
                                                    }
                                                );
                                                break;
                                        }
                                    }
                                )
                                break;
                            case "Leave it alone":
                                this.game.player?.updateInteraction(interaction);
                                break;
                        }
                    }
                )
            },
            enabled: true,
            extraData: {
                "triedmove": false
            }
        },
        {
            interaction: true,
            action: (interaction) => {
                this.game.message?.setPrompt(
                    "A mound of dirt sits on the ground with small flowers growing out of it.",
                    [ "Start digging...", "Leave it alone" ],
                    (choice: string) => {
                        switch (choice) {
                            case "Start digging...":
                                if (this.game.inventory!.hasItem(InventoryItems.RustySpade)) {
                                    this.game.message!.setText([
                                        "You start digging...",
                                        "You dig for what feels like hours. You eventually hit clay and your work is harder, but you persevere. If this doesn't work then it's over. You can feel it.",
                                        "You make it through! The light is bright and warm... You eventually push your way outside.\nYou escape and learn to live your life again. Eventually you die of old age."
                                    ], () => {
                                        this.game.showDeath(true);
                                    });
                                } else {
                                    this.game.message!.setText([
                                        "You start digging...",
                                        "You dig for what feels like hours. Your fingers are bloody and sweat falls from your brow. You are on the brink of collapse when you fingers hit clay.",
                                        "No...\nThere is no way to get through. You just need to rest. Just for a minute..."
                                    ], () => {
                                        this.game.showDeath();
                                    });
                                }
                                break;
                            case "Leave it alone":
                                this.game.player?.updateInteraction(interaction);
                                break;
                        }
                    }
                )
            },
            enabled: true,
            extraData: {}
        },
        {
            interaction: false,
            action: (interaction) => {
                this.game.message?.setText(
                    "You got your Rusty Spade back!",
                    () => {
                        interaction.enabled = false;
                        this.game.inventory!.giveItem(InventoryItems.RustySpade);
                        this.game.map!.tiles[4][1][4].alpha = 0;
                        this.game.player?.setEnabled(true, "bookcase");
                    }
                );
            },
            enabled: true,
            extraData: {}
        }
    ];

    constructor(private game: Game) {

    }
}
