"use strict";
class Shape {
    info() {
        return `This is a Shape`;
    }
    draw(shape) {
        console.log(`drawing a shape ${shape}`);
    }
}
class Rectangle extends Shape {
    constructor(height, width, shape = "Rectangle") {
        super();
        this.draw(shape);
        this.height = height;
        this.width = width;
    }
    setSize(height, width) {
        this.height += height;
        this.width += width;
        return this;
    }
    area() {
        return this.height * this.width;
    }
    info() {
        return `This is a Rectangle`;
    }
    static tewRectangles(rec1, rec2) {
        return new Rectangle(rec1.height + rec2.height, rec1.width + rec2.width);
    }
}
class Square extends Rectangle {
    constructor(length) {
        super(length, length, "Square");
        this.length = length;
    }
}
class ColoredRectangle extends Rectangle {
    constructor(height, width, color) {
        super(height, width);
        this.color = color;
    }
    info() {
        return `this is a rectangle by color: ${this.color}`;
    }
}
// let rectangle = new Rectangle(10, 12);
// let rectangle2 = new Rectangle(19, 11);
let square = new Square(10);
// let shape = new Shape();
// let colorRectangle = new ColoredRectangle(10, 12, "blue");
// console.log(square.area());
// console.log(rectangle.area());
// console.log(shape.info());
// console.log(colorRectangle.info());
// console.log(rectangle.setSize(1, 3).area());
// let tewRectangles = Rectangle.tewRectangles(rectangle, rectangle2);
// console.log(tewRectangles);
