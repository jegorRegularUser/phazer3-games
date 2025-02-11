class DiamondGroup extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.topDiamond = this.createDiamond(0, -100, "white"); 
        this.divider = this.createDivider(); 
        this.bottomDiamonds = [];

        for (let i = 0; i < 4; i++) {
            this.bottomDiamonds.push(this.createDiamond(0, 30 + i * 70, "white"));
        }

        this.scene.add.existing(this);
        this.setInteractiveDiamonds();
    }

    createDiamond(x, y, color) {
        let diamond = this.scene.add.polygon(x, y, [0, -30, 50, 0, 0, 30, -50, 0], color === "white" ? 0xffffff : 0x000000);
        diamond.setStrokeStyle(2, 0x000000);
        diamond.colorState = color;
        diamond.startY = y;
        this.add(diamond);
        return diamond;
    }

    createDivider() {
        let divider = this.scene.add.rectangle(0, -35, 120, 4, 0xffffff);
        this.add(divider);
        return divider;
    }

    setInteractiveDiamonds() {
        this.topDiamond.setInteractive();
        this.bottomDiamonds.forEach((diamond, index) => {
            diamond.setInteractive();
            diamond.index = index;
        });

        this.scene.input.on("gameobjectdown", (pointer, gameObject) => {
            if (gameObject === this.topDiamond) {
                this.toggleTopDiamond();
            } else {
                let diamondIndex = this.bottomDiamonds.indexOf(gameObject);
                if (diamondIndex !== -1) {
                    this.toggleBottomDiamonds(diamondIndex);
                }
            }
        });
    }

    toggleTopDiamond() {
        if (this.topDiamond.y === this.topDiamond.startY) {
            this.topDiamond.y = this.divider.y;
            this.topDiamond.fillColor = 0x000000;
            this.topDiamond.colorState = "black";
        } else {
            this.topDiamond.y = this.topDiamond.startY;
            this.topDiamond.fillColor = 0xffffff;
            this.topDiamond.colorState = "white";
        }
    }

    toggleBottomDiamonds(index) {
        let moveUp = this.bottomDiamonds[index].y !== this.divider.y + 10;
        for (let i = index; i < 4; i++) {
            let diamond = this.bottomDiamonds[i];
            if (moveUp) {
                diamond.y = this.divider.y + 10 + i * 5;
                diamond.fillColor = 0x000000;
                diamond.colorState = "black";
            } else {
                diamond.y = diamond.startY;
                diamond.fillColor = 0xffffff;
                diamond.colorState = "white";
            }
        }
    }
}

class MyGame extends Phaser.Scene {
    constructor() {
        super({ key: "MyGame" });
    }

    create() {
        this.diamondGroup = new DiamondGroup(this, 400, 300);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#A9B7C6",
    scene: MyGame
};

new Phaser.Game(config);
