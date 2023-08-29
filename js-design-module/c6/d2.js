var pp = "ssf";
this.pp = "sda";
console.log("全局", this); //{}
var that = this;
function mut(arr) {
  this.name = "全聚德额";
  console.log(that === this);
  console.log(this); //<ref *1> Object [global] {
}
mut([1, 2, 4]);

var singObj = {
  name: "单一的对象",
  getName: function () {
    console.log("在对象内部", this); //this 指的是对象本身
  },
};
singObj.getName();

var NewConstr = function () {
  this.name = "构造的";
  this.skulk = function () {
    console.log(this);
  };
};
var newC1 = new NewConstr();
newC1.skulk();

//已通过call 和apply
var newCallName = { name: "这是为Call" };
singObj.getName.call(newCallName); //此时getName指的是外部指定的对象

//闭包的函数
var bibaofunc = (function () {
  var name = "闭包的name";
  console.log('没放',this)
  return function () {
    console.log("打印闭包内部函数this", this); //闭包返回的函数中，this指的是全局 /<ref *1> Object [global] {
    console.log("打印闭包内部函数this.name", this.name); //
    console.log("打印闭包内部函数name", name);
  };
})();
bibaofunc();
