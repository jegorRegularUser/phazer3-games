class DiamondGroup extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.topDiamond = this.createDiamond(0, -100, "white"); // Верхний ромб
    this.divider = this.createDivider(); // Белая линия
    this.bottomDiamonds = [];

    for (let i = 0; i < 4; i++) {
      this.bottomDiamonds.push(this.createDiamond(0, 30 + i * 70, "white")); // Нижние ромбы
    }

    this.scene.add.existing(this);
    this.setInteractiveDiamonds();
  }

  createDiamond(x, y, color) {
    let diamond = this.scene.add.polygon(
      x,
      y,
      [0, -30, 50, 0, 0, 30, -50, 0],
      color === "white" ? 0xffffff : 0x000000
    );
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
      this.scene.start(
        this.mode === "Обычный" ? "NormalGameScene" : "LargeGameScene",
        {
          interval: this.interval,
          impulse: this.impulse,
          difficulty: this.difficulty,
          digits: this.digits,
          abacusCount: this.abacusCount,
          rotation: this.rotation,
        }
      );
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
    this.interval = interval * 1000; // Переводим в миллисекунды
    this.impulse = impulse;
    this.difficulty = difficulty;
    this.digits = digits;
    this.abacusCount = abacusCount;
    this.rotation = rotation;

    this.abacuses = [];
    this.correctAnswers = [];
    this.currentImpulse = 0;

    this.showNextAbacus();
  }

  showNextAbacus() {
    if (this.currentImpulse < this.impulse) {
      const abacus = this.createAbacus();
      this.abacuses.push(abacus);
      this.currentImpulse++;

      this.time.delayedCall(this.interval, () => {
        abacus.destroy();
        this.showNextAbacus();
      });
    } else {
      this.showInput();
    }
  }

  createAbacus() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const abacus = new AbacusGroup(this, centerX, centerY, this.digits, this.difficulty, this.rotation);
    
    this.correctAnswers.push(abacus.getValue());
    return abacus;
  }

  showInput() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.inputField = this.add.dom(centerX, centerY, "input", {
      type: "text",
      placeholder: "Введите ответ",
      style: "width: 200px; text-align: center;",
    });

    const submitButton = this.add
      .text(centerX, centerY + 50, "Ответить", {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#00aa00",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.checkAnswer();
      });
  }

  checkAnswer() {
    const userAnswer = parseInt(this.inputField.node.value);
    const correctAnswer = this.correctAnswers.reduce((a, b) => a + b, 0);

    if (userAnswer === correctAnswer) {
      alert("Правильно!");
    } else {
      alert(`Неправильно! Правильный ответ: ${correctAnswer}`);
    }

    // Показываем все абакусы снова
    this.showAllAbacuses();
  }

  showAllAbacuses() {
    this.abacuses.forEach((abacus, index) => {
      const newAbacus = new AbacusGroup(this, this.scale.width / 2, 100 + index * 150, this.digits, this.difficulty, this.rotation);
      newAbacus.setValue(this.correctAnswers[index]);
    });

    const backButton = this.add
      .text(this.scale.width / 2, this.scale.height - 50, "Назад в меню", {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#00aa00",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("MenuScene");
      });
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
      new AbacusGroup(this, centerX, 100 + i * 150, 5, 9, this.rotation);
    }

    const backButton = this.add
      .text(centerX, this.scale.height - 50, "Назад в меню", {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#00aa00",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("MenuScene");
      });
  }
}

class AbacusGroup extends Phaser.GameObjects.Container {
  constructor(scene, x, y, digits, maxValue, rotation) {
    super(scene, x, y);
    this.scene = scene;
    this.digits = digits;
    this.maxValue = maxValue;
    this.rotation = rotation;

    this.createAbacus();
    this.scene.add.existing(this);
  }

  createAbacus() {
    this.rows = [];
    for (let i = 0; i < this.digits; i++) {
      const row = new AbacusRow(this.scene, 0, i * 60, this.maxValue, this.rotation);
      this.add(row);
      this.rows.push(row);
    }
  }

  getValue() {
    return this.rows.reduce((sum, row, index) => sum + row.getValue() * Math.pow(10, index), 0);
  }

  setValue(value) {
    let remainingValue = value;
    for (let i = 0; i < this.digits; i++) {
      const digitValue = remainingValue % 10;
      this.rows[i].setValue(digitValue);
      remainingValue = Math.floor(remainingValue / 10);
    }
  }
}

class AbacusRow extends Phaser.GameObjects.Container {
  constructor(scene, x, y, maxValue, rotation) {
    super(scene, x, y);
    this.scene = scene;
    this.maxValue = maxValue;
    this.rotation = rotation;

    this.createBeads();
    this.scene.add.existing(this);
  }

  createBeads() {
    this.topBead = this.createBead(0, -30, true);
    this.bottomBeads = [];
    for (let i = 0; i < 4; i++) {
      this.bottomBeads.push(this.createBead(0, 30 + i * 20, false));
    }
    this.add([this.topBead, ...this.bottomBeads]);
  }

  createBead(x, y, isTop) {
    const bead = this.scene.add.circle(x, y, 10, 0xffffff);
    bead.setStrokeStyle(2, 0x000000);
    bead.setInteractive();
    bead.on('pointerdown', () => this.toggleBead(bead, isTop));
    bead.isActive = false;
    return bead;
  }

  toggleBead(bead, isTop) {
    if (isTop) {
      bead.isActive = !bead.isActive;
      bead.fillColor = bead.isActive ? 0x000000 : 0xffffff;
    } else {
      const index = this.bottomBeads.indexOf(bead);
      for (let i = 0; i <= index; i++) {
        this.bottomBeads[i].isActive = !bead.isActive;
        this.bottomBeads[i].fillColor = this.bottomBeads[i].isActive ? 0x000000 : 0xffffff;
      }
    }
  }

  getValue() {
    let value = this.topBead.isActive ? 5 : 0;
    value += this.bottomBeads.filter(bead => bead.isActive).length;
    return value;
  }

  setValue(value) {
    this.topBead.isActive = value >= 5;
    this.topBead.fillColor = this.topBead.isActive ? 0x000000 : 0xffffff;
    
    const bottomValue = value % 5;
    for (let i = 0; i < 4; i++) {
      this.bottomBeads[i].isActive = i < bottomValue;
      this.bottomBeads[i].fillColor = this.bottomBeads[i].isActive ? 0x000000 : 0xffffff;
    }
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
