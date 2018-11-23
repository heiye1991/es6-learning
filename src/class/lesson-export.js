/**
 * created by: heiye1991
 * created time: 2018-11-22
 * description: Module---export
 *    ES6 的模块自动采用严格模式， 是编译时加载
 *    模块之间也可以继承
 *    CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
 *    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
 *    CommonJS 模块输出的是值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值
 *    ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块，原始值变了，import加载的值也会跟着变
 *    Node 的import命令是异步加载 Node 的import命令只支持加载本地模块（file:协议），不支持加载远程模块
 *    node环境，ES6 模块和 CommonJS 采用各自的加载方案
 *    ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块
 *    CommonJS 模块加载 ES6 模块： Node 的import命令加载 CommonJS 模块，Node 会自动将module.exports属性，当作模块的默认输出，即等同于export default xxx，es6加载使用import express from 'express';或者import * as express from 'express';不带{}
 *    CommonJS 模块加载 ES6 模块，不能使用require命令，而要使用import()函数。ES6 模块的所有输出接口，会成为输入对象的属性
 *
 *
 *
 *    export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能，处于块级作用域内，就会报错
 *    export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系，可以使用as重命名
 *    export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例
 *
 */
  // export 写法
  // 写法一
export let ex1 = 1;

// 写法二
let ex2 = 2;
export {ex2};

// 写法三
let ex3 = {
  name: 'li'
};
// as 对输出的变量重命名
export {ex3 as ex4};

// export 函数
export function multiply(x, y) {
  return x * y;
}

// export 类
export class Person {

}

// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
export let ex5 = 111;
setTimeout(() => ex5 = 222, 500);
// export default命令用于指定模块的默认输出 一个模块只能有一个默认输出 只能使用一次 后面不能跟变量声明语句
// 可以有函数名，但是加载的时候等同匿名，在模块外部是无效的
export default function ex6() {
  console.log('foo');
}
// export default let a = 1; // 报错 let a = 1; export default a;
// export 42; // 报错 export default 42;

export let ex7 = 2;
export let ex8 = 3;
export let ex9 = 4;
export let ex10 = 5;
export let ex11 = 6;