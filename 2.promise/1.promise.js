// promise怎么变成失败态 reject new Error
// 恶魔金字塔 回调嵌套
let fs = require('fs');
function read(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function(err,data){ // age.txt
            if(err)return reject(err);
            resolve(data);
        })
    })
}
// 链式调用 不是jquery的方式 返回this
// 1）如果then方法中返回的是一个promise 那我就采用这个promise的状态 作为成功或者失败，把promise的结果作为参数
// 2）如果返回的是一个普通值 直接作为下一个then的成功的参数
// 3) 在then方法中抛出异常 也会走失败， 如果错误中返回一个普通值 也会变成成功态
// * 每一个then方法都返回一个新的promise
read('./name.txt').then(data=>{
    // 如果返回的是一个promise  会让这个promise执行，并且采用他的状态作为下一个then成值
    return read(data)
}).then(data=>{
    console.log(data,'1');
    throw new Error('失败')
},err=>{
    console.log(err,'err');
}).then(data=>{
    console.log(data,'2');
},err=>{
    console.log(err,'3');
    return undefined
}).then(data=>{
    console.log('成功');
},err=>{
    console.log('失败');
})
// 必须返回一个新的promise
// let p = new Promise((resolve,reject)=>{
//     reject();
// })
// let p2 = p.then(null,()=>{
//     return 1
// })
// p2.then(data=>{
// })