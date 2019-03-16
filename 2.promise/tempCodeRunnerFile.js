
// to refer same object 会导致无法继续执行 因为这个promise 不会成功也不会失败
let Promise = require('./promise');
let promise = new Promise((resolve,reject)=>{
    resolve();
})
let promise2 = promise.then(data=>{
    return promise2
})
promise2.then(null,function(err){
    console.log(err);
})