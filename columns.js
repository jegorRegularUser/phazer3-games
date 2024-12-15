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
    const columnCountLabel = this.add.text(0, 0, "Кол-во столбцов:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const columnButtons = [1, 2, 3, 4, 5].map((count, index) => {
      return this.add
        .text(240 + index * 50, 0, `${count}`, {
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
      .text(225, spacing * 4.2, "Запустить игру", {
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
          score: { wins: 0, total: 0 },
        });
      });

    const backButton = this.add
      .text(225, spacing * 5.1, "Назад", {
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

    this.add
      .text(centerX, 50, `Счет: ${score.wins} из ${score.total}`, {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
      })
      .setOrigin(0.5);

    this.columns = [];
    this.correctAnswers = [];
    const difficultes = [9, 99, 999, 9999, 99999, 999999];
    const numberRange =
      Math.pow(10, difficultes[difficulty - 1].toString().length) - 1;

    for (let i = 0; i < columnCount; i++) {
      const column = this.createColumn(i, numberRange);
      this.columns.push(column);
    }

    this.answerInput = this.add.dom(centerX, centerY + 50, "input", {
      width: "200px",
      height: "40px",
      textAlign: "center",
      fontSize: STYLES.fontSizeMedium,
      borderRadius: "5px",
    });

    this.checkButton = this.add
      .text(centerX, centerY + 120, "Ответить", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundGreen,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.checkAnswer());

    this.backButton = this.add
      .text(centerX - 100, centerY + 190, "Назад", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundSec,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("MenuScene"));

    this.continueButton = this.add
      .text(centerX + 100, centerY + 190, "Продолжить", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundSec,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.continueGame());

    this.continueButton.setVisible(false);
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

    this.columnText = this.add
      .text(
        centerX + index * 150 - (this.columnCount - 1) * 75,
        centerY - 200,
        column.join("\n"),
        {
          fontSize: "38px",
          color: STYLES.textWhite,
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.correctAnswers.push(sum);
    return this.columnText;
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

  checkAnswer() {
    const userAnswer = parseInt(this.answerInput.node.value);
    const correctAnswer = this.correctAnswers.reduce((a, b) => a + b, 0);

    const isCorrect = userAnswer === correctAnswer;

    const resultText = isCorrect
      ? `${userAnswer} = ${correctAnswer} Правильно!`
      : `${isNaN(userAnswer) ? 0 : userAnswer} ≠ ${correctAnswer} Неправильно!`;
    this.score.total++;
    if (isCorrect) {
      this.score.wins++;
    }
    this.columnText.setVisible(false);
    this.checkButton.setVisible(false);
    this.answerInput.setVisible(false);
    this;
    const result = this.add
      .text(this.scale.width / 2, this.scale.height / 2, resultText, {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: isCorrect
          ? STYLES.backgroundGreen
          : STYLES.backgroundSec,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5);

    this.continueButton.setVisible(true);
    this.backButton.setVisible(true);
  }

  continueGame() {
    this.scene.restart();
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
