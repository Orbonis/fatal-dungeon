import { Tween } from "@tweenjs/tween.js";
import { GlowFilter } from "pixi-filters";
import { Container, Point, Sprite, Spritesheet, Text, TextStyle } from "pixi.js";
import { Game } from "src/game";
import { InteractionData } from "./map-data";

export enum PlayerColour {
    Red = "red", Green = "green", Purple = "purple", Yellow = "yellow"
}

export class Player {
    private disabledReasons: string[];

    private body: Sprite;
    private questionMark: Text;
    private position: Point;
    private moveTween?: Tween<Sprite>;
    private interaction?: InteractionData;

    private moveQueue: Array<Point>;

    constructor(private game: Game, colour: PlayerColour, stage: Container) {
        this.body = new Sprite(this.game.sheet!.textures[`${colour}_character.png`]);
        this.body.width = 100;
        this.body.height = 100;
        this.body.anchor.set(0.5, 0.5);

        const style: TextStyle = new TextStyle({ fontSize: 40, fill: 0xFFFFFF, fontWeight: "bold", stroke: 0x222222, strokeThickness: 8 });
        this.questionMark = new Text("?", style);
        this.questionMark.anchor.set(0.5, 0.5);
        this.questionMark.visible = false;
        this.body.addChild(this.questionMark);

        new Tween(this.questionMark.scale)
            .to({ x: 1.5, y: 1.5 }, 500)
            .repeat(Infinity)
            .yoyo(true)
            .start();

        stage.addChildAt(this.body, 2);

        this.position = new Point(0, 0);
        this.moveQueue = [];
        this.setPosition(this.game.map!.mapData.startPosition.x, this.game.map!.mapData.startPosition.y, true);

        window.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (this.disabledReasons.length === 0) {
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

        this.disabledReasons = [];
    }

    public setEnabled(enabled: boolean, reason: string): void {
        this.disabledReasons = this.disabledReasons.filter((x) => x !== reason);
        if (!enabled) {
            this.disabledReasons.push(reason);
        }
    }

    public getPosition(): Point {
        return this.position;
    }

    public move(x: number, y: number): void {
        const direction = (x > 0) ? 1 : (x < 0) ? 3 : (y > 0) ? 2 : 0;
        if (this.moveTween) {
            if (this.moveQueue.length < 2) {
                this.moveQueue.push(new Point(x, y));
            }
        } else {
            if (this.game.map!.canLeave(this.position.x, this.position.y, direction) && this.game.map!.canEnter(this.position.x + x, this.position.y + y)) {
                this.setPosition(this.position.x + x, this.position.y + y);
            }
        }
    }

    public teleport(x: number, y: number): void {
        this.setPosition(x, y, true);
    }

    public updateInteraction(interaction?: InteractionData): void {
        this.interaction = interaction;
        if (interaction) {
            this.questionMark.visible = interaction.interaction && interaction.enabled;
            this.activateInteraction(false);
        } else {
            this.questionMark.visible = false;
            this.activateInteraction(false);
        }
    }

    private setPosition(x: number, y: number, teleport: boolean = false): void {
        this.updateInteraction(undefined);

        if (teleport) {
            this.body.x = (x * 100) + 50;
            this.body.y = (y * 100) + 50;
            this.moveQueue = [];
            if (this.moveTween) {
                this.moveTween.stop();
                this.moveTween = undefined;
            }
        } else {
            if (this.moveTween) {
                this.moveQueue.push(new Point(x, y));
            } else {
                this.moveTween = new Tween(this.body)
                    .to({ x: (x * 100) + 50, y: (y * 100) + 50 }, 200)
                    .onComplete(() => {
                        this.moveTween = undefined;
                        if (this.moveQueue.length > 0) {
                            const nextMove = this.moveQueue.shift();
                            this.move(nextMove!.x, nextMove!.y);
                        } else {
                            const interaction = this.game.map!.checkInteraction(x, y);
                            this.updateInteraction(interaction);
                        }
                    })
                    .start();
            }
        }

        this.position.set(x, y);
    }

    private activateInteraction(keyPress: boolean): void {
        if (this.interaction) {
            const shouldActivate: boolean = (!this.interaction.interaction || keyPress) && this.interaction.enabled;
            if (shouldActivate) {
                if (this.interaction.action) {
                    this.interaction.action(this.interaction);
                    this.updateInteraction(undefined);
                }
            }
        }
    }
}
