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

var makeSound2 = function(animal){
    animal.song()
}
Duck.prototype.song= function(){
    console.log("1嘎嘎嘎")
}
Chicken.prototype.song = function(){
    console.log('2咯咯咯')
}
makeSound2(new Duck())//嘎嘎嘎
makeSound2(new Chicken())//咯咯咯


/** 1.2.5
Java通过继承实现多态，子类可向上转型为超类 多态的思想实际上是把“做什么”和“谁去做”分离开来，要实现这一点，归根结底先要消除类型之间的耦合关系。
而 JavaScript 的变量类型在运行期是可变的。一个 JavaScript 对象，既可以表示 Duck 类型的对象，又可以表示 Chicken 类型的对象，这意味着 JavaScript 对象的多态性是与生俱来的。
由此可见，某一种动物能否发出叫声，只取决于它有没有 makeSound 方法，而不取决于它是否是某种类型的对象，这里不存在任何程度上的“类型耦合”。这正是我们从上一节的鸭子类型中领悟的道理。
在 JavaScript 中，并不需要诸如向上转型之类的技术来取得多态的效果。
 * */

/**
 * 1.2.6 多态在面向对象程序设计中的作用
 * 多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安排妥当。
 * 换句话说，多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。
 */