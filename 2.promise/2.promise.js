// let Promise = require('./promise');

let p = new Promise((resolve,reject)=>{
    resolve(123);
})

let promise2 = p.then(data=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            reject(123);
        }, 1000);
    })
},err=>{
    return err+400
})
promise2.then(data=>{
    console.log(data,'success')
},err=>{
    console.log(err,'fail')
}).then(data=>{
    console.log(data);
})


// to refer same object 会导致无法继续执行 因为这个promise 不会成功也不会失败
// let Promise = require('./promise');
// let promise = new Promise((resolve,reject)=>{
//     resolve();
// })
// let promise2 = promise.then(data=>{
//     return promise2
// })
// promise2.then(null,function(err){
//     console.log(err);
// })