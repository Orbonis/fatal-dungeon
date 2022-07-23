import { GlowFilter } from "pixi-filters";
import { Container, Graphics, Text, TextStyle } from "pixi.js";

export enum MessagePosition {
    Top, Bottom
}

export class Message {
    private box: Graphics;
    private text: Text;
    private timeoutTimer?: number;

    constructor(stage: Container) {
        this.box = new Graphics();
        this.box.lineStyle(4, 0x000000);
        this.box.beginFill(0xFFFFFF);
        this.box.drawRoundedRect(0, 0, 700, 200, 10);
        this.box.endFill();
        stage.addChild(this.box);
        
        const style = new TextStyle({ align: "center", fontSize: 30, fill: 0x000000, wordWrap: true, wordWrapWidth: 650 });
        this.text = new Text("", style);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = 350;
        this.text.y = 100;
        this.box.addChild(this.text);
    }

    public setText(text: string, colour?: number, position?: MessagePosition, timeout?: number): void {
        this.box.parent.setChildIndex(this.box, this.box.parent.children.length - 1);
        this.box.visible = text.length > 0;
        this.text.text = text;
        if (colour !== undefined) {
            this.text.style.fill = colour;
        }

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

        if (this.timeoutTimer !== undefined) {
            window.clearTimeout(this.timeoutTimer);
        }

        if (timeout !== undefined) {
            this.timeoutTimer = window.setTimeout(() => {
                this.text.visible = false;
            }, timeout);
        }
    }
}
