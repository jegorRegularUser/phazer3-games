//Все переменные снизу

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

    const settingsContainer = this.add.container(
      this.scale.width * 0.38 > 200 ? this.scale.width * 0.38 : 0,
      this.scale.height * 0.2
    );
    const spacing = 80;

    const modeLabel = this.add.text(0, 0, "Режим:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const modeContainer = this.add.container(150, -5);
    this.mode = "Обычный";
    const buttons = ["Обычный", "Усложняющийся"].map((mode, index) => {
      return this.add
        .text(index == 0 ? 0 : index * 100 + 30, 0, mode, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive()
        .on("pointerdown", () => setMode(mode, buttons));
    });

    buttons[0].setBackgroundColor(STYLES.backgroundGreen);

    const setMode = (newMode, buttons) => {
      this.mode = newMode;

      buttons.forEach((button) => {
        if (button.text === newMode) {
          button.setBackgroundColor(STYLES.backgroundGreen);
        } else {
          button.setBackgroundColor(STYLES.backgroundSec);
        }
      });
    };

    modeContainer.add(buttons);

    const digitCountLabel = this.add.text(0, spacing, "Значение:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const digitButtons = [1, 2, 3, 4].map((count, index) => {
      return this.add
        .text(150 + index * 50, spacing, `${count}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.digitCount = 2;
    digitButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.digitCount = index + 1;
        digitButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    digitButtons[this.digitCount - 1].setBackgroundColor(
      STYLES.backgroundGreen
    );

    const levelLabel = this.add.text(0, spacing * 2, "Уровень:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const levelButtons = [1, 2, 3, 4, 5].map((level, index) => {
      return this.add
        .text(150 + index * 50, spacing * 2, `${level}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });
    this.level = 1;
    levelButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.level = index + 3;
        levelButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    levelButtons[this.level - 1].setBackgroundColor(STYLES.backgroundGreen);
    this.level = 3;

    const startButton = this.add
      .text(291, spacing * 3.3, "Старт", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundGreen,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("GameScene", {
          mode: this.mode,
          digitCount: this.digitCount,
          level: this.level,
          score: 0,
        });
      });

    const backButton = this.add
      .text(157, spacing * 3.3, "Назад", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundSec,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        window.location.href = "index.html";
      });

    settingsContainer.add([
      modeLabel,
      modeContainer,
      digitCountLabel,
      ...digitButtons,
      levelLabel,
      ...levelButtons,
      startButton,
      backButton,
    ]);
  }
}
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create({ mode, digitCount, level, score }) {
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
    const horizontalGap = this.scale.width > 700 ? this.scale.width * 0.05 : 85;
    const verticalGap = this.scale.height * 0.06;

    const pyramidContainer = this.add.container(centerX + 45, pyramidY);

    rows.forEach((row, rowIndex) => {
      const rowContainer = this.add.container(0, rowIndex * verticalGap);
      const startX = -(row.length * horizontalGap) / 2;
      row.forEach((value, valueIndex) => {
        if (rowIndex === rows.length - 1) {
          console.log(value);
          const input = this.add.dom(
            startX + valueIndex * horizontalGap,
            0,
            "input",
            `width: 60px; text-align: center; border: 2px solid #ccc; border-radius: 10px; 
             padding: 5px; background-color: ${STYLES.backgroundMainDark}; color: ${STYLES.textWhite};
             font-size: ${STYLES.fontSizeSmall}; outline: none`
          );
          input.node.value = value;
          input.node.setAttribute("readonly", "readonly");

          rowContainer.add(input);
        } else {
          const input = this.add.dom(
            startX + valueIndex * horizontalGap,
            0,
            "input",
            `width: 60px; text-align: center; border: 2px solid #ccc; border-radius: 10px; 
                    padding: 5px; background-color: ${STYLES.backgroundMainDark}; color: ${STYLES.textWhite}; 
                    font-size: ${STYLES.fontSizeSmall}; outline: none`
          );

          this.inputs.push({ input, correctValue: value });
          rowContainer.add(input);
        }
      });
      pyramidContainer.add(rowContainer);
    });

    this.scoreText = this.add
      .text(centerX, 50, `Счет: ${score}`, {
        fontSize: STYLES.fontSizeMedium,
        color: STYLES.textWhite,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, this.scale.height * 0.8, "Проверить", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundGreen,
        padding: { x: 20, y: 10 },
        borderRadius: 10,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.inputs.forEach(({ input, correctValue }) => {
          if (+input.node.value === correctValue) {
            input.node.style.backgroundColor = STYLES.inputBackgroundCorrect;
            input.node.style.color = STYLES.inputTextCorrect;
            input.correctCheck = true;
          } else {
            input.node.style.backgroundColor = STYLES.inputBackgroundIncorrect;
            input.node.style.color = STYLES.inputTextIncorrect;
          }
        });

        this.continueButton
          .setAlpha(1)
          .setStyle({
            backgroundColor: STYLES.backgroundSec,
          })
          .setInteractive();
      });

    this.backButton = this.add
      .text(centerX - 92, this.scale.height * 0.85, "Настройки", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundSec,
        padding: { x: 10, y: 5 },
        borderRadius: 10,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("MenuScene"));

    this.continueButton = this.add
      .text(centerX + 98, this.scale.height * 0.85, "Продолжить", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundSecDark,
        padding: { x: 10, y: 5 },
        borderRadius: 10,
      })
      .setOrigin(0.5)
      .setAlpha(0.5)
      .disableInteractive()
      .on("pointerdown", () => {
        if (this.inputs.every(({ input }) => input.correctCheck)) {
          score++;
        }
        if (mode === "Обычный") {
          this.scene.restart({ mode, digitCount, level, score });
        } else {
          this.scene.restart({
            mode,
            digitCount: Math.min(digitCount + 1, 4),
            level: Math.min(level + 1, 7),
            score,
          });
        }
        this.scoreText.setText(`Счет: ${this.score}`);
      });
  }
}

const STYLES = {
  textWhite: "#ffffff",
  textGreen: "#00ff00",
  inputTextCorrect: "#004400",
  inputTextIncorrect: "#440000",

  backgroundSecDark: "#444444",
  backgroundSec: "#555555",
  backgroundMain: "#333333",
  backgroundMainDark: "#222222",
  backgroundGreen: "#00aa00",
  inputBackgroundCorrect: "#90EE90",
  inputBackgroundIncorrect: "#FFB6C1",

  fontSizeLarge: "28px",
  fontSizeMedium: "24px",
  fontSizeSmall: "18px",
};

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: STYLES.backgroundMain,
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
