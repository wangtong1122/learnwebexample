/**
 * 1.4 封装
 * Js中没有提供类锁Java的访问控制关键字，所以只能通过变量的作用域来封装数据
 * 除了ES6的let之外，一般通过函数来创建作用域
 * 
 */
var myObject = function(){
    var __name = 'sven'
    return {
        getName:function(){
            return __name
        }
    }
}
var xxx = new myObject()
console.log(xxx.getName())//sven
console.log(xxx.__name)//undefined
