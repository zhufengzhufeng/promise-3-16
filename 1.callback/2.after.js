// lodash debounce throttle
function after(times,callback){ // 满足一个特点就是高阶函数 redux
    return function(){ // Promise.all
        if(--times === 0){
            callback();
        }
    }
}
let newFn = after(3,function(){ // 高阶函数
    console.log('after');
}); 
newFn();
newFn();
newFn();
newFn();