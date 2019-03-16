// Promise 是一个类 承诺 允诺  (异步解决方案)
// pending 等待状态 ->  fulfilled 成功态 (玩具少)
// pending 等待状态 ->  rejected 失败态 (玩具多)
// 成功态和失败态 不能相互转化 
// exexcutor函数 而且会立即执行，参数是resolve函数 reject
// 每个promise实例都有一个then方法
let Promise = require('./promise')
let promise = new Promise(function(resolve,reject){ // executor
    //resolve('玩具少');
    // reject('玩具多');
    throw new Error('报错');
});
// onfulfilled,onrejected
promise.then(function(val){
    console.log(val,'success')
},function(err){
    console.log(err,'fail')
});
