// 装饰器  前端埋点 在ajax 的请求中包装一层自己的逻辑
// 判断this是谁 就看调用时. 前面是谁this就是谁
Function.prototype.before = function(callback){
    let self = this;
    return function(){ // 这个函数中的this指的是 newFn()前面的this
        callback(); // before 的参数 
        console.log(this)
        self.apply(self,arguments);
    }
}
function fn(val){
    console.log('一定的功能'+val);
}
let newFn = fn.before(function(){
    console.log('在函数执行前执行')
});
newFn('你好');

