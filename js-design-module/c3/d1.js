// 第三章  闭包和高阶函数
//3.1 闭包 closure 是一个难懂又必须征服的概念。闭包的形成与变量的作用域以及变量的生存周期密切相关。
// 3.1.1变量的作用域 变量的作用域，就是指变量的有效范围
/**
 * 当在函数中声明一个变量的时候，如果该变量前面没有带上关键字 var，这个变量就会成为全局变量，这当然是一种容易造成命名冲突的做法。
 * 
 * 另外一种情况是用var关键字 在函数中声明变量，这个时候的变量就是局部变量，只有在函数内部才能访问到这个变量，在函数外是访问不到的。
 */

var fff = function () {
    var wwwname = 'sss'
    console.log(wwwname)
}
fff()
console.log(fff.wwwname)
