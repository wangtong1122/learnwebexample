/**
 * 1.3 封装
 * Js中没有提供类锁Java的访问控制关键字，所以只能通过变量的作用域来封装数据
 * 除了ES6的let之外，一般通过函数来创建作用域
 *
 */
var myObject = function () {
  var __name = "sven";
  return {
    getName: function () {
      return __name;
    },
  };
};
var xxx = new myObject();
console.log(xxx.getName()); //sven
console.log(xxx.__name); //undefined

/**
 * 1.4原型模式和基于原型继承的JavaScript对象系统
 * 原型模式是用于创建对象的一种模式，如果我们想要创建一个对象，一种方法是先指定它的类型，然后通过类来创建这个对象
 * 1.4.4原型编程范型的一些规则
 * Object 是 Animal 的原型，而 Animal 是 Dog 的原型，它们之间形成了一条原型链。这个原型链是很有用处的，当我们尝试调用 Dog 对象的某个方法时，而它本身却没有
这个方法，那么 Dog 对象会把这个请求委托给它的原型 Animal 对象，如果 Animal 对象也没有这个属性，那么请求会顺着原型链继续被委托给 Animal 对象的原型 Object 对象，这样一来便能得
到继承的效果，
1.4.5 JavaScript中的原型继承
 所有的数据都是对象。
 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
 对象会记住它的原型。
 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。
事实上，JavaScript 中的根对象是 Object.prototype 对象。Object.prototype 对象是一个空的
对象。我们在 JavaScript 遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的，
Object.prototype 对象就是它们的原型。比如下面的 obj1 对象和 obj2 对象：
 */
var obj1 = new Object();
var obj2 = {};
console.log(Object.getPrototypeOf(obj1) === Object.prototype); //true
console.log(Object.getPrototypeOf(obj2) === Object.prototype); //true

/**
 * 在 JavaScript 语言里，我们并不需要关心克隆的细节，因为这是引擎内部负责实现的。我们所需要做的只是显式地调用 var obj1 = new Object()或者 var obj2 = {}。此时，引擎内部会从
Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。
 */

function Person(name) {
  //Person类的构造函数
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
};
var a = new Person("是是");
console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a));
console.log(Person.prototype);
/**
 *  JavaScript 中没有类的概念，这句话我们已经重复过很多次了。但刚才不是明明调用了 new Person()吗？在这里 Person 并不是类，而是函数构造器，JavaScript 的函数既可以作为普通函数被调用，
也可以作为构造器被调用。当使用 new 运算符来调用函数时，此时的函数就是一个构造器。 用new 运算符来创建对象的过程，实际上也只是先克隆 Object.prototype 对象，再进行一些其他额
外操作的过程。①
 */

/**
 * 另外，ECMAScript 6 带来了新的 Class 语法。这让 JavaScript 看起来像是一门基于类的语言，但其背后仍是通过原型机制来创建对象。通过 Class 创建对象的一段简单示例代码①如下所示 ：
 */
class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  speak() {
    return "哦哦哦";
  }
}
class Duck extends Animal {
  constructor(name) {
    super(name);
  }
  speak() {
    return "嘎嘎嘎";
  }
}

var dog1 = new Dog("小王");
var duck1 = new Duck("鸭鸭");

function allSpeak(animal) {
  console.log(animal.getName() + " 开始说了 " + animal.speak());
}

allSpeak(dog1);
allSpeak(duck1);
