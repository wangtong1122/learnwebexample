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
// 3.1.2 变量的生命周期
// 1、全局变量的 永久   2、函数内的变量 ，当退出函数时  
var func = function(){
    var a=1;
    console.log(a)
}
func()//退出函数后，局部变量a将被销毁

//现在来看另外一种
var func2 = function(){
    var a = 1;
    return function(){
        a++//a被一个函数引用，当func2函数退出时，由于a被引用，因此a不能被销毁
        console.log(a)
    }
}
var f = func2()//f是func2内部的返回匿名函数的一个引用
f()//2
f()//3
f()//4
//f可以访问到 func2被调用时产生的环境，而局部变量a就在这个环境中。既然局部变量所在的环境还能被外界引用，因此这个局部变量就有了不被销毁的理由。
/**
 * 这里就产生了一个闭包结构，局部变量的生命看起来被延续了
 */

function testNormal(){
    for(var i=0;i<5;i++){
        setTimeout(() => {
            console.log(i)
        }, 1000);
    }
}
testNormal()

function testNormal1(){
    for(var i=0;i<5;i++){
        (function (i){
            setTimeout(() => {
                console.log(i)
            }, 1000);
        })(i)
    
    }
}

testNormal1()

// 3.1.3闭包的作用
//1 封装变量，闭包可以把不需要暴露在全局的变量封装为私有变量
var chche=[]
var mult=function(){
    //使用chche进行相关的计算
}

//不过不想把chche暴露咋函数的外面
var mult1 = (function (params) {
    var chche=[]//定义私有变量
    return function(){//返回的函数赋值给了mult1
        //使用chche私有变量
    }
})()

//2 延续局部变量的寿命


// 3.1.3 闭包和面向对象设计
var createCommand = function (receiver) {
    // var execute = function () {
    //     return receiver.open()
    // }
    // var undo = function () {
    //     return receiver.undo()
    // }
    return {
        execute:receiver.open,
        undo:receiver.undo
    }

}

var Tv={
    open:function () {
        console.log('打打开')
    },
    undo:function () {
        console.log("大萨达大概") 
    }
}

 var newC = createCommand(Tv)
 newC.execute()
 newC.undo()

 //3.1.6 闭包与内存管理
 //闭包是一个非常强大的特性，但人们对其也有诸多误解。一种耸人听闻的说法是闭包会造成内存泄露，所以要尽量减少闭包的使用。