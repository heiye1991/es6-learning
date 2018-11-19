/**
 * created by: heiye1991
 * created time: 2018-11-19
 * description: 函数扩展
 */
// 函数参数默认值
// 利用参数默认值，可以指定某一个参数不得省略
{
  function test(x, y = 'world') {
    console.log(x, y);
  }

  test('hello');
  test('hello', 'es6');
}
// 参数默认值与解构赋值结合
{
  function test1({x = 0, y = 0} = {}) {
    console.log(x, y);
  }

  function test11({x, y} = {x: 0, y: 0}) {
    console.log(x, y);
  }

  test1();
  test11();
  test1({});
  test11({});
  test1({x: 1});
  test11({x: 1});
  test1({x: 1, y: 2});
  test11({x: 1, y: 2});
}
// 参数默认值的位置，一般在末尾，如果不在，这个参数不能省略，会报错
{
  function f(x, y = 5, z) {
    console.log(x, y, z)
  }

  f();
  f(1);
  // f(1, ,2); // 报错
  f(1, undefined, 2);
}
// 默认值作用域,设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域,等到初始化结束，这个作用域就会消失
{
  let x = 1;

  // 参数形成一个单独的作用域,默认值变量x指向第一个参数x
  function test2(x, y = x) {
    console.log(x, y);
  }

  test2();
  test2(2);
  test2(2, 3);
}
// rest 参数用于获取函数的多余参数
{
  function test3(...args) {
    console.log(args, typeof args);
  }

  test3(1, 2, 3, 4)
}
// length属性和name属性
// length属性将返回没有指定默认值的参数个数
{
  console.log((function (a) {}).length);
  console.log((function (a = 5) {}).length);
  console.log((function (a, b, c) {}).length);
  console.log((function (a, b, c = 5) {}).length);
  // 设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
  console.log((function (a = 0, b, c) {}).length);
  console.log((function (a, b = 1, c) {}).length);

  function test4() {}

  console.log(test4.name);
  let f = function () {};
  console.log(f.name); // 将一个匿名函数赋值给一个变量 S5 的name属性，会返回空字符串 ES6 的name属性会返回实际的函数名
  const bar = function baz() {};
  console.log(bar.name); // 将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字
  console.log((new Function).name); // Function构造函数返回的函数实例，name属性的值为anonymous
  console.log(f.bind({}).name); // bind返回的函数，name属性值会加上bound前缀
  console.log((function () {}).bind({}).name);
}
// 箭头函数
{
  let foo = (n) => n * 2;
  console.log(foo(3));
  let foo2 = () => 10;
  console.log(foo2());
  // 箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回
  let sum = (num1, num2) => {
    return num1 + num2;
  };
  console.log(sum(1, 2));
  // 返回对象要用()包起来
  let getTempItem = id => ({id: id, name: "Temp"});
  console.log(getTempItem('a12'));
  let foo3 = () => ({a: 1});
  console.log(foo3());
  let foo4 = () => {
    a: 1
  };
  console.log(foo4());
}
// 尾调用
{
  function mix(x) {
    console.log(x);
  }

  function add(x) {
    return mix(x);
  }

  add(2);
}
// 尾递归
{
  function factorial(n, total = 1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
  }

  console.log(factorial(5));
  console.log(factorial(90));
}

// ES2017 允许函数的最后一个参数有尾逗号
{
  function m(x, y = 5,) {
    console.log(x, y)
  }

  m(1);
}