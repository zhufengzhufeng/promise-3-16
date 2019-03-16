console.log('my')
function Promise(executor){
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    let self = this;

    // 定义两个队列 存放对应的回调 
    self.onResolveCallbacks = []; // 存放成功的回调
    self.onRejectedCallbacks = []; // 存放失败的回调
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
        reject(e);
    }
}

Promise.prototype.then = function(onfulfilled,onrejected){
    let self = this;
    if(self.status === 'fulfilled'){ 
        onfulfilled(self.value);
    }
    if(self.status === 'rejected'){
        onrejected(self.reason);
    }
    if(self.status === 'pending'){ // 如果是异步的时候 ，需要把成功和失败 分别存放到数组里,发布订阅, 如果稍后调用了resolve  会让函数依次执行，执行的时候 会将成功或者失败的值进行传递
        this.onResolveCallbacks.push(function(){ // TODO...
            onfulfilled(self.value);
        });
        this.onRejectedCallbacks.push(function(){
            onrejected(self.reason);
        })
    }
}






module.exports = Promise