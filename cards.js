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

    // Режим
    const modeLabel = this.add.text(0, 0, "Режим:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const modeButtons = ["Обычный", "Большой"].map((mode, index) => {
      return this.add
        .text(150 + index * 100, 0, mode, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.mode = "Обычный";
    modeButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.mode = button.text;
        modeButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    modeButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Абакусы
    const abacusLabel = this.add.text(0, spacing, "Абакусы:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const abacusButtons = [1, 2, 3, 4, 5, 6, 7, 8].map((count, index) => {
      return this.add
        .text(150 + index * 50, spacing, `${count}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.abacusCount = 1;
    abacusButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.abacusCount = index + 1;
        abacusButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    abacusButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Сложность
    const difficultyLabel = this.add.text(0, spacing * 2, "Сложность:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const difficultyButtons = [4, 5, 6, 7, 8, 9].map((level, index) => {
      return this.add
        .text(150 + index * 80, spacing * 2, `1/${level}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.difficulty = 4;
    difficultyButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.difficulty = index + 4;
        difficultyButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    difficultyButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Разряды
    const digitsLabel = this.add.text(0, spacing * 3, "Разряды:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const digitsButtons = [2, 3, 4, 5, 6, 7, 8].map((count, index) => {
      return this.add
        .text(150 + index * 50, spacing * 3, `${count}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.digits = 2;
    digitsButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.digits = index + 2;
        digitsButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    digitsButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Поворот
    const rotationLabel = this.add.text(0, spacing * 4, "Поворот:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const rotationButtons = [0, 90, 180, 270].map((angle, index) => {
      return this.add
        .text(150 + index * 50, spacing * 4, `${angle}°`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.rotation = 0;
    rotationButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.rotation = index * 90;
        rotationButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    rotationButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Интервал
    const intervalLabel = this.add.text(0, spacing * 5, "Интервал:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const intervalButtons = [1, 2, 3, 4, 5].map((interval, index) => {
      return this.add
        .text(150 + index * 50, spacing * 5, `${interval}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.interval = 1;
    intervalButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.interval = index + 1;
        intervalButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    intervalButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    // Импульсы
    const impulseLabel = this.add.text(0, spacing * 6, "Импульсы:", {
      fontSize: STYLES.fontSizeMedium,
      color: STYLES.textWhite,
    });

    const impulseButtons = [1, 2, 3, 4, 5].map((impulse, index) => {
      return this.add
        .text(150 + index * 50, spacing * 6, `${impulse}`, {
          fontSize: STYLES.fontSizeMedium,
          color: STYLES.textWhite,
          backgroundColor: STYLES.backgroundSec,
          padding: { x: 10, y: 5 },
        })
        .setInteractive();
    });

    this.impulse = 1;
    impulseButtons.forEach((button, index) => {
      button.on("pointerdown", () => {
        this.impulse = index + 1;
        impulseButtons.forEach((btn) =>
          btn.setBackgroundColor(STYLES.backgroundSec)
        );
        button.setBackgroundColor(STYLES.backgroundGreen);
      });
    });
    impulseButtons[0].setBackgroundColor(STYLES.backgroundGreen);

    const startButton = this.add
      .text(291, spacing * 7.2, "Старт", {
        fontSize: STYLES.fontSizeLarge,
        color: STYLES.textWhite,
        backgroundColor: STYLES.backgroundGreen,
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start(this.mode === "Обычный" ? "NormalGameScene" : "LargeGameScene", {
          interval: this.interval,
          impulse: this.impulse,
          difficulty: this.difficulty,
          digits: this.digits,
          abacusCount: this.abacusCount,
          rotation: this.rotation,
        });
      });

    const backButton = this.add
      .text(157, spacing * 7.2, "Назад", {
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
      ...modeButtons,
      abacusLabel,
      ...abacusButtons,
      difficultyLabel,
      ...difficultyButtons,
      digitsLabel,
      ...digitsButtons,
      rotationLabel,
      ...rotationButtons,
      intervalLabel,
      ...intervalButtons,
      impulseLabel,
      ...impulseButtons,
      startButton,
      backButton,
    ]);
  }
}

class NormalGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "NormalGameScene" });
  }

  create({ interval, impulse, difficulty, digits, abacusCount, rotation }) {
    this.interval = interval;
    this.impulse = impulse;
    this.difficulty = difficulty;
    this.digits = digits;
    this.abacusCount = abacusCount;
    this.rotation = rotation;

    this.abacuses = [];
    this.correctAnswers = [];

    this.showAbacuses();
  }

  showAbacuses() {
    const numberRange = Math.pow(10, this.difficulty) - 1;

    for (let i = 0; i < this.impulse; i++) {
      const abacus = this.createAbacus(numberRange);
      this.abacuses.push(abacus);
    }

    this.time.delayedCall(this.interval * 1000, () => {
      this.abacuses.forEach((abacus) => abacus.destroy());
      this.showInput();
    });
  }

  createAbacus(numberRange) {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const abacus = this.add.container(centerX, centerY);

    let sum = 0;
    for (let i = 0; i < this.digits; i++) {
      const number = Phaser.Math.Between(1, numberRange);
      sum += number;

      const bead = this.add.circle(0, -i * 50, 20, 0xffffff);
      bead.setRotation(this.rotation * Phaser.Math.DEG_TO_RAD);
      abacus.add(bead);
    }

    this.correctAnswers.push(sum);
    return abacus;
  }

  showInput() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.inputField = this.add.dom(centerX, centerY, 'input', {
      type: 'text',
      placeholder: 'Введите ответ',
      style: 'width: 200px; text-align: center;'
    });

    const submitButton = this.add.text(centerX, centerY + 50, 'Ответить', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#00aa00',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
      this.checkAnswer();
    });
  }

  checkAnswer() {
    const userAnswer = parseInt(this.inputField.node.value);
    const correctAnswer = this.correctAnswers.reduce((a, b) => a + b, 0);

    if (userAnswer === correctAnswer) {
      alert('Правильно!');
    } else {
      alert(`Неправильно! Правильный ответ: ${correctAnswer}`);
    }

    this.scene.start('MenuScene');
  }
}

class LargeGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "LargeGameScene" });
  }

  create({ abacusCount, rotation }) {
    this.abacusCount = abacusCount;
    this.rotation = rotation;

    this.showAbacuses();
  }

  showAbacuses() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    for (let i = 0; i < this.abacusCount; i++) {
      const abacus = this.createAbacus();
      abacus.setPosition(centerX, centerY + i * 100);
    }
  }

  createAbacus() {
    const abacus = this.add.container(0, 0);

    for (let i = 0; i < 10; i++) {
      const bead = this.add.circle(0, -i * 50, 20, 0xffffff);
      bead.setRotation(this.rotation * Phaser.Math.DEG_TO_RAD);
      abacus.add(bead);
    }

    return abacus;
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
  fontSizeLarger: "36px",
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
  scene: [MenuScene, NormalGameScene, LargeGameScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
