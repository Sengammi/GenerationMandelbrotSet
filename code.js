// Отримуємо контекст малювання
const canvas = document.getElementById('mandelbrotCanvas');
const ctx = canvas.getContext('2d');

// Налаштування області виведення
const width = canvas.width;
const height = canvas.height;
// Максимальна кількість ітерацій для перевірки збіжності
const maxIterations = prompt("Виберіть кількість ітерацій для перевірки збіжності") ||  1000;
// Масштаб
const zoom =  prompt("Масштаб (стандарт 1)")*450 || 450;
// Зсуви по осях
const offsetX = -0.65;
const offsetY = 0;
// Відтінок
const HUE =  prompt("Виберіть відтінок від 0 до 360. 0 - червоний, 120 - зелений і 240 - синій.") || 0; // Центруй по Y

// Функція для обчислення множини Мандельброта
function mandelbrot(c) {
	let z = { x: 0, y: 0 };
	let n = 0;

	while (n < maxIterations) {
		// Обчислюємо нове значення реальної частини комплексного числа
		const x = z.x * z.x - z.y * z.y + c.x;
		// Обчислюємо нове значення уявної частини комплексного числа
		const y = 2 * z.x * z.y + c.y;

		// Оновлюємо Z новими обчисленими значеннями для x і y
		z = { x: x, y: y };

		// Перевіряємо, чи виходить точка за межі радіуса 2
		if (Math.sqrt(z.x * z.x + z.y * z.y) > 2) {
			break; // Якщо точка збігається до нескінченності
		}
		n++;
	}
	return n;
}

// Функція для малювання фракталу
function drawMandelbrot() {
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const c = {
				x: (x - width / 2) / zoom + offsetX,
				y: (y - height / 2) / zoom + offsetY,
			};

			// Обчислюємо множину Мандельброта
			const m = mandelbrot(c);
			// Налаштування кольорів
			const color = (m === maxIterations) ? 'black' : `hsl(${HUE - (m / maxIterations * 4000)}, 70%, 50%)`;

			ctx.fillStyle = color;
			ctx.fillRect(x, y, 1, 1);
		}
	}
}

// Запуск візуалізації
drawMandelbrot();