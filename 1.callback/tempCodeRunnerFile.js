let fn1 = function(){console.log('fn1')};
let fn2 = function(){console.log('fn2')};
let arr = [fn1,fn2]

arr.forEach(fn=>fn());