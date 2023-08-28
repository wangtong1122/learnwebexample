// 设计模式  一、单例模式
// 4.1 实现单例模式
var Singleton = function (name) {
  this.name = name; //对象内部
  this.instance = null;
};
Singleton.prototype.getName = function () {
  console.log("3e1", this.name);
};
Singleton.getInstance = function (name) {
  console.log("dasd", this); //this 为Singleton变量
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

console.log("1", Singleton);

var newSi = new Singleton("啊❤️");
newSi.getName();
console.log("3", newSi);

var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
// 这种方式比较简单，但是增加了这个类的“不透明性”
// 4.2透明的单例

var CreateDiv = (function () {
  var instance;
  var CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return (instance = this);
  };
  CreateDiv.prototype.init = function () {
    var div = 1;
    div.name = this.html;
  };
  return CreateDiv;
})();
//通过new的方式实现了单例，但是其问题是采用了 自执行匿名函数 和 闭包，增加了程序的复杂度，且阅读不方便
var div1 = new CreateDiv("sss");
var div2 = new CreateDiv("sss2");
console.log(div1 === div2);
//观察CreateDiv，其实际上是负责了2件事，第一个是创建对象和执行初始化，第二个是保证只有一个对象，这种 违背了单一职责原则。假设我们想让CreateDiv创建div，且这个类作为普通的类而不是单例类使用，那么势必要修改CreateDiv的构造函数。

// 4.3 用代理实现单例。
var CreateDiv1 = function (params) {
  this.html = params;
  this.init();
};
CreateDiv1.prototype.init = function () {
  console.log(this.html);
};

var ProxySingleCreateDiv = (function () {
  var newInstance;
  return function (html) {
    if (!newInstance) {
      newInstance = new CreateDiv1(html);
    }
    return newInstance;
  };
})();

var a = new ProxySingleCreateDiv("大萨达1");
var b = new ProxySingleCreateDiv("大是否2");
console.log(a === b);

// 4.4 JavaScript 中的单例模式 上面的单例都是按照 传统的面向对象语言实现，实际在JavaScript可用全局变量。 全局变量不是单例模式，但在 JavaScript 开发中，我们经常会把全局变量当成单例来使用。
// var a={} 但是全局变量存在很多的问题，很容易造成它很容易造成命名空间污染.作为普通的开发者，我们有必要尽量减少全局变量的使用，即使需要，也要把它的污染降到最低。以下几种方式可以相对降低全局变量带来的命名污染。
//1.使用命名空间
/**
 * var namespace1 = { 
 a: function(){ 
 alert (1); 
 }, 
 b: function(){ 
 alert (2); 
 } 
};
 */
// 2. 使用闭包封装私有变量
// 这种方法把一些变量封装在闭包的内部，只暴露一些接口跟外界通信：
var user = (function () {
  var __name = "sven",
    __age = 29;
  return {
    getUserInfo: function () {
      return __name + "-" + __age;
    },
  };
})();
// 4.5 惰性单例 在用的时候才创建 例如前面的getInstance只有在调用的时候才，创建而不是在页面加载好了就创建了。这种基于类的单例在JavaScript中并不适用。
// 与全局变量结合实现惰性的单例
/**
 * var createLoginLayer = (function(){ 
 var div; 
 return function(){ 
 if ( !div ){ 
 div = document.createElement( 'div' ); 
 div.innerHTML = '我是登录浮窗'; 
 div.style.display = 'none'; 
 document.body.appendChild( div ); 
 } 
 return div; 
 } 
})();
document.getElementById( 'loginBtn' ).onclick = function(){ 
 var loginLayer = createLoginLayer(); 
 loginLayer.style.display = 'block'; 
};
 */
//4.6 通用惰性单例
//上面的代码违反单一职责原则，管理单例和创建的代码都在createLoginLayer中。如果我们要创建唯一的iframe或者script标签等。就需要把代码再拷贝一份
//我们需要先把不变的部分隔离出来，将这些逻辑封装在getSingle中，创建对象的方法通过fn被当成参数动态传入getSingle中
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

/**
 * var createLoginLayer = function(){ 
 var div = document.createElement( 'div' ); 
 div.innerHTML = '我是登录浮窗'; 
 div.style.display = 'none'; 
 document.body.appendChild( div ); 
 return div; 
}; 
var createSingleLoginLayer = getSingle( createLoginLayer ); 
document.getElementById( 'loginBtn' ).onclick = function(){ 
 var loginLayer = createSingleLoginLayer(); 
 loginLayer.style.display = 'block'; 
};
 */

var crel1 = getSingle(function () {
  console.log("事实上1");
  return 1;
});
var crel2 = getSingle(function () {
  console.log("事实上2");
});
crel1();
crel1();
crel1();
crel1();
console.log(crel1 === crel2);
console.log(crel1);
console.log(crel2);
