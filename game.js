const STYLES = {
  textWhite: "#ffffff",
  textGreen: "#00ff00",
  inputTextColor: "#ffffff",
  inputTextCorrect: "#004400",
  inputTextIncorrect: "#440000",

  backgroundGray: "#555555",
  backgroundDarkGray: "#444444",
  backgroundDark: "#222222",
  backgroundGreen: "#00aa00",
  inputBackgroundCorrect: "#90EE90",
  inputBackgroundIncorrect: "#FFB6C1",

  fontSizeLarge: "28px",
  fontSizeMedium: "24px",
  fontSizeSmall: "18px",
};

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    this.add
      .text(this.scale.width / 2, this.scale.height * 0.1, "Настройки игры", {
        fontSize: "32px",
        color: STYLES.textWhite,
      })
      .setOrigin(0.5);

    const settingsContainer = this.add.container(this.scale.width / 4, this.scale.height * 0.2);

    this.add.text(this.scale.width / 4, this.scale.height * 0.2, "Режим:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });
    this.mode = "Обычный";
    this.add.text(this.scale.width * 0.3, this.scale.height * 0.2, this.mode, {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textGreen,
    });

    this.add.text(
        this.scale.width / 4,
      this.scale.height * 0.3,
      "Кол-во цифр:",
      {
        fontSize: STYLES.fontSizeMedium,
        color: STYLES.textWhite,
      }
    );
    const digitButtons = [1, 2, 3, 4].map((count, index) => {
      return this.add
        .text(
            this.scale.width * 0.35  + index * 50,
          this.scale.height * 0.3,
          `${count}`,
          {
            fontSize: STYLES.fontSizeMedium,
            color: STYLES.textWhite,
            backgroundColor: STYLES.backgroundGray,
            padding: { x: 10, y: 5 },
          }
        )
        .setInteractive();
    });
    this.digitCount = 2;
    digitButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.digitCount = index + 1;
        digitButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundGray)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    digitButtons[this.digitCount - 1].setBackgroundColor(
      STYLES.backgroundGreen
    );

    this.add.text(this.scale.width / 4, this.scale.height * 0.4, "Уровень:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });
    const levelButtons = [1, 2, 3, 4, 5].map((level, index) => {
      return this.add
        .text(
            this.scale.width * 0.35 + index * 50,
          this.scale.height * 0.4,
          `${level}`,
          {
            fontSize: STYLES.fontSizeMedium,
            color: STYLES.textWhite,
            backgroundColor: STYLES.backgroundGray,
            padding: { x: 10, y: 5 },
          }
        )
        .setInteractive();
    });
    this.level = 4;
    levelButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.level = index + 4;
        levelButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundGray)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    levelButtons[this.level - 4].setBackgroundColor(STYLES.backgroundGreen);

    const startButton = this.add
      .text(this.scale.width / 2, this.scale.height * 0.5, "Запустить игру", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundGreen,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();
    startButton.on("pointerdown", () => {
      this.scene.start("GameScene", {
        mode: this.mode,
        digitCount: this.digitCount,
        level: this.level,
      });
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create({ mode, digitCount, level }) {
    this.inputs = [];

    const baseRow = Array.from({ length: level }, () =>
      Phaser.Math.Between(
        Math.pow(10, digitCount - 1),
        Math.pow(10, digitCount) - 1
      )
    );
    const rows = [baseRow];

    for (let i = 0; i < level - 1; i++) {
      const prevRow = rows[0];
      const newRow = [];
      for (let j = 0; j < prevRow.length - 1; j++) {
        newRow.push(prevRow[j] + prevRow[j + 1]);
      }
      rows.unshift(newRow);
    }

    const pyramidY = this.scale.height * 0.2;
    const centerX = this.scale.width / 2;
    const horizontalGap = this.scale.width * 0.1;
    const verticalGap = this.scale.height * 0.08;

    rows.forEach((row, rowIndex) => {
      const startX = centerX - (row.length * horizontalGap) / 2;
      row.forEach((value, valueIndex) => {
        if (rowIndex === rows.length - 1) {
          this.add
            .text(
              startX + valueIndex * horizontalGap,
              pyramidY + rowIndex * verticalGap,
              value,
              {
                fontSize: STYLES.fontSizeSmall,
                color: STYLES.textWhite,
                backgroundColor: STYLES.backgroundDarkGray,
                padding: { x: 15, y: 8 },
                borderRadius: 10,
              }
            )
            .setOrigin(0.5);
        } else {
          const input = this.add.dom(
            startX + valueIndex * horizontalGap,
            pyramidY + rowIndex * verticalGap,
            "input",
            `width: 60px; text-align: center; border: 2px solid #ccc; border-radius: 10px; 
                        padding: 5px; background-color: ${STYLES.backgroundDark}; color: ${STYLES.inputTextColor}; 
                        font-size: ${STYLES.fontSizeSmall}; outline: none`
          );
          this.inputs.push({ input, correctValue: value });
        }
      });
    });

    const finishButton = this.add
      .text(centerX, this.scale.height * 0.8, "Завершить игру", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundGreen,
        padding: { x: 20, y: 10 },
        borderRadius: 10,
      })
      .setOrigin(0.5)
      .setInteractive();

    finishButton.on("pointerdown", () => {
      this.inputs.forEach(({ input, correctValue }) => {
        const enteredValue = parseInt(input.node.value, 10);
        if (enteredValue === correctValue) {
          input.node.style.backgroundColor = STYLES.inputBackgroundCorrect;
          input.node.style.color = STYLES.inputTextCorrect;
        } else {
          input.node.style.backgroundColor = STYLES.inputBackgroundIncorrect;
          input.node.style.color = STYLES.inputTextIncorrect;
        }
      });

      this.add
        .text(centerX - 150, this.scale.height * 0.9, "Вернуться в настройки", {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundGray,
          padding: { x: 10, y: 5 },
          borderRadius: 10,
        })
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => this.scene.start("MenuScene"));

      this.add
        .text(centerX + 100, this.scale.height * 0.9, "Продолжить", {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundGray,
          padding: { x: 10, y: 5 },
          borderRadius: 10,
        })
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () =>
          this.scene.restart({ mode, digitCount, level })
        );
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#333333",
  parent: "game-container",
  dom: {
    createContainer: true,
  },
  scene: [MenuScene, GameScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
