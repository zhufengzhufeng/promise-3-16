console.log('my')
function Promise(executor){
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    let self = this;
    self.onResolveCallbacks = []; 
    self.onRejectedCallbacks = []; 
    function reoslve(value){
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'fulfilled';
            self.onResolveCallbacks.forEach(fn=>fn())
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn=>fn())
        }
    }
    try{
        executor(reoslve,reject);
    }catch(e){
        console.log(e);
        reject(e);
    }
}
// promise2 就是当前then返回的promise
// x就是当前then中成功或者失败回调的返回结果


// 因为此方法 可能混着别人逻辑 所以尽可能考虑周全
function resolvePromise(promise2,x,resolve,reject){
    // 对x进行判断 如果x是一个普通值 直接resolve就可以了
    // 如果x是一个promise 采用x的状态
    if(promise2 === x){
        return reject(new TypeError('循环引用'));
    }
    // 这种情况就有可能x 是一个promise了
    if(x!== null && (typeof x === 'object' || typeof x === 'function')){
        try{
            let then = x.then; // 看当前的promise有没有then方法 有可能取then的时候报错
            if(typeof then === 'function'){  // 是一个promise
                then.call(x,y=>{
                    resolve(y);
                },r=>{
                    reject(r);
                }); // 用刚才取出的then方法 不要再去取值了  如果在取可能又会发生异常
            }else{ //{then:{}}
                resolve(x);
            }
        }catch(e){
            reject(e);
        }
    }else{
        resolve(x);
    }
}
// onfulfilled,onrejected 必须异步执行then 方法是异步的
Promise.prototype.then = function(onfulfilled,onrejected){
    let self = this;
    // 返回新的promise 让当前的then方法执行后可以继续then
    let promise2 = new Promise(function(resolve,reject){
        if(self.status === 'fulfilled'){ 
            setTimeout(()=>{
                try{
                    let x = onfulfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e);
                }
            })
        }
        if(self.status === 'rejected'){
            setTimeout(()=>{
                try{
                    let x = onrejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e);
                }
            })
        }
        if(self.status === 'pending'){
            self.onResolveCallbacks.push(function(){ 
                setTimeout(()=>{
                    try{
                        let x = onfulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
               
            });
            self.onRejectedCallbacks.push(function(){
                setTimeout(()=>{
                    try{
                        let x = onrejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
            })
        }
    });
    return promise2
    
}






module.exports = Promise