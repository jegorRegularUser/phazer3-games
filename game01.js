

// Сцена выбора сложности
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.add.text(300, 50, 'Выберите сложность', { fontSize: '32px', fill: '#fff' });

        const difficulties = ['Легко', 'Средне', 'Сложно'];
        
        let selectedDifficulty = null;

        difficulties.forEach((difficulty, index) => {
            this.add.text(300, 100 + index * 50, difficulty, { fontSize: '24px', fill: '#fff' })
                .setInteractive()
                .on('pointerdown', () => {
                    selectedDifficulty = index + 1; // Присваиваем уровень сложности
                    this.startGame(selectedDifficulty);
                });
        });
    }

    startGame(difficulty) {
        if (difficulty) {
            this.scene.start('GameScene', { difficulty });
        } else {
            alert('Пожалуйста, выберите сложность!');
        }
    }
}

// Сцена самой игры
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.difficulty = data.difficulty;
        this.numCount = 3; // Количество чисел в нижнем ряду
    }

    create() {
        this.score = 0;
        this.sumsText = []; // Инициализация массива для текстов сумм
        this.createPyramid(); // Вызов функции для создания пирамиды
        
        // Добавляем текст для отображения счета
        this.scoreText = this.add.text(16, 16, `Счет: ${this.score}`, { fontSize: '32px', fill: '#fff' });

        // Кнопка проверки ответов
        const checkButton = this.add.text(350, 400, 'Проверить ответы', { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => this.checkAnswers());
    }

    createPyramid() {
        // Генерация трех случайных чисел
        this.numbers = [];
        for (let i = 0; i < this.numCount; i++) {
            const number = Math.floor(Math.random() * (10 * this.difficulty));
            this.numbers.push(number);
            this.add.text(i * (this.cameras.main.width / this.numCount), 500, number.toString(), { fontSize: '64px', fill: '#fff' });
        }

        // Генерация сумм нижних чисел
        this.sums = [
            this.numbers[0] + this.numbers[1],
            this.numbers[1] + this.numbers[2]
        ];

        // Отображение сумм и создание полей ввода
        for (let i = 0; i < 2; i++) {
            const sumText = this.add.text((i + 0.5) * (this.cameras.main.width / 2), 300, '?', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
            sumText.setData('index', i); // Сохраняем индекс суммы в объекте текста
            sumText.setInteractive();
            sumText.on('pointerdown', () => {
                const inputElement = document.createElement('input');
                inputElement.type = 'number';
                inputElement.style.width = '100px';
                inputElement.style.fontSize = '64px';
                inputElement.style.textAlign = 'center';
                inputElement.style.position = 'absolute';
                inputElement.style.left = `${sumText.x - 50}px`; // Центрируем инпут по тексту
                inputElement.style.top = `${sumText.y - 40}px`; // Помещаем инпут над текстом

                document.body.appendChild(inputElement);
                inputElement.focus();

                inputElement.onblur = () => {
                    document.body.removeChild(inputElement); // Удаляем инпут при потере фокуса
                };
                
                inputElement.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        const userAnswer = parseInt(inputElement.value);
                        if (!isNaN(userAnswer)) {
                            sumText.setText(userAnswer); // Заменяем знак вопроса на ответ пользователя
                        }
                        document.body.removeChild(inputElement); // Удаляем инпут после ввода
                    }
                };
            });
            this.sumsText.push(sumText);
        }

        // Генерация общей суммы на вершине
        const totalSum = this.sums.reduce((a, b) => a + b);
        
        // Отображение общей суммы как вопроса и создание поля ввода для нее
        const totalSumText = this.add.text(350, 200, '?', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        
        totalSumText.setInteractive();
        totalSumText.on('pointerdown', () => {
            const inputElement = document.createElement('input');
            inputElement.type = 'number';
            inputElement.style.width = '100px';
            inputElement.style.fontSize = '64px';
            inputElement.style.textAlign = 'center';
            inputElement.style.position = 'absolute';
            inputElement.style.left = `${totalSumText.x - 50}px`; // Центрируем инпут по тексту
            inputElement.style.top = `${totalSumText.y - 40}px`; // Помещаем инпут над текстом

            document.body.appendChild(inputElement);
            inputElement.focus();

            inputElement.onblur = () => {
                document.body.removeChild(inputElement); // Удаляем инпут при потере фокуса
            };
            
            inputElement.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    const userAnswer = parseInt(inputElement.value);
                    if (!isNaN(userAnswer)) {
                        totalSumText.setText(userAnswer); // Заменяем знак вопроса на ответ пользователя
                    }
                    document.body.removeChild(inputElement); // Удаляем инпут после ввода
                }
            };
        });

        // Сохраняем правильные ответы для проверки
        this.correctAnswers = [this.sums[0], this.sums[1], totalSum];
    }

    checkAnswers() {
        let allCorrect = true;

        for (let i = 0; i < 2; i++) {
            const userAnswer = parseInt(this.sumsText[i].text);
            if (userAnswer === this.correctAnswers[i]) {
                // Если ответ правильный
                this.sumsText[i].setFill('#00ff00'); // Зеленый цвет для правильного ответа
            } else {
                allCorrect = false;
                this.sumsText[i].setFill('#ff0000'); // Красный цвет для неправильного ответа
            }
        }

        const totalUserAnswer = parseInt(this.add.text(350, 200).text); // Получаем ответ на верхнем уровне

        if (allCorrect && totalUserAnswer === this.correctAnswers[2]) {
            alert('Вы правильно заполнили всю пирамиду!');
            this.scene.restart(); // Перезапуск сцены после успешного завершения
        } else if (!allCorrect) {
            alert('Некоторые ответы неверны! Попробуйте снова.');
        }
    }
}

// Создаем основной объект игры
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MenuScene, GameScene],
};

const game = new Phaser.Game(config);