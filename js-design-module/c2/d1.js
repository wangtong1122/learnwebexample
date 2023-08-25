/**
 * this call  apply bind几个的意义
 */

// 2.1 this 的指向 ,JavaScript的this总是指向一个对象，具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境
//2.1.1 常见的this指向大致可以分为以下4种。
//[1] 作为对象的方法调用
//[2] 作为普通函数调用
//[3] 构造器调用
//[4] Function.prototype.call 或 Function.prototype.apply调用

//1 函数作为对象的方法调用

var obj1 = {
  a: 1,
  getA: function () {
    console.log(this === obj1);
    console.log(this.a);
  },
};
// 当函数作为对象的方法被调用时，函数中this 指向该对象：
obj1.getA();

//2  函数作为普通函数调用
// 当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的 this 总是指向全局对象。在浏览器的 JavaScript 里，这个全局对象是 window 对象。
// console.log("这",this)
// var that = this
// function getName(){
//     console.log("大叔大婶",this  === that)
//     return this.name
// }
// console.log(getName())
//有时候我们会遇到一些困扰，比如在 div 节点的事件函数内部，有一个局部的 callback 方法，callback 被作为普通函数调用时，callback 内部的 this 指向了 window，但我们往往是想让它指向该 div 节点，见如下代码：
//
/** <body> 
 <div id="div1">我是一个 div</div> 
 </body> 
 <script> 
 window.id = 'window'; 
 document.getElementById( 'div1' ).onclick = function(){ 
 alert ( this.id ); // 输出：'div1' 
 var callback = function(){ 
 alert ( this.id ); // 输出：'window' 
 } 
 callback(); 
 }; 
 </script> 
</html> */

//3 构造器调用
//JavaScript 中没有类，但是可以从构造器中创建对象，同时也提供了 new 运算符，使得构造器看起来更像一个类。除了宿主提供的一些内置函数，大部分 JavaScript 函数都可以当作构造器使用。构造器的外
//表跟普通函数一模一样，它们的区别在于被调用的方式。当用 new 运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的 this 就指向返回的这个对象，见如下代码：

var myClass = function () {
  this.name = "dsada";
};

var objMyCla = new myClass();
console.log("擦", objMyCla);

//4、 call和apply的调用  跟普通的函数调用相比，用 Function.prototype.call 或 Function.prototype.apply 可以动态地改变传入函数的 this：
var object111 = {
  name: "大萨1111达",
  getName: function () {
    return this.name;
  },
};
console.log(object111.getName());
var chanName = {
  name: "发发",
};
console.log(object111.getName.call(chanName)); //传入的chanName对象，替换了object1111中this的指向

//2.1.2丢失的this
console.log("2.1.2丢失的this");
var obj2 = {
  myName: "SV",
  getName: function () {
    return this.myName;
  },
};
console.log(obj2.getName()); //此时的getName是作为对象的方法调用，this指向对象
var getNameNormal = obj2.getName; //此时的getNameNormal是一个普通函数，其中this指向全局
console.log(getNameNormal()); //undefined
console.log(getNameNormal.call(obj2));
//我们响应替换document.getElementById这么长的方法调用
// var getId = function (id) {
//   return document.getElementById(id);
// };
// getId("div1");
//我们也许思考过为什么不能用下面这种更简单的方式：
// var getId = document.getElementById;
// getId("div1");
//因为getElementById的内部有this指向，这种getId是一个普通函数，导致getElementById的this指向丢失
//因此可以用 getId.apply(document,'div1')

var obj3 = {
  myName: "SwwwV",
  getName: function (content) {
    return this.myName + " 说了" + content;
  },
};

var gen1 = obj3.getName;
var xx = { myName: "大叔大婶的" };
console.log(gen1.call(xx, "手打打算"));

// 给Function的原型定义了两个方法 call 和 apply
// 2.2.1   call和apply的区别  apply 接收2个参数，第一个是this 第二个是带下标的集合，apply将这个集合中的元素作为参数传递给被调用的函数

console.log(gen1.apply(xx, ["手打打算"]));
// 当调用一个函数时，JavaScript 的解释器并不会计较形参和实参在数量、类型以及顺序上的
// 区别，JavaScript 的参数在内部就是用一个数组来表示的。从这个意义上说，apply 比 call 的使用率更高，我们不必关心具体有多少参数被传入函数，只要用 apply 一股脑地推过去就可以了。
// call 是包装在 apply 上面的一颗语法糖，如果我们明确地知道函数接受多少个参数，而且想一目了然地表达形参和实参的对应关系，那么也可以用 call 来传送参数。

//2.2.2 call 和 apply的用途
//1、改变this的指向
/**
 * document.getElementById( 'div1' ).onclick = function(){ 
 alert( this.id ); // 输出：div1 
 var func = function(){ 
 alert ( this.id ); // 输出：undefined 
 } 
 func(); //利用fun.call(this)修复
};
 */

//2、Function.prototype.bind
//大部分高级浏览器都实现了内置的 Function.prototype.bind，用来指定函数内部的 this指向
/**
 * Function.prototype.bind = function( context ){ 
 var self = this; // 保存原函数
 return function(){ // 返回一个新的函数
 return self.apply( context, arguments ); // 执行新的函数的时候，会把之前传入的 context 
 // 当作新函数体内的 this 
 } 
}; 
var obj = { 
 name: 'sven' 
}; 
var func = function(){ 
 alert ( this.name ); // 输出：sven 
}.bind( obj); 
func();
 */
var func = function () {
  console.log(this.c);
}.bind({ c: "Dasda" });
// 创建时就配置好了
func();

var func1 = function () {
  console.log(this.c);
};
//后期进行配置，配置
var fuun = func1.bind({ c: "dAsdas" });
fuun(); //配置完生成一个新的方法
func1(); //原始的方法不受影响

// 3 借用其他的对象方法
var funA = function (name) {
  this.name = name;
};
var funB = function () {
  console.log(arguments);
  funA.apply(this, arguments); //this指向funB，arguments为入参  相当于给funB设置了name参数为arguments中的参数
};
funB.prototype.getName = function () {
  return this.name;
};

var bb = new funB("撒发");
console.log(bb.getName());
/**
 * 函数的参数列表 arguments 是一个类数组对象，虽然它也有“下标”，但它并非真正的数组，所以也不能像数组一样，进行排序操作或者往集合里添加一个新的元素。这种情况下，我们常常
会借用 Array.prototype 对象上的方法。比如想往 arguments 中添加一个新的元素，通常会借用Array.prototype.push：
(function(){ 
 Array.prototype.push.call( arguments, 3 ); 
 console.log ( arguments ); // 输出[1,2,3] 
})( 1, 2 ); 
在操作 arguments 的时候，我们经常非常频繁地找 Array.prototype 对象借用方法。
 */
