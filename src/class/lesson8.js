/**
 * created by: heiye1991
 * created time: 2018-11-19
 * description: 对象扩展
 */
// 简洁表示法
{
  let name = 'jake';
  let age = '20';
  let es6 = {
    name,
    age,
    getName() {
      return this.name;
    }
  };
  console.log(es6.getName());
}
// 属性名表达式
// 属性名表达式与简洁表示法，不能同时使用
// 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，注意使用
{
  let propKey = 'foo';
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };
  console.log(obj);
}
// 对象方法的name属性
{
  const person = {
    sayName() {
      console.log('hello!');
    },
  };
  console.log(person.sayName.name);
  // 对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面 返回值是方法名前加上get和set
  let obj1 = {
    get foo() {
    },
    set foo(x) {
    }
  };
  const descriptor = Object.getOwnPropertyDescriptor(obj1, 'foo');
  console.log(descriptor.get.name);
  console.log(descriptor.set.name);
  // 对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述
  // 编译后没有正确实现
  const key1 = Symbol('description');
  const key2 = Symbol();
  let obj2 = {
    [key1]() {
    },
    [key2]() {
    },
  };
  console.log(obj2[key1].name);
  console.log(obj2[key2].name);
}
// 可枚举性 enumerable为true可枚举
// for...in循环：只遍历对象自身的和继承的可枚举的属性 只有for...in会返回继承的属性
// Object.keys()：返回对象自身的所有可枚举的属性的键名
// JSON.stringify()：只串行化对象自身的可枚举的属性
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性
// ES6 规定，所有 Class 的原型的方法都是不可枚举的
{
  let obj3 = {foo: 123};
  console.log(Object.getOwnPropertyDescriptor(obj3, 'foo'))
}
// 属性遍历
// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名
// Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举
{
  console.log(Reflect.ownKeys({[Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0}));
}
// 扩展运算符
{
  // 解构赋值必须是最后一个参数,否则报错
  let {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
  console.log(x, y, z)
  // 解构赋值的拷贝是浅拷贝
  let obj4 = {a: {b: 1}};
  let {...m} = obj4;
  obj4.a.b = 2;
  console.log(m);
  // 扩展运算符的解构赋值，不能复制继承自原型对象的属性
  let o1 = {a: 1};
  let o2 = {b: 2};
  o2.__proto__ = o1;
  let {...o3} = o2;
  console.log(o3);
  console.log(o3.a);
}
// Object.is()用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
{
  console.log(Object.is('foo', 'foo'));
  console.log(Object.is({}, {}));
  console.log(Object.is(+0, -0));
  console.log(+0 === -0);
  console.log(Object.is(NaN, NaN));
  console.log(NaN === NaN);
}
// Object.assign()用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
// 只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）
// 目标对象与源对象有同名属性，或多个源对象有同名属性,后面的属性会覆盖前面的属性
// undefined和null不在首参数，不会报错但是无效，否则报错
// 数值和布尔值不在首参数，也不会报错，但是无效
// 字符串会以数组形式，拷贝入目标对象
{
  // 同名属性的替换
  const target = {a: {b: 'c', d: 'e'}};
  const source = {a: {b: 'hello'}};
  console.log(Object.assign(target, source));
  const target1 = {a: 1, b: 1};
  const source1 = {b: 2, c: 2};
  const source2 = {c: 3};
  // 只有一个参数，Object.assign会直接返回该参数
  console.log(Object.assign(target1));
  console.log(Object.assign(target1, source1, source2));
  console.log(Object.assign(2));
  // console.log(Object.assign(undefined));
  // console.log(Object.assign(null));
  let obj5 = {a: 1};
  console.log(Object.assign(obj5, undefined) === obj5);
  console.log(Object.assign(obj5, null) === obj5);
  const v1 = 'abc';
  const v2 = true;
  const v3 = 10;
  console.log(Object.assign({}, v1, v2, v3));
  // 数组处理
  console.log(Object.assign([1, 2, 3], [4, 5]));
  // Object.assign只能进行值的复制,如果要复制的值是一个取值函数，那么将求值后再复制
  const source3 = {
    get foo() {
      return 1
    }
  };
  const target3 = {};
  console.log(Object.assign(target3, source3));
}

// es2017 Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象,解决Object.assign()无法正确拷贝get属性和set属性的问题
{
  const source4 = {
    foo: 123,
    get bar() {
      return 'abc'
    },
    set baz(value) {
      console.log(value)
    }
  };
  console.log(Object.getOwnPropertyDescriptors(source4));

  const target4 = {};
  console.log(Object.defineProperties(target4, Object.getOwnPropertyDescriptors(source4)));
  console.log(Object.getOwnPropertyDescriptor(target4, 'foo'));
}
// Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）
// Object.setPrototypeOf()方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身,是 ES6 正式推荐的设置原型对象的方法
// Object.getPrototypeOf()用于读取一个对象的原型对象
{
  let a = {};
  let b = {x: 10};
  Object.setPrototypeOf(b, a);
  a.y = 20;
  a.z = 30;
  console.log(b.x, b.y, b.z);
  console.log(Object.getPrototypeOf(b));
}
// Object.keys()，Object.values()，Object.entries()返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名/键值/键值对数组，原对象的属性名是一个 Symbol 值，该属性会被忽略
{
  let obj6 = {a: 1, b: 2, c: 3};
  console.log(Object.keys(obj6));
  for (let key of Object.keys(obj6)) {
    console.log(key);
  }
  console.log(Object.values(obj6));
  for (let value of Object.values(obj6)) {
    console.log(value);
  }
  console.log(Object.entries(obj6));
  for (let [key, value] of Object.entries(obj6)) {
    console.log([key, value]);
  }
}