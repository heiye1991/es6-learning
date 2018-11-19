/**
 * created by: heiye1991
 * created time: 2018-11-19
 * description: Symbol
 */
// 数据类型Symbol，表示独一无二的值
// Symbol 值通过Symbol函数生成
// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述
{
  let s1 = Symbol();
  let s2 = Symbol();
  console.log(s1, s2, s1 === s2);
  let s3 = Symbol('haha');
  console.log(s3);
}
// 作为对象属性名,Symbol 值作为对象属性名时,必须使用方括号
{
  let mySymbol = Symbol();

  let a1 = {};
  a1[mySymbol] = 'Hello!';

  let a2 = {
    [mySymbol]: 'Hello!'
  };

  let a3 = {};
  Object.defineProperty(a3, mySymbol, {value: 'Hello!'});
  console.log(a1[mySymbol], a2[mySymbol], a3[mySymbol]);
}
// Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名
// Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名
{
  const obj = {};
  let a = Symbol('a');
  let b = Symbol('b');
  obj[a] = 'Hello';
  obj[b] = 'World';
  console.log(Object.getOwnPropertySymbols(obj));
  Object.getOwnPropertySymbols(obj).forEach(item => {
    console.log(item, obj[item]);
  });

  let obj2 = {
    [Symbol('key')]: 1,
    enum: 2,
    nonEnum: 3
  };
  console.log(Reflect.ownKeys(obj2));
  Reflect.ownKeys(obj2).forEach(item => {
    console.log(item, obj2[item]);
  });
}
// Symbol.for()，Symbol.keyFor()
// Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值，如果存在返回这个 Symbol 值
// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key
{
  let b1 = Symbol.for('foo');
  let b2 = Symbol.for('foo');
  console.log(b1 === b2);
  console.log(Symbol.keyFor(b1))
}