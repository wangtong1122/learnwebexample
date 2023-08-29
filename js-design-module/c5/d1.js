// 第5章 策略模式
// 策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换
// 1、最初的代码，使用策略模式计算奖金
var calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return salary * 4;
  }
  if (performanceLevel === "A") {
    return salary * 3;
  }
  if (performanceLevel === "B") {
    return salary * 2;
  }
};
calculateBonus("B", 20000); // 输出：40000
calculateBonus("S", 6000); // 输出：24000
/**
 * 1、分支多，包含很多 if-else
 * 2、缺乏弹性，如果新增一个等级，要修改代码
 * 3、复用性差，如果在程序其他地方需要重用这些奖金计算算法，我们只能复制黏贴
 */
//2、使用组合函数重构代码
var performanceS = function (salary) {
  return salary * 4;
};
var performanceA = function (salary) {
  return salary * 3;
};
var performanceB = function (salary) {
  return salary * 2;
};
var calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return performanceS(salary);
  }
  if (performanceLevel === "A") {
    return performanceA(salary);
  }
  if (performanceLevel === "B") {
    return performanceB(salary);
  }
};
calculateBonus("A", 10000); // 输出：30000
// 目前，我们的程序得到了一定的改善，但这种改善非常有限，我们依然没有解决最重要的问题：calculateBonus 函数有可能越来越庞大，而且在系统变化的时候缺乏弹性。
// 3. 使用策略模式重构代码
/**
 * 经过思考，我们想到了更好的办法——使用策略模式来重构代码。策略模式指的是定义一系列的算法，把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，策
略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。
一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体
的算法，并负责具体的计算过程。第二个部分是环境类 Context，Context 接受客户的请求，随后
把请求委托给某一个策略类。要做到这点，说明 Context 中要维持对某个策略对象的引用。
 */
//现在用策略模式来重构上面的代码。第一个版本是模仿传统面向对象语言中的实现。我们先把每种绩效的计算规则都封装在对应的策略类里面：
var performanceS = function(){}; 
performanceS.prototype.calculate = function( salary ){ 
 return salary * 4; 
}; 
var performanceA = function(){}; 
performanceA.prototype.calculate = function( salary ){ 
 return salary * 3; 
}; 
var performanceB = function(){}; 
performanceB.prototype.calculate = function( salary ){ 
 return salary * 2; 
};
//接下来定义奖金类 Bonus：
var Bonus = function(){ 
 this.salary = null; // 原始工资
 this.strategy = null; // 绩效等级对应的策略对象
}; 
Bonus.prototype.setSalary = function( salary ){ 
 this.salary = salary; // 设置员工的原始工资
}; 
Bonus.prototype.setStrategy = function( strategy ){ 
 this.strategy = strategy; // 设置员工绩效等级对应的策略对象
}; 
Bonus.prototype.getBonus = function(){ // 取得奖金数额
 return this.strategy.calculate( this.salary ); // 把计算奖金的操作委托给对应的策略对象
};

var bonus = new Bonus(); 
bonus.setSalary( 10000 ); 
bonus.setStrategy( new performanceS() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：40000 
bonus.setStrategy( new performanceA() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：30000
//刚刚我们用策略模式重构了这段计算年终奖的代码，可以看到通过策略模式重构之后，代码变得更加清晰，各个类的职责更加鲜明。但这段代码是基于传统面向对象语言的模仿，下一节我们将了解用 JavaScript 实现的策略模式。
