import { Application, Graphics, Loader, Point, Sprite, Text } from "pixi.js";
import { Map } from "./components/map";
import { Player, PlayerColour } from "./components/player";
import { update as TweenUpdate } from "@tweenjs/tween.js";
import { Message, MessagePosition } from "./components/message";
import { Inventory } from "./components/inventory";

export class Game {
    public app?: Application;
    public map?: Map;
    public message?: Message;
    public player?: Player;
    public inventory?: Inventory;

    private delta: number = 0;
    private lastUpdateTime?: number;

    public init(canvas: HTMLCanvasElement): void {
        this.app = new Application({
            view: canvas,
            autoStart: false,
            width: 1500,
            height: 1000,
            transparent: true
        });

        Loader.shared
            .add("assets/spritesheet.json")
            .add("assets/splat.png")
            .load((loader, resources) => {
                const sheet = resources["assets/spritesheet.json"]?.spritesheet;
                this.map = new Map(this, sheet!, new Point(1, 2), this.app!.stage);
                this.message = new Message(this, this.app!.stage);
                this.player = new Player(this, sheet!, PlayerColour.Red, this.app!.stage);
                this.inventory = new Inventory(this, this.app!.stage);

                this.message.setText("You awaken from a deep sleep in a makeshift bed with no idea how you got here. There is a note... it reads:\n\nESCAPE THE FATAL DUNGEON", 0xCC3333);

                this.app!.render();
                canvas.style.display = "block";
                requestAnimationFrame((time) => this.render(time));
            }
        );
    }

    public showDeath(): void {
        this.player!.enabled = false;
        const fade = new Graphics();
        fade.beginFill(0xFFFFFF, 0.8);
        fade.drawRect(0, 0, 1000, 1000);
        fade.endFill();
        const splat = new Sprite(Loader.shared.resources["assets/splat.png"].texture);
        splat.width = 1000;
        splat.height = 1000;
        splat.tint = 0xCC3333;
        const text = new Text("FATAL MISTAKE", { fill: 0x000000, fontSize: 100, align: "center", fontWeight: "bold" });
        text.anchor.set(0.5, 0.5);
        text.x = 500;
        text.y = 500;
        this.app!.stage.addChild(fade, splat, text);

        window.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (ev.key === " ") {
                location.reload();
            }
        });
    }

    private render(time: number): void {
        this.delta = (time - (this.lastUpdateTime ?? 0)) / 1000;

        if (this.lastUpdateTime) {
            TweenUpdate(time);
            this.prerender(this.delta);
            this.app?.render();
        }

        this.lastUpdateTime = time;
        requestAnimationFrame((time) => this.render(time));
    }

    private prerender(delta: number): void {
        
    }
}
