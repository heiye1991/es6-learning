/**
 * created by : heiye1991
 * created time: 2018-11-16
 * description: let 和const
 *    es6 默认开始严格模式'use strict'，变量未声明使用报引用错误
 *    几个实际应该报ReferenceError的内容，经过webpack编译之后，没有报ReferenceError，反而是undefined
 */
// console.log(n); // ReferenceError
let n = 10;
console.log(window);
console.log(window.n); // undefined

function test(str) {
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

  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i);
    };
  }
  arr[6]();
}
test();