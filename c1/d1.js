/**
 * 第一章 面向对象的Javascript
 * Javascript是通过原型委托来实现对象与对象之间的集成
 */
//多态1
var makeSound = function(animal){
    if(animal instanceof Duck){
        console.log("嘎嘎嘎")
    }
    else if(animal instanceof Chicken){
        console.log('咯咯咯')
    }
}

var Duck = function(){}
var Chicken = function(){}

makeSound(new Duck())//嘎嘎嘎
makeSound(new Chicken())//咯咯咯

//多态2 将可变和不可变的事分开

var makeSound = function(animal){
    animal.sound()
}