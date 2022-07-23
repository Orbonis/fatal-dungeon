import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Game } from "src/game";

export class Inventory {
    private box: Graphics;
    private title: Text;
    private instructions: Text;
    private inventory: Text;

    private items: string[];

    constructor(private game: Game, stage: Container) {
        this.box = new Graphics();
        this.box.lineStyle(4, 0xCCCCCC);
        this.box.beginFill(0xFFFFFF);
        this.box.drawRoundedRect(0, 0, 400, 1000, 10);
        this.box.x = 1050;
        this.box.endFill();
        stage.addChild(this.box);

        const titleStyle = new TextStyle({ align: "left", fontSize: 40, fill: 0xCC3333, fontWeight: "bold", wordWrap: true, wordWrapWidth: 360 });

        this.title = new Text("FATAL DUNGEON", titleStyle);
        this.title.x = 20;
        this.title.y = 30;
        this.box.addChild(this.title);

        const style = new TextStyle({ align: "left", fontSize: 30, fill: 0x000000, wordWrap: true, wordWrapWidth: 360 });

        this.instructions = new Text("Controls:\nWASD: Move\nSpacebar: Interact", style);
        this.instructions.x = 20;
        this.instructions.y = 90;
        this.box.addChild(this.instructions);
        
        this.inventory = new Text("Inventory:\n<empty>", style);
        this.inventory.x = 20;
        this.inventory.y = 250;
        this.box.addChild(this.inventory);

        this.items = [];
        this.updateInventoryText();
    }

    public giveItem(item: string): void {
        this.items.push(item);
        this.updateInventoryText();
    }

    public removeItem(item: string): void {
        this.items = this.items.filter((x) => x !== item);
        this.updateInventoryText();
    }

    public hasItem(item: string): boolean {
        return this.items.some((x) => x === item);
    }

    private updateInventoryText(): void {
        this.inventory.text = `Inventory:\n${(this.items.length > 0) ? this.items.join("\n") : "<empty>"}`;
    }
}
