let fs = require('fs'); 
// 发布 订阅  [fn,fn]
function EventEmitter(){ this._arr = [];}
EventEmitter.prototype.on = function(callback){ // 订阅
    this._arr.push(callback); // this._arr= [on1,on2]
}
EventEmitter.prototype.emit = function(){ // 发布  发布时 需要让on的方法依次执行
    this._arr.forEach(fn=>fn.apply(this,arguments));
}
let e = new EventEmitter();
let school = {}
e.on(function(){
   console.log('一个接口成功');
})
e.on(function(data,key){
    school[key] = data;
    if(Object.keys(school).length === 2){
        console.log(school);
    }
});
fs.readFile('./name.txt','utf8',function(err,data){ 
    if(err) return console.log(err);
    e.emit(data,'name');
});
fs.readFile('./age.txt','utf8',function(err,data){
    if(err) return console.log(err);
    e.emit(data,'age');
})
// let fn1 = function(){console.log('fn1')};
// let fn2 = function(){console.log('fn2')};
// let arr = [fn1,fn2]

// arr.forEach(fn=>fn());