/**
 * created by : heiye1991
 * created time: 2018-11-16
 * description: let 和const
 *    es6 默认开始严格模式'use strict'
 *    几个实际应该报ReferenceError的内容，经过编译之后，没有报ReferenceError，反而是undefined，暂未搞清原因
 */
// let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性，返回undefined
{
  // console.log(n); // ReferenceError
  let n = 10;
  // console.log(window); // window对象
  console.log(window.n); // undefined
}
//typeof 检测类型不再准确
{
  console.log(typeof x); // ReferenceError
  let x =2;
}
// Object.assign
{
  const object1 = {
    a : 1,
    b : 2,
    c : 3
  };
  const object2 = Object.assign({c: 4, d: 5}, object1);
  console.log(object2.c, object2.d);
}

function test(str) {
  //不能在函数内部重新声明参数
  // let str = 'sss'; // 编译不通过 报TypeError:  Duplicate declaration

  // console.log(a); // ReferenceError
  let a = 2;
  console.log(a);
  // 局部作用域，i只在域中起作用
  for (let i = 0; i < 2; i++) {
    // for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
    // console.log(i); // ReferenceError
    let i = 'ww';
    console.log(i);
  }
  // console.log(i); // Uncaught ReferenceError: i is not defined
  // console.log(m); // Uncaught ReferenceError: m is not defined

  // const NUM; // 编译不通过 报SyntaxError:  Unexpected token
  // console.log(NUM); // ReferenceError
  const NUM = 100;
  // NUM = 101; // Uncaught Error: "NUM" is read-only，基础数据类型常量不能被修改
  console.log(NUM);

  // 引用数据类型常量可以被修改
  const Obj = {
    name: 'zhangsan'
  };
  Obj.age = 20;
  Obj.age = 30;
  console.log(Obj);

  // 代替IIFE
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i);
    };
  }
  arr[6]();
}
test();