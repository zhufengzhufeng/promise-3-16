// 观察者模式  基于发布订阅模式 
// 发布订阅 发布和订阅 两者无关
// 观察者模式 观察者 和 被观察者
// 被观察者 应该存放着观察者 我家有个小宝宝 有一个状态
// 被观察者状态变化 要更新自己身上的所有的观察者
class Subject{ // 小宝宝
    constructor(){
        this.state = '开心';
        this.arr = [];
    }
    attach(observer){ // 装载观察者的
        this.arr.push(observer);
    }
    setState(newState){ // 更新自己的状态
        this.state  = newState;
        this.arr.forEach(observer=>observer.update(newState));
    }
}
// 应该每个数据变化 都应该对应自己的观察 而不是 一个数据变了 都要更新一下
class Observer{ // 我
    constructor(who){ 
        this.who = who
    }
    // 这个方法是用来被 被观察者调用的
    update(newState){ // 原型上的方法
        console.log(this.who +newState +'了');
    }
}
let subject = new Subject();
let my1 = new Observer('我');
let my2 = new Observer('媳妇');
subject.attach(my1);
subject.attach(my2);
subject.setState('大哭');
