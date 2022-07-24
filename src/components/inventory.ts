import { Container, Graphics, NineSlicePlane, Sprite, Text, TextStyle } from "pixi.js";
import { Game } from "src/game";

export enum InventoryItems {
    DrawerKey = "Small Key",
    LibraryCard = "Library Card",
    RustySpade = "Rusty Spade"
}

export class Inventory {
    private box: NineSlicePlane;
    private title: Text;

    private items: InventoryItems[];
    private itemSprites: { [key: string]: Sprite };

    constructor(private game: Game, stage: Container) {
        this.box = new NineSlicePlane(this.game.sheet!.textures["ui_box_filled.png"], 10, 10, 10, 10);
        this.box.x = 1050;
        this.box.width = 400;
        this.box.height = 1000;
        stage.addChild(this.box);

        const titleStyle = new TextStyle({ align: "center", fontSize: 40, fill: 0x000000, fontWeight: "bold", wordWrap: true, wordWrapWidth: 360, fontFamily: "Edu VIC WA NT Beginner" });

        this.title = new Text("Inventory", titleStyle);
        this.title.anchor.set(0.5, 0);
        this.title.x = 200;
        this.title.y = 30;
        this.box.addChild(this.title);

        this.itemSprites = {};

        const key: Sprite = new Sprite(this.game.sheet!.textures["tile_key.png"]);
        key.width = 140;
        key.height = 117;
        key.anchor.set(0.5, 0.5);
        key.x = 150;
        key.y = 200;
        this.box.addChild(key);
        this.itemSprites[InventoryItems.DrawerKey] = key;

        const card: Sprite = new Sprite(this.game.sheet!.textures["library_card.png"]);
        card.width = 200;
        card.height = 200;
        card.anchor.set(0.5, 0.5);
        card.angle = 30;
        card.x = 230;
        card.y = 450;
        this.box.addChild(card);
        this.itemSprites[InventoryItems.LibraryCard] = card;

        const spade: Sprite = new Sprite(this.game.sheet!.textures["spade.png"]);
        spade.width = 400;
        spade.height = 400;
        spade.anchor.set(0.5, 0.5);
        spade.angle = -30;
        spade.x = 200;
        spade.y = 800;
        this.box.addChild(spade);
        this.itemSprites[InventoryItems.RustySpade] = spade;

        this.items = [];
        this.updateInventoryText();
    }

    public giveItem(item: InventoryItems): void {
        this.items.push(item);
        this.updateInventoryText();
    }

    public removeItem(item: InventoryItems): void {
        this.items = this.items.filter((x) => x !== item);
        this.updateInventoryText();
    }

    public hasItem(item: InventoryItems): boolean {
        return this.items.some((x) => x === item);
    }

    private updateInventoryText(): void {
        for (const item of Object.values(InventoryItems)) {
            const visible = this.items.some((x) => x === item);
            this.itemSprites[item].visible = visible;
        }
    }
}
