let Promise = require('./promise')
let promise = new Promise(function(resolve,reject){
    resolve('123');
    // setTimeout(()=>{
        reject('失败');
    // },1000);
});
promise.then(function(val){
    console.log(val,'success')
},function(err){
    console.log(err,'fail')
});
promise.then(function(val){
    console.log(val,'success')
},function(err){
    console.log(err,'fail')
});
promise.then(function(val){
    console.log(val,'success')
},function(err){
    console.log(err,'fail')
});
// 链式调用