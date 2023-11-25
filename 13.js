// Задача 13:
// Задача на классы и наследование:
// создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра.
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник.
// Реализуйте методы расчета площади и периметра для каждой фигуры.

// Решение:

// Базовый класс Shape
class Shape {
  constructor(name) {
    this.name = name;
  }
  // Метод для расчета площади:
  calculateArea() {}
  // Метод для расчета периметра:
  calculatePerimeter() {}
  // Метод для вывода имени фигуры и всех расчетов (добавляем округление для наглядности):
  result() {
    console.log(`Shape - ${this.name}`);
    console.log(`${this.name} area value = ${this.calculateArea().toFixed(1)}`);
    console.log(
      `${this.name} perimeter value = ${this.calculatePerimeter().toFixed(1)}`,
    );
  }
}

// Подкласс прямоугольник
class Rectangle extends Shape {
  // Для расчета необходимы длина и ширина прямоугольника
  constructor(width, length) {
    // Вызов ключевого слово "super" для вызова функций, принадлежащих родителю Shape.
    let name = "Rectangle";
    super(name);
    this.width = width;
    this.length = length;
  }
  // Расчет площади прямоугольника
  calculateArea() {
    return this.width * this.length;
  }
  // Расчет периметра прямоугольника
  calculatePerimeter() {
    return 2 * (this.width + this.length);
  }
}

// Подкласс круг
class Circle extends Shape {
  // Для расчета необходим радиус круга
  constructor(radius) {
    let name = "Circle";
    super(name);
    this.radius = radius;
  }
  // Расчет площади круга (использованы: число ПИ и квадрат радиуса)
  calculateArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
  // Расчет периметра круга
  calculatePerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// Подкласс треугольник
class Triangle extends Shape {
  // Так как существует несколько способов расчета прощади и периметра треугольника -
  // возьмем самый простой для передачи параметров -  3 стороны треугольника
  constructor(a, b, c) {
    let name = "Triangle";
    super(name);
    this.a = a;
    this.b = b;
    this.c = c;
  }
  // Расчет площади треугольника (по трем сторонам, где a, b и c это стороны треугольника и p – половина периметра треугольника.)
  calculateArea() {
    // p – половина периметра треугольника.
    let p = (this.a + this.b + this.c) / 2;
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
  }
  // Расчет периметра треугольника
  calculatePerimeter() {
    return this.a + this.b + this.c;
  }
}

// Проверка:
let rectangle = new Rectangle(4, 2);
let сircle = new Circle(4);
let triangle = new Triangle(2, 4, 4);
rectangle.result();
сircle.result();
triangle.result();
