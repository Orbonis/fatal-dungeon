import { Tween } from "@tweenjs/tween.js";
import { GlowFilter } from "pixi-filters";
import { Container, Point, Sprite, Spritesheet, Text, TextStyle } from "pixi.js";
import { Game } from "src/game";
import { InteractionData } from "./map";

export enum PlayerColour {
    Red = "red", Green = "green", Purple = "purple", Yellow = "yellow"
}

export class Player {
    public enabled: boolean;

    private body: Sprite;
    private questionMark: Text;
    private position: Point;
    private moveTween?: Tween<Sprite>;
    private interaction?: InteractionData;

    constructor(private game: Game, sheet: Spritesheet, colour: PlayerColour, stage: Container) {
        this.body = new Sprite(sheet.textures[`${colour}_character.png`]);
        this.body.width = 100;
        this.body.height = 100;
        this.body.anchor.set(0.5, 0.5);

        const filter: GlowFilter = new GlowFilter({ color: 0x000000, distance: 10, quality: 10 });
        const style: TextStyle = new TextStyle({ fontSize: 60, fill: 0xFFFFFF });
        this.questionMark = new Text("?", style);
        this.questionMark.anchor.set(0.5, 0.5);
        this.questionMark.filters = [ filter ];
        this.questionMark.visible = false;
        this.body.addChild(this.questionMark);

        stage.addChildAt(this.body, 2);

        this.position = new Point(0, 0);
        this.setPosition(this.game.map!.startPosition.x, this.game.map!.startPosition.y, true);

        window.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (this.enabled) {
                switch (ev.key) {
                    case "ArrowUp":
                        this.move(0, -1);
                        break;
                    case "ArrowDown":
                        this.move(0, 1);
                        break;
                    case "ArrowLeft":
                        this.move(-1, 0);
                        break;
                    case "ArrowRight":
                        this.move(1, 0);
                        break;
                    case " ":
                        this.activateInteraction(true);
                        break;
                }
            }
        });

        this.enabled = true;
    }

    public clearInteraction(): void {
        this.interaction = undefined;
        this.questionMark.visible = false;
    }

    public getPosition(): Point {
        return this.position;
    }

    public move(x: number, y: number): void {
        const direction = (x > 0) ? 1 : (x < 0) ? 3 : (y > 0) ? 2 : 0;
        if (this.game.map!.canLeave(this.position.x, this.position.y, direction) && this.game.map!.canEnter(this.position.x + x, this.position.y + y)) {
            this.setPosition(this.position.x + x, this.position.y + y);
        }
    }

    public teleport(x: number, y: number): void {
        this.setPosition(x, y, true);
    }

    private setPosition(x: number, y: number, teleport: boolean = false): void {
        if (this.moveTween) {
            this.moveTween.stop();
            this.moveTween = undefined;
        }
        
        this.updateInteraction(undefined);

        if (teleport) {
            this.body.x = (x * 100) + 50;
            this.body.y = (y * 100) + 50;
        } else {
            this.moveTween = new Tween(this.body)
                .to({ x: (x * 100) + 50, y: (y * 100) + 50 }, 200)
                .onComplete(() => {
                    const interaction = this.game.map!.checkInteraction(x, y);
                    this.updateInteraction(interaction);
                })
                .start();
        }

        this.position.set(x, y);
    }

    private updateInteraction(interaction?: InteractionData): void {
        this.interaction = interaction;
        if (interaction) {
            this.questionMark.visible = interaction.interaction;
            this.activateInteraction(false);
        } else {
            this.questionMark.visible = false;
            this.activateInteraction(false);
        }
    }

    private activateInteraction(keyPress: boolean): void {
        this.game.message!.setText("");
        if (this.interaction) {
            const shouldActivate: boolean = !this.interaction.interaction || keyPress;
            if (shouldActivate) {
                if (this.interaction.message) {
                    this.game.message?.setText(this.interaction.message);
                }

                if (this.interaction.itemRequired) {
                    if (this.game.inventory!.hasItem(this.interaction.itemRequired)) {
                        this.game.inventory!.removeItem(this.interaction.itemRequired);
                        this.interaction.itemAlreadyUsed = true;
                        if (this.interaction.itemMessage) {
                            this.game.message?.setText(this.interaction.itemMessage);
                        }
                        if (this.interaction.itemAction) {
                            this.interaction.itemAction();
                        }
                    } else if (this.interaction.itemAlreadyUsed) {
                        if (this.interaction.itemAlreadyUsedMessage) {
                            this.game.message?.setText(this.interaction.itemAlreadyUsedMessage);
                        }
                    }
                } else {
                    if (this.interaction.action) {
                        this.interaction.action();
                    }
                }

                if (this.interaction?.prompt) {
                    this.game.message!.setPrompt(this.interaction.prompt, this.interaction.promptOptions, this.interaction.promptAction);
                }
            }
        }
    }
}
