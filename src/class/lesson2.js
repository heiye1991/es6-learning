/**
 * created by: heiye1991
 * created time: 2018-11-16
 * description: 解构赋值
 */
/*
* 数据解构
* */
// 解构成功
{
  let [a, b, ...rest] = [1, 2, 3, 4, 5];
  console.log(a, b, rest);
  let [x, [[y], z]] = [1, [[2], 3]];
  console.log(x, y, z);
  let [m, , n] = [1, 2, 3, 4];
  console.log(m, n);
}
//解构不成功，没有匹配值都会等于undefined
{
  let [x, y, ...z] = ['a'];
  console.log(x, y, z);
  let [m, n] = [];
  console.log(m, n);
}
// 不完全解构 等号左边的模式，只匹配一部分的等号右边的数组
{
  let [x, y] = [1, 2, 3];
  console.log(x, y);
  let [a, [b], c] = [1, [2, 3], 4];
  console.log(a, b, c);
}
// 默认值 严格相等运算符判断一个位置是否有值 值严格等于undefined，默认值才会生效
{
  let [a = 2] = [1];
  console.log(a);
  let [b = 3] = [undefined];
  console.log(b);
  let [c = 4] = [null];
  console.log(c);
  let [d = 5] = [];
  console.log(d);
  let [e = 6] = [''];
  console.log(e);
  let g;
  let [f = 7] = [g];
  console.log(f);
}
// 默认值是个表达式，惰性求值
{
  function base() {
    console.log(222);
    return 3;
  }

  let [x = base()] = [1];
  console.log(x);
  let [y = base()] = [];
  console.log(y);
}
// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
{
  let [a = 1, b = a] = [];
  console.log(a, b);
  let [c = 1, d = c] = [2];
  console.log(c, d);
  let [e = 1, f = e] = [1, 2];
  console.log(e, f);
  // let [g = h, h = 1] = []; // Uncaught ReferenceError: h is not defined
  // console.log(g,h);
}

/*
* 对象解构
* */
// 对象的属性没有次序，变量必须与属性同名，才能取到正确的值
{
  let {a, b} = {a: "aaa", b: "bbb"};
  console.log(a, b);
  //foo是匹配的模式，baz才是变量。真正被赋值的是变量baz
  let {foo: baz} = {foo: 'aaa', bar: 'bbb'};
  console.log(baz);
  // 对象嵌套
  let obj = {};
  let arr = [];
  ({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});
  console.log(obj, arr);
}
// 解构不成功 值为undefined
{
  let {a, b} = {};
  console.log(a, b);
  let {c, d} = {c: 222};
  console.log(c, d);
}
// 默认值生效的条件是，对象的属性值严格等于undefined
{
  let {a = 2, b = 3} = {a: 1, b: undefined};
  console.log(a, b);
  let {c = 4} = {c: null};
  console.log(c);
}
/*
* 字符串解构
* */
{
  let [a, b, c] = 'hi';
  console.log(a, b, c);
  let {length: len} = 'hello';
  console.log(len);
}
/*
* 数值和布尔值解构 会先转为对象再解构
* undefined和null无法转为对象，解构赋值会报错
* */
{
  let {toString:a} = 123;
  console.log(a);
  let {toString:b} = false;
  console.log(b);
}
/*
* 函数参数解构赋值
* */
{
  function add([x, y]){
    return x + y;
  }
  console.log(add([1, 2]));
  // 默认值
  function mix([x=1, y=1] = []){
    return x + y;
  }
  console.log(mix());
  // 不同写法结果不一样
  function sum1({x=1, y=1} = {}){
    return [x , y];
  }
  console.log(sum1({x:2, y:2}));
  console.log(sum1({x:2}));
  console.log(sum1({}));
  console.log(sum1());

  function sum2({x, y} = {x:3, y:3}){
    return [x , y];
  }
  console.log(sum2({x:4, y:4}));
  console.log(sum2({x:4}));
  console.log(sum2({}));
  console.log(sum2());
}
/*
* 圆括号
* 变量声明语句使用报错，函数参数使用报错，赋值语句的模式使用报错
* 只有赋值语句的非模式部分，可以使用圆括号
* */
{
  // let [(a)] = [1];
  // function f([(z)]) { return z; }
  // ([c]) = [5];
  let d;
  [(d)] = [1];
  console.log(d);
}

/*
* 解构赋值应用
* */
// 变量交互
{
  let a=2,b=3;
  [a,b] = [b,a];
  console.log(a,b);
}
// 函数返回多个值的取值
{
  function sun1() {
    return [33,44];
  }
  let [c,d] = sun1();
  console.log(c,d);

  function sun2() {
    return [33,44,55,66,77];
  }
  let [e,...f] = sun2();
  console.log(e,f);
}
/*
* JSON取值
* */
{
  let metaData = {
    title: 'title',
    test: [
      {
        desc: 'desc',
        key: 'key'
      }
    ]
  };
  let { title,test } = metaData;
  console.log(title,test);

  let { title2,test:[{desc,key}] } = metaData;
  console.log(title,desc,key);
}
/*
* 遍历 Map 结构
* */
{
  const map = new Map();
  map.set('first', 'hello');
  map.set('second', 'world');
  for (let [key, value] of map) {
    console.log(key,value);
  }
}