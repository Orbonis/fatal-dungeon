import { Application, Graphics, Loader, Point, Sprite, Spritesheet, Text } from "pixi.js";
import { Map } from "./components/map";
import { Player, PlayerColour } from "./components/player";
import { update as TweenUpdate } from "@tweenjs/tween.js";
import { Message, MessagePosition } from "./components/message";
import { Inventory } from "./components/inventory";
import { GlowFilter } from "pixi-filters";
import { MapData } from "./components/map-data";

export class Game {
    public app?: Application;
    public map?: Map;
    public message?: Message;
    public player?: Player;
    public inventory?: Inventory;
    public sheet?: Spritesheet;

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
            .load((loader, resources) => {
                this.sheet = resources["assets/spritesheet.json"]?.spritesheet;
                this.map = new Map(this, new MapData(this), this.app!.stage);
                this.message = new Message(this, this.app!.stage);
                this.player = new Player(this, PlayerColour.Red, this.app!.stage);
                this.inventory = new Inventory(this, this.app!.stage);

                this.message.setText("You awaken from a deep sleep in a makeshift bed with no idea how you got here. There is a note... it reads:\n\nESCAPE THE FATAL DUNGEON", undefined, 0xCC3333);

                this.app!.render();
                canvas.style.display = "block";
                requestAnimationFrame((time) => this.render(time));
            }
        );
    }

    public showDeath(final: boolean = false): void {
        this.player?.setEnabled(false, "death");
        const filter = new GlowFilter({ color: 0xCC3333, distance: 20, outerStrength: 20, quality: 1 });
        const fade = new Graphics();
        fade.beginFill(0xFFFFFF, 0.8);
        fade.drawRect(0, 0, 1000, 1000);
        fade.endFill();
        const splat = new Sprite(this.sheet!.textures["splat.png"]);
        splat.width = 1000;
        splat.height = 1000;
        splat.tint = 0xCC3333;
        splat.filters = [ filter ];
        const message = (final) ? "FATALITY\nIS INEVITABLE" : "FATAL\nMISTAKE";
        const text = new Text(message, { fill: 0xFFFFFF, fontSize: 100, align: "center", fontWeight: "bold" });
        text.anchor.set(0.5, 0.5);
        text.x = 500;
        text.y = 500;
        text.filters = [ filter ];
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
