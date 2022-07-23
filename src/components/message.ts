import { GlowFilter } from "pixi-filters";
import { Container, Graphics, NineSlicePlane, Sprite, Text, TextMetrics, TextStyle } from "pixi.js";
import { Game } from "src/game";

export enum MessagePosition {
    Top, Bottom
}

export class Message {
    private box: NineSlicePlane;
    private boxText: Text;
    
    private prompt: NineSlicePlane;
    private promptText: Text;

    constructor(private game: Game, stage: Container) {
        const style = new TextStyle({ align: "center", fontSize: 40, fontWeight: "bold", fill: 0x000000, wordWrap: true, wordWrapWidth: 650, fontFamily: "Edu VIC WA NT Beginner" });

        this.box = new NineSlicePlane(this.game.sheet!.textures["ui_box_filled.png"], 10, 10, 10, 10);
        this.box.width = 700;
        this.box.height = 300;
        this.box.visible = false;
        stage.addChild(this.box);

        this.boxText = new Text("", style);
        this.boxText.anchor.set(0.5, 0.5);
        this.boxText.x = 350;
        this.boxText.y = 150;
        this.box.addChild(this.boxText);

        this.prompt = new NineSlicePlane(this.game.sheet!.textures["ui_box_filled.png"], 10, 10, 10, 10);
        this.prompt.width = 700;
        this.prompt.height = 400;
        this.prompt.visible = false;
        stage.addChild(this.prompt);
        
        this.promptText = new Text("", style);
        this.promptText.anchor.set(0.5, 0.5);
        this.promptText.x = 350;
        this.promptText.y = 100;
        this.prompt.addChild(this.promptText);
    }

    public setText(text: string | string[], callback?: Function, colour?: number): void {
        this.box.parent.setChildIndex(this.box, this.box.parent.children.length - 1);
        this.box.visible = text.length > 0;
        const messages = (typeof(text) === "string") ? [ text ] : text;
        this.boxText.text = messages.shift() ?? "";
        if (colour !== undefined) {
            this.boxText.style.fill = colour;
        } else {
            this.boxText.style.fill = 0x000000;
        }

        if (this.game.player) {
            const position = this.game.player.getPosition().y > 5 ? MessagePosition.Top : MessagePosition.Bottom;
            switch (position) {
                case MessagePosition.Top:
                    this.box.x = 150;
                    this.box.y = 150;
                    break;
                case MessagePosition.Bottom:
                    this.box.x = 150;
                    this.box.y = 550;
                    break;
            }

            if (this.boxText.text !== "") {
                this.game.player?.setEnabled(false, "message");
                window.setTimeout(() => {
                    const nextMessage = (ev: KeyboardEvent) => {
                        if (ev.key === " " || ev.key.startsWith("Arrow")) {
                            window.removeEventListener("keydown", nextMessage);
                            if (messages.length > 0) {
                                this.setText(messages, callback, colour);
                            } else {
                                this.setText("");
                                this.game.player?.setEnabled(true, "message");
                                if (callback) {
                                    callback();
                                }
                            }
                        }
                    };
                    window.addEventListener("keydown", nextMessage);
                }, 100);
            }
        }
    }

    public setPrompt(text: string, options: string[] = [ "Yes", "No" ], action?: (choice: string) => void): void {
        this.prompt.parent.setChildIndex(this.prompt, this.prompt.parent.children.length - 1);
        this.prompt.visible = text.length > 0;
        this.promptText.text = text;

        this.prompt.height = 400 + (Math.max(options.length - 3, 0) * 100);
        this.promptText.y = 100 + (Math.max(options.length - 3, 0) * 50);

        if (this.game.player) {
            const position = this.game.player.getPosition().y > 5 ? MessagePosition.Top : MessagePosition.Bottom;
            switch (position) {
                case MessagePosition.Top:
                    this.prompt.x = 150;
                    this.prompt.y = 150 - (Math.max(options.length - 3, 0) * 50);
                    break;
                case MessagePosition.Bottom:
                    this.prompt.x = 150;
                    this.prompt.y = 450 - (Math.max(options.length - 3, 0) * 50);
                    break;
            }
        }

        let selectedOption = 0;
        const optionsText: Text[] = [];
        for (let i = 0; i < options.length; i++) {
            const style = new TextStyle({ align: "center", fontSize: 40, fill: 0x000000, wordWrap: true, wordWrapWidth: 650, fontWeight: "bold", fontFamily: "Edu VIC WA NT Beginner" });
            const text = new Text(options[i], style);
            text.anchor.set(0.5, 0.5);
            text.x = this.promptText.x;
            text.y = 250 + (i * 50) + (Math.max(options.length - 3, 0) * 50);;
            this.prompt.addChild(text);
            optionsText.push(text);

            const hand = new Sprite(this.game.sheet!.textures["ui_hand.png"]);
            hand.anchor.set(1, 0.5);
            hand.x = -(TextMetrics.measureText(text.text, style, true).width / 2);
            text.addChild(hand);
        }

        const updateSelectionHighlight = () => {
            optionsText.forEach((text, i) => {
                text.style.fill = (i === selectedOption) ? 0x000000 : 0xAAAAAA;
                text.children[0].visible = i === selectedOption;
            });
        };

        const controlPrompt = (ev: KeyboardEvent) => {
            switch (ev.key) {
                case "ArrowUp":
                    selectedOption--;
                    if (selectedOption < 0) {
                        selectedOption = options.length - 1;
                    }
                    updateSelectionHighlight();
                    break;
                case "ArrowDown":
                    selectedOption++;
                    if (selectedOption === options.length) {
                        selectedOption = 0;
                    }
                    updateSelectionHighlight();
                    break;
                case " ":
                    this.prompt.visible = false;
                    this.game.player?.setEnabled(true, "prompt");
                    optionsText.forEach((x) => x.destroy());
                    window.removeEventListener("keydown", controlPrompt);
                    if (action) {
                        action(options[selectedOption]);
                    }
                    break;

            }
        };

        window.addEventListener("keydown", controlPrompt);
        updateSelectionHighlight();

        this.game.player?.setEnabled(false, "prompt");
    }
}
