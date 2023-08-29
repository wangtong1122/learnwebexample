// 5.2 JavaScript的策略模式
var strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
};
var calculateBonus = function (level, salary) {
  return strategies[level](salary);
};
console.log(calculateBonus("S", 20000)); // 输出：80000
console.log(calculateBonus("A", 10000)); // 输出：30000

// 5.3 多态在策略模式中的体现，当我们对策略发出计算奖金，会返回不同的计算结果，这正是对象多态的体现
// 5.4 用策略模式实现缓存动画 
// 此时Animate是一个类
var Animate = function(){

}
//此时 给Animate这个类添加方法
Animate.prototype.sayName=function(){
    console.log('塞纳')
}

var an = new Animate() //此时创建了一个Animate的对象
// 此时Animate1是一个对象
var Animate1={sayHell:function (params) {
    console.log("山沟沟")
}}
console.log()