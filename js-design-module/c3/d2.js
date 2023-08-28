//3.2 高阶函数
//高阶函数是指至少满足下列条件之一的函数。
// 函数可以作为参数被传递；
// 函数可以作为返回值输出
//JavaScript 语言中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当作参数传递，还是让函数的执行结果返回另外一个函数，这两种情形都有很多应用场景，

//3.2.1 函数作为参数传递
//把函数当作参数传递，这代表我们可以抽离出一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中，这样一来可以分离业务代码中变化与不变的部分。其中一个重要应用场景就是常见的回调函数。
//1. 回调函数
/**
 * 在 ajax 异步请求的应用中，回调函数的使用非常频繁。当我们想在 ajax 请求返回之后做一些事情，但又并不知道请求返回的确切时间时，最常见的方案就是把 callback 函数当作参数传入
发起 ajax 请求的方法中，待请求完成之后执行 callback 函数：
回调函数的应用不仅只在异步请求中，当一个函数不适合执行一些请求时，我们也可以把这些请求封装成一个函数，并把它作为参数传递给另外一个函数，“委托”给另外一个函数来执行。
 */

//2. Array.prototype.sort
/**
 * Array.prototype.sort 接受一个函数当作参数，这个函数里面封装了数组元素的排序规则。从Array.prototype.sort 的使用可以看到，我们的目的是对数组进行排序，这是不变的部分；而使
用什么规则去排序，则是可变的部分。把可变的部分封装在函数参数里，动态传入Array.prototype.sort，使 Array.prototype.sort 方法成为了一个非常灵活的方法，
 */

//3.2.2 函数作为返回值输出
//相比把函数当作参数传递，函数当作返回值输出的应用场景也许更多，也更能体现函数式编程的巧妙。让函数继续返回一个可执行的函数，意味着运算过程是可延续的。
var getSingle = function (fn) {
  var ret;
  return function () {
    return ret || (ret = fn.apply(this, arguments));
  };
};
var getScript = getSingle(function () {
  return "sss";
});
var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2);
console.log(script1);

//3.2.3 高阶函数实现AOP
//AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，
//再通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。

//在 Java 语言中，可以通过反射和动态代理机制来实现 AOP 技术。而在 JavaScript 这种动态语言中，AOP 的实现更加简单，这是 JavaScript 与生俱来的能力。
//通常，在 JavaScript 中实现 AOP，都是指把一个函数“动态织入”到另外一个函数之中，具体的实现技术有很多，本节我们通过扩展 Function.prototype 来做到这一点。代
Function.prototype.before = function (beforeFn) {
  var _self = this;
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};
Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret; //这个是最后返回的，console.log(1) console.log(2) console.log(3)  func()执行就是按照这个顺序执行
  };
};
var func = function () {
  console.log(2);
};
func = func
  .before(function () {
    console.log(1);
  })
  .after(function () {
    console.log(3);
  });
func(); //1 2 3
//这种使用 AOP 的方式来给函数添加职责，也是 JavaScript 语言中一种非常特别和巧妙的装饰者模式实现。

//3.2.4 高阶函数的其他应用  些常见的高阶函数应用
//1、currying
/**
 *  currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，
该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保
存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
 */
//2. uncurrying
/**
 * 在 JavaScript 中，当我们调用对象的某个方法时，其实不用去关心该对象原本是否被设计为
拥有这个方法，这是动态类型语言的特点，也是常说的鸭子类型思想。
同理，一个对象也未必只能使用它自身的方法，那么有什么办法可以让对象去借用一个原本
不属于它的方法呢？
 */
(function () {
  Array.prototype.push.call(arguments, 4); // arguments 借用 Array.prototype.push 方法
  console.log(arguments); // 输出：[1, 2, 3, 4]
})(1, 2, 3);

Function.prototype.uncurrying = function () {
  var self = this; // self 此时是 Array.prototype.push
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    // obj 是{
    // "length": 1,
    // "0": 1
    // }
    // arguments 对象的第一个元素被截去，剩下[2]
    return self.apply(obj, arguments);
    // 相当于 Array.prototype.push.apply( obj, 2 )
  };
};
var push = Array.prototype.push.uncurrying();
var obj = {
  length: 1,
  0: 1,
};
push(obj, 2);
console.log(obj); // 输出：{0: 1, 1: 2, length: 2}

Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    return Function.prototype.call.apply(self, arguments);
  };
};


var ss = function () {
    console.log(arguments)
}

ss('大叔大婶的')
// 3. 函数节流
// 函数节流的原理
//函数节流的代码实现 
/**
 * 关于函数节流的代码实现有许多种，下面的 throttle 函数的原理是，将即将被执行的函数用setTimeout 延迟一段时间执行。如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。
throttle 函数接受 2 个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间。
 */
//4. 分时函数，timeChunk 函数让创建节点的工作分批进行，比如把 1 秒钟创建 1000 个节点，改为每隔 200 毫秒创建 8 个节点
//5. 惰性加载函数