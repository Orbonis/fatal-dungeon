import { Application, Container, Graphics, Loader, NineSlicePlane, Sprite, Spritesheet, Text, TextStyle } from "pixi.js";
import { Map } from "./components/map";
import { Player, PlayerColour } from "./components/player";
import { update as TweenUpdate } from "@tweenjs/tween.js";
import { Message } from "./components/message";
import { Inventory } from "./components/inventory";
import { OutlineFilter } from "pixi-filters";
import { MapData } from "./components/map-data";
import { LoadFonts } from "./utils/load-font";

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

        LoadFonts("Edu VIC WA NT Beginner", "Permanent Marker").then(() => {
            Loader.shared
                .add("assets/spritesheet.json")
                .load((loader, resources) => {
                    this.sheet = resources["assets/spritesheet.json"]?.spritesheet;

                    this.showWelcomeScreen(() => {
                        this.map = new Map(this, new MapData(this), this.app!.stage);
                        this.message = new Message(this, this.app!.stage);
                        this.player = new Player(this, PlayerColour.Red, this.app!.stage);
                        this.inventory = new Inventory(this, this.app!.stage);
        
                        this.player.setEnabled(false, "initialPause");
                        window.setTimeout(() => {
                            this.player!.setEnabled(true, "initialPause");
                            this.message!.setText("You awaken from a deep sleep in a makeshift bed with no idea how you got here. There is a note... it reads:\n\nESCAPE THE FATAL DUNGEON", undefined, 0xCC3333);
                        }, 500);
                    });

                    this.app!.render();
                    canvas.style.display = "block";
                    requestAnimationFrame((time) => this.render(time));
                }
            );
        });
    }

    public showWelcomeScreen(callback: Function): void {
        const container = new Container();

        const fade = new Graphics();
        fade.beginFill(0xFFFFFF, 1);
        fade.drawRect(0, 0, 1500, 1000);
        fade.endFill();
        container.addChild(fade);
        
        const box = new NineSlicePlane(this.sheet!.textures["ui_box_filled.png"], 10, 10, 10, 10);
        box.width = 700;
        box.height = 400;
        box.pivot.set(350, 250);
        box.x = 750;
        box.y = 300;
        container.addChild(box);

        const titleStyle = new TextStyle({ align: "center", fontSize: 80, fontWeight: "bold", fill: 0xCC3333, wordWrap: true, wordWrapWidth: 650, fontFamily: "Edu VIC WA NT Beginner" });
        const title = new Text("FATAL DUNGEON", titleStyle);
        title.anchor.set(0.5, 0.5);
        title.x = 350;
        title.y = 100;
        box.addChild(title);

        const textStyle = new TextStyle({ align: "center", fontSize: 40, fontWeight: "bold", fill: 0x000000, wordWrap: true, wordWrapWidth: 650, fontFamily: "Edu VIC WA NT Beginner" });
        const text = new Text("In this game you must avoid making mistakes. They are usually fatal.", textStyle);
        text.anchor.set(0.5, 0.5);
        text.x = 350;
        text.y = 300;
        box.addChild(text);

        const controlBox = new NineSlicePlane(this.sheet!.textures["ui_box_filled.png"], 10, 10, 10, 10);
        controlBox.width = 400;
        controlBox.height = 250;
        controlBox.pivot.set(200, 250);
        controlBox.x = 750;
        controlBox.y = 750;
        container.addChild(controlBox);

        const controlsStyle = new TextStyle({ align: "left", fontSize: 40, fontWeight: "bold", fill: 0x000000, wordWrap: true, wordWrapWidth: 650, fontFamily: "Edu VIC WA NT Beginner" });
        const controlsText1 = new Text("Move", controlsStyle);
        controlsText1.anchor.set(0, 0.5);
        controlsText1.x = 200;
        controlsText1.y = 75;
        controlBox.addChild(controlsText1);
        const controlsText2 = new Text("Interact", controlsStyle);
        controlsText2.anchor.set(0, 0.5);
        controlsText2.x = 200;
        controlsText2.y = 175;
        controlBox.addChild(controlsText2);

        const arrows = new Sprite(this.sheet!.textures["ui_arrows.png"]);
        arrows.width = 48 * 2;
        arrows.height = 32 * 2;
        arrows.anchor.set(1, 0.5);
        arrows.x = 175;
        arrows.y = 75;
        controlBox.addChild(arrows);
        
        const spacebar = new Sprite(this.sheet!.textures["ui_spacebar.png"]);
        spacebar.width = 48 * 2;
        spacebar.height = 16 * 2;
        spacebar.anchor.set(1, 0.5);
        spacebar.x = 175;
        spacebar.y = 175;
        controlBox.addChild(spacebar);

        this.app!.stage.addChild(container);

        const begin = new Text("Press           to begin...", textStyle);
        begin.anchor.set(0.5, 0.5);
        begin.x = 750;
        begin.y = 900;
        begin.visible = false;
        container.addChild(begin);

        const spacebarBegin = new Sprite(this.sheet!.textures["ui_spacebar.png"]);
        spacebarBegin.width = 48 * 2;
        spacebarBegin.height = 16 * 2;
        spacebarBegin.anchor.set(1, 0.5);
        spacebarBegin.x = 765;
        spacebarBegin.y = 900;
        spacebarBegin.visible = false;
        container.addChild(spacebarBegin);

        window.setTimeout(() => {
            begin.visible = true;
            spacebarBegin.visible = true;
            const beginCallback = (ev: KeyboardEvent) => {
                if (ev.key === " ") {
                    window.removeEventListener("keydown", beginCallback)
                    container.destroy();
                    callback();
                }
            };
            window.addEventListener("keydown", beginCallback);
        }, 500);
    }

    public showDeath(final: boolean = false): void {
        this.player?.setEnabled(false, "death");
        const blackOutline = new OutlineFilter(10, 0x000000, 1);
        const redOutline = new OutlineFilter(10, 0xBB3333, 1);
        redOutline.padding = 5;
        const fade = new Graphics();
        fade.beginFill(0xFFFFFF, 0.8);
        fade.drawRect(0, 0, 1000, 1000);
        fade.endFill();
        const splat = new Sprite(this.sheet!.textures["splat.png"]);
        splat.width = 1000;
        splat.height = 1000;
        splat.tint = 0xBB3333;
        const message = (final) ? "FATALITY\nIS INEVITABLE" : "FATAL\nMISTAKE";
        const text = new Text(message, { fill: 0xFFFFFF, fontSize: 100, align: "center", fontWeight: 400, fontFamily: "Permanent Marker" });
        text.anchor.set(0.5, 0.5);
        text.x = 470;
        text.y = 470;
        text.filters = [ redOutline ];
        const container = new Container();
        container.addChild(splat, text);
        container.filters = [ blackOutline ];
        container.cacheAsBitmap = true;
        this.app!.stage.addChild(fade, container);

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
