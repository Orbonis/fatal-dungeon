import { GlowFilter } from "pixi-filters";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Game } from "src/game";

export enum MessagePosition {
    Top, Bottom
}

export class Message {
    private box: Graphics;
    private boxText: Text;
    
    private prompt: Graphics;
    private promptText: Text;


    private timeoutTimer?: number;

    constructor(private game: Game, stage: Container) {
        const style = new TextStyle({ align: "center", fontSize: 30, fill: 0x000000, wordWrap: true, wordWrapWidth: 650 });

        this.box = new Graphics();
        this.box.lineStyle(4, 0x000000);
        this.box.beginFill(0xFFFFFF);
        this.box.drawRoundedRect(0, 0, 700, 200, 10);
        this.box.endFill();
        this.box.visible = false;
        stage.addChild(this.box);

        this.boxText = new Text("", style);
        this.boxText.anchor.set(0.5, 0.5);
        this.boxText.x = 350;
        this.boxText.y = 100;
        this.box.addChild(this.boxText);

        this.prompt = new Graphics();
        this.prompt.lineStyle(4, 0x000000);
        this.prompt.beginFill(0xFFFFFF);
        this.prompt.drawRoundedRect(0, 0, 700, 400, 10);
        this.prompt.endFill();
        this.prompt.visible = false;
        stage.addChild(this.prompt);
        
        this.promptText = new Text("", style);
        this.promptText.anchor.set(0.5, 0.5);
        this.promptText.x = 350;
        this.promptText.y = 100;
        this.prompt.addChild(this.promptText);
    }

    public setText(text: string, colour?: number, timeout?: number): void {
        this.box.parent.setChildIndex(this.box, this.box.parent.children.length - 1);
        this.box.visible = text.length > 0;
        this.boxText.text = text;
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
                    this.box.y = 650;
                    break;
            }
        }

        if (this.timeoutTimer !== undefined) {
            window.clearTimeout(this.timeoutTimer);
        }

        if (timeout !== undefined) {
            this.timeoutTimer = window.setTimeout(() => {
                this.box.visible = false;
            }, timeout);
        }
    }

    public setPrompt(text: string, options: string[] = [ "Yes", "No" ], action?: (choice: string) => void): void {
        this.prompt.parent.setChildIndex(this.prompt, this.prompt.parent.children.length - 1);
        this.prompt.visible = text.length > 0;
        this.promptText.text = text;

        if (this.game.player) {
            const position = this.game.player.getPosition().y > 5 ? MessagePosition.Top : MessagePosition.Bottom;
            switch (position) {
                case MessagePosition.Top:
                    this.prompt.x = 150;
                    this.prompt.y = 150;
                    break;
                case MessagePosition.Bottom:
                    this.prompt.x = 150;
                    this.prompt.y = 450;
                    break;
            }
        }

        let selectedOption = 0;
        const optionsText: Text[] = [];
        for (let i = 0; i < options.length; i++) {
            const style = new TextStyle({ align: "center", fontSize: 30, fill: 0x000000, wordWrap: true, wordWrapWidth: 650 });
            const text = new Text(options[i], style);
            text.anchor.set(0.5, 0.5);
            text.x = this.promptText.x;
            text.y = 250 + (i * 50);
            this.prompt.addChild(text);
            optionsText.push(text);
        }

        const updateSelectionHighlight = () => {
            optionsText.forEach((text, i) => text.style.fill = (i === selectedOption) ? 0x000000 : 0xAAAAAA);
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
                    if (action) {
                        action(options[selectedOption]);
                    }
                    this.prompt.visible = false;
                    this.game.player!.enabled = true;
                    optionsText.forEach((x) => x.destroy());
                    window.removeEventListener("keydown", controlPrompt);
                    break;

            }
        };

        window.addEventListener("keydown", controlPrompt);
        updateSelectionHighlight();

        if (this.timeoutTimer !== undefined) {
            window.clearTimeout(this.timeoutTimer);
        }

        this.game.player!.enabled = false;
    }
}
