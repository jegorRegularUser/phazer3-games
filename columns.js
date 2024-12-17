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

    // Кол-во столбцов
    const columnCountLabel = this.add.text(0, 0, "Столбцы:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const columnButtons = [1, 2, 3, 4, 5].map((count, index) => {
      return this.add
        .text(150 + index * 50, 0, `${count}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.columnCount = 1;
    columnButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.columnCount = index + 1;
        columnButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    columnButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Операции
    const operationsLabel = this.add.text(0, spacing, "Операции:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const operationButtons = ["+", "-", "+/-"].map((op, index) => {
      return this.add
        .text(150 + index * 50, spacing, op, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.operation = "+";
    operationButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.operation = button.text;
        operationButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    operationButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Сложность
    const difficultyLabel = this.add.text(0, spacing * 2, "Сложность:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const difficultyButtons = [1, 2, 3, 4, 5, 6].map((level, index) => {
      return this.add
        .text(150 + index * 50, spacing * 2, `${level}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.difficulty = 1;
    difficultyButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.difficulty = button.text;
        difficultyButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    difficultyButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Слагаемые
    const addendsLabel = this.add.text(0, spacing * 3, "Слагаемые:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const addendButtons = [3, 4, 5, 6, 7, 8, 9, 10].map((count, index) => {
      return this.add
        .text(150 + index * 50, spacing * 3, `${count}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.addends = 3;
    addendButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.addends = button.text;
        addendButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    addendButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    const startButton = this.add
      .text(291, spacing * 4.2, "Старт", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundGreen,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("GameScene", {
          columnCount: this.columnCount,
          operation: this.operation,
          difficulty: this.difficulty,
          addends: this.addends,
          score: [
            { wins: 0, total: 0 },
            { wins: 0, total: 0 },
            { wins: 0, total: 0 },
            { wins: 0, total: 0 },
            { wins: 0, total: 0 },
          ],
        });
      });

    const backButton = this.add
      .text(157, spacing * 4.2, "Назад", {
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
      columnCountLabel,
      ...columnButtons,
      operationsLabel,
      ...operationButtons,
      difficultyLabel,
      ...difficultyButtons,
      addendsLabel,
      ...addendButtons,
      startButton,
      backButton,
    ]);
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create({ columnCount, operation, difficulty, addends, score }) {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.columnCount = columnCount;
    this.operation = operation;
    this.difficulty = difficulty;
    this.addends = addends;
    this.score = score;

    this.columns = [];
    this.correctAnswers = [];
    this.inputs = [];
    this.checkButtons = [];
    this.resultTexts = [];
    this.columnScores = [];

    const difficultes = [9, 99, 999, 9999, 99999, 999999];
    const numberRange =
      Math.pow(10, difficultes[difficulty - 1].toString().length) - 1;

    for (let i = 0; i < columnCount; i++) {
      const column = this.createColumn(i, numberRange);
      this.columns.push(column);

      const columnScore = this.add
        .text(
          centerX + i * 250 - (this.columnCount - 1) * 125,
          50,
          `${this.score[i].wins} из ${this.score[i].total}`,
          {
            fontSize: "32px",
            color: STYLES.textWhite,
          }
        )
        .setOrigin(0.5);
      this.columnScores.push(columnScore);

      const input = this.add.dom(
        centerX + i * 250 - (this.columnCount - 1) * 125,
        centerY + 100,
        "input",
        {
          width: "200px",
          height: "40px",
          textAlign: "center",
          fontSize: STYLES.fontSizeMedium,
          borderRadius: "5px",
        }
      );
      this.inputs.push(input);

      const checkButton = this.add
        .text(
          centerX + i * 250 - (this.columnCount - 1) * 125,
          centerY + 170,
          "Ответить",
          {
            fontSize: STYLES.fontSizeLarge,
            color: STYLES.textWhite,
            backgroundColor: STYLES.backgroundGreen,
            padding: { x: 20, y: 10 },
          }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => this.checkAnswer(i));
      this.checkButtons.push(checkButton);

      const resultText = this.add
        .text(centerX + i * 250 - (this.columnCount - 1) * 125, centerY, "", {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          padding: { x: 10, y: 5 },
        })
        .setOrigin(0.5);
      this.resultTexts.push(resultText);
    }

    this.backButton = this.add
      .text(centerX - 100, centerY + 290, "Назад", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundSec,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("MenuScene"));

    this.continueButton = this.add
      .text(centerX + 100, centerY + 290, "Продолжить", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundSec,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .disableInteractive()
      .setAlpha(0.5)
      .setStyle({
        backgroundColor: STYLES.backgroundSecDark,
      })
      .on("pointerdown", () => this.continueGame());
  }

  createColumn(index, numberRange) {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const column = [];
    let sum = 0;

    for (let i = 0; i < this.addends; i++) {
      const number = this.getRandomNumber(numberRange);
      column.push(number);
      sum += number;
    }

    const columnText = this.add
      .text(
        centerX + index * 250 - (this.columnCount - 1) * 125,
        centerY - 150,
        column.join("\n"),
        {
          fontSize: "38px",
          color: STYLES.textWhite,
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.correctAnswers.push(sum);
    return columnText;
  }

  getRandomNumber(numberRange) {
    let number = Phaser.Math.Between(1, numberRange);
    return this.operation === "-"
      ? -number
      : this.operation === "+/-"
      ? Phaser.Math.Between(0, 1)
        ? number
        : -number
      : number;
  }

  checkAnswer(columnIndex) {
    const userAnswer = parseInt(this.inputs[columnIndex].node.value);
    const correctAnswer = this.correctAnswers[columnIndex];

    const isCorrect = userAnswer === correctAnswer;

    const resultText = isCorrect
      ? `${userAnswer} = ${correctAnswer}!`
      : `${isNaN(userAnswer) ? 0 : userAnswer} ≠ ${correctAnswer}!`;

    this.columns[columnIndex].setVisible(false);
    this.inputs[columnIndex].setVisible(false);
    this.checkButtons[columnIndex].setVisible(false);

    this.resultTexts[columnIndex]
      .setText(resultText)
      .setBackgroundColor(
        isCorrect ? STYLES.backgroundGreen : STYLES.backgroundSec
      );

    if (isCorrect) {
      this.score[columnIndex].wins++;
    }
    this.score[columnIndex].total++;
    this.columnScores[columnIndex].setText(
      `${this.score[columnIndex].wins} из ${this.score[columnIndex].total}`
    );

    if (this.checkButtons.every((button) => !button.visible)) {
      this.backButton.setVisible(true);
      this.continueButton
        .setAlpha(1)
        .setStyle({
          backgroundColor: STYLES.backgroundSec,
        })
        .setInteractive();
    }
  }

  continueGame() {
    this.scene.restart({
      columnCount: this.columnCount,
      operation: this.operation,
      difficulty: this.difficulty,
      addends: this.addends,
      score: this.score,
    });
  }
}

const STYLES = {
  textWhite: "#ffffff",
  textGreen: "#00ff00",

  backgroundSecDark: "#444444",
  backgroundSec: "#555555",
  backgroundMain: "#333333",
  backgroundMainDark: "#222222",
  backgroundGreen: "#00aa00",

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
