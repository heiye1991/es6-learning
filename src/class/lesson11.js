/**
 * created by: heiye1991
 * created time: 2018-11-19
 * description: Proxy和Reflect
 *    Reflect对象的方法与Proxy对象的方法一一对应
 *    Proxy修改默认行为
 *    Reflect获取默认行为
 */
// Proxy 用于修改某些操作的默认行为，可以理解为拦截器或者代理器
// 生成实例：let proxy = new Proxy(target, handler);
{
  let obj = {
    name: 'jack',
    time: '2018-11-20',
    age: 20,
    _r: 123,
    _p: 'pe'
  };
  let pxy = new Proxy(obj, {
    // 拦截对象属性的读取
    // get方法可以继承
    // get方法的第三个参数 指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例
    // 当目标对象被读取属性的 configurable 和 writable 属性都为 false 时，监听方法最后返回的值必须与目标对象的原属性值一致
    // 当目标对象被读取属性,不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错
    get(target, key) {
      if (key === 'name') {
        return target[key];
      } else {
        return target[key] = 2018;
      }
    },
    // 拦截对象属性的设置
    // set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身
    // 如果目标对象自身的某个属性是不可写也不可配置的，那么 set 不得改变这个属性的值，那么set方法将不起作用
    // 严格模式下，set代理如果没有返回true，就会报错
    set(target, key, value) {
      if (key === 'name') {
        return target[key] = value;
      } else {
        return target[key];
      }
    },
    // has方法拦截HasProperty操作,has拦截只对in运算符生效，对for...in循环不生效,隐藏某些属性，不被in运算符发现，比如私有属性_
    // 当目标对象被其他程序通过 Object.preventExtensions() 禁用了属性拓展，且被检查的属性键确实存在与目标对象中，该监听方法便不能返回 false
    // 当被检查的属性键存在与目标对象中，且该属性的 configurable 配置是 false 时，该监听方法不能返回 false
    has(target, key) {
      if (key[0] === '_') {
        return false;
      }
      return key in target;
    },
    // deleteProperty方法用于拦截delete操作,比如拦截删除私有属性_
    // 目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错
    deleteProperty(target, key) {
      if (key[0] === '_') {
        // throw new Error('could not delete private property');
        console.log('could not delete private property');
      }
      delete target[key];
      return true;
    }
  });
  // get方法可以继承
  console.log(pxy.time);
  // get方法可以继承
  let pe = Object.create(pxy);
  console.log(pe.time);

  pxy.time = '2019-11-20';
  pxy.name = 'haha';
  console.log(pxy.time, pxy.name);

  console.log('name' in pxy, '_r' in pxy);

  delete pxy.time;
  delete pxy._r;
  console.log(pxy);

  // construct方法用于拦截new命令
  // construct方法返回的必须是一个对象，否则会报错
  let person = new Proxy(function () {
  }, {
    construct: function (target, args) {
      console.log('called: ' + args.join(', '));
      return {value: args[0] * 10};
    }
  });
  console.log((new person(1)).value);

  /*// defineProperty方法拦截了Object.defineProperty操作
  //如果目标对象不可扩展（extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错；如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置
  let defPro = new Proxy({}, {
    defineProperty (target, key, descriptor) {
      return false;
    }
  });
  // 编译报错,chrome控制台运行可以
  defPro.foo = 'bar';
  console.log(defPro);*/

  // getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined
  let getOwnPro = new Proxy(
    {
      _foo: 'bar',
      baz: 'tar'
    },
    {
      getOwnPropertyDescriptor(target, key) {
        if (key[0] === '_') {
          return;
        }
        return Object.getOwnPropertyDescriptor(target, key);
      }
    }
  );
  console.log(Object.getOwnPropertyDescriptor(getOwnPro, 'wat'));
  console.log(Object.getOwnPropertyDescriptor(getOwnPro, '_foo'));
  console.log(Object.getOwnPropertyDescriptor(getOwnPro, 'baz'));

  // getPrototypeOf方法主要用来拦截获取对象原型,Object.prototype.__proto__、Object.prototype.isPrototypeOf()、Object.getPrototypeOf()、Reflect.getPrototypeOf()、instanceof
  // getPrototypeOf方法的返回值必须是对象或者null，否则报错,如果目标对象不可扩展（extensible）， getPrototypeOf方法必须返回目标对象的原型对象
  let proto = {};
  let getPro = new Proxy({}, {
    getPrototypeOf(target) {
      return proto;
    }
  });
  console.log(Object.getPrototypeOf(getPro) === proto);

  // isExtensible方法拦截Object.isExtensible操作
  // 只能返回布尔值，否则返回值会被自动转为布尔值
  // 回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
  let isExt = new Proxy({}, {
    isExtensible: function (target) {
      return true;
      // return false; // 报错
    }
  });
  console.log(Object.isExtensible(isExt));

  // preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
  // 只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错
  let preventExt = new Proxy({}, {
    preventExtensions: function (target) {
      Object.preventExtensions(target); // 不调用直接返回true// 会报错
      return true;
    }
  });
  console.log(Object.preventExtensions(preventExt));

  // setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法
  // 只能返回布尔值，否则会被自动转为布尔值。如果目标对象不可扩展（extensible），setPrototypeOf方法不得改变目标对象的原型
  let target = function () {
  };
  let serPro = new Proxy(target, {
    setPrototypeOf(target, proto) {
      // throw new Error('Changing the prototype is forbidden');
      console.log('Changing the prototype is forbidden');
    }
  });
  // Object.setPrototypeOf(serPro, proto);

  // apply方法拦截函数的调用、call和apply操作,可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组

  function sum(left, right) {
    return left + right;
  }

  let appPro = new Proxy(sum, {
    apply(target, ctx, args) {
      return Reflect.apply(...arguments) * 2;
    }
  });
  console.log(appPro(1, 2));
  console.log(appPro.call(null, 5, 6));
  console.log(appPro.apply(null, [7, 8]));

  // ownKeys方法用来拦截对象自身属性的读取操作,比如只读取返回name或者过滤读取私有属性
  // 拦截Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Object.keys()、for...in循环

  // 只返回a属性
  let ownPro1 = new Proxy({
    a: 1,
    b: 2,
    c: 3
  }, {
    ownKeys(target) {
      return ['a'];
    }
  });
  console.log(Object.keys(ownPro1));

  // 拦截第一个字符为下划线的属性名
  let ownPro2 = new Proxy({
    _bar: 'foo',
    _prop: 'bar',
    prop: 'baz'
  }, {
    ownKeys(target) {
      return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    }
  });
  console.log(Object.keys(ownPro2));

  // 使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回：目标对象上不存在的属性、属性名为 Symbol 值、不可遍历（enumerable）的属性
  let target3 = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.for('secret')]: '4',
  };
  Object.defineProperty(target3, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
  });
  // 拦截Object.keys
  let ownPro3 = new Proxy(target3, {
    ownKeys(target) {
      return ['a', 'd', Symbol.for('secret'), 'key'];
    }
  });
  console.log(Object.keys(ownPro3));

  // 拦截Object.getOwnPropertyNames()
  let ownPro4 = new Proxy({}, {
    ownKeys: function (target) {
      return ['a', 'b', 'c'];
    }
  });
  console.log(Object.getOwnPropertyNames(ownPro4));

  // 拦截for...in循环
  let ownPro5 = new Proxy({hello: 'world'}, {
    ownKeys: function () {
      return ['a', 'b'];
    }
  });
  for (let key in ownPro5) {
    console.log(key); // 没有任何输出
  }

  // ownKeys方法返回的数组成员，只能是字符串或 Symbol 值，否则报错
  let ownPro6 = new Proxy({hello: 'world'}, {
    ownKeys: function (target) {
      return [123, true, undefined, null, {}, []];
    }
  });
  // console.log(Object.getOwnPropertyNames(ownPro6)); // 报错

  // 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错
  let target4 = {};
  Object.defineProperty(target4, 'a', {
      configurable: false,
      enumerable: true,
      value: 10
    }
  );
  let ownPro7 = new Proxy(target4, {
    ownKeys: function (target) {
      return ['b'];
    }
  });
  // console.log(Object.getOwnPropertyNames(ownPro7)); // 报错

  // 如果目标对象是不可扩展的（non-extensition），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错
  let target5 = {a: 1};
  Object.preventExtensions(target5);
  let ownPro8 = new Proxy(target5, {
    ownKeys: function (target) {
      return ['a', 'b'];
    }
  });
  // console.log(Object.getOwnPropertyNames(ownPro8)); // 报错

  // Proxy.revocable方法返回一个可取消的 Proxy 实例
  // Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例
  // 使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问
  let {proxy, revoke} = Proxy.revocable({}, {});
  proxy.foo = 123;
  console.log(proxy.foo);
  // revoke(); // 取消Proxy实例
  // console.log(proxy.foo); // 报错

  // this 指向问题
  // 在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理
  // 编译之后，返回都是false，chrome控制台运行显示false，true
  let target6 = {
    m: function () {
      console.log(this === proxy);
    }
  };
  let handler6 = {};
  let thPro6 = new Proxy(target6, handler6);
  target6.m();
  thPro6.m();

  // 有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性
  // 通过this绑定原始对象实现
  let target7 = new Date('2015-01-01');
  let handler7 = {
    get(target, prop) {
      if (prop === 'getDate') {
        return target.getDate.bind(target7);
      }
      return Reflect.get(target7, prop);
    }
  };
  let thPro7 = new Proxy(target7, handler7);
  console.log(thPro7.getDate());

  // this指向的变化，导致 Proxy 无法代理目标对象
  let _name = new WeakMap();

  class Person {
    constructor(name) {
      _name.set(this, name);
    }

    get name() {
      return _name.get(this);
    }
  }

  let jane = new Person('Jane');
  console.log(jane.name);
  let thPro8 = new Proxy(jane, {});
  console.log(thPro8.name);
}

{
  let myObject = {
    name: 'jack',
    time: '2018-11-20',
    age: 20,
    _r: 123,
    _pe: '22',
    get baz() {
      return this.name + this.time;
    },
    set bar(value) {
      return this.age = value;
    }
  };
  let myReceiverObject = {
    name: 'hei',
    time: '2018-11-22',
    age: 24
  };
  // Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined
  // 第一个参数不是对象，Reflect.get方法会报错
  // 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver
  console.log(Reflect.get(myObject, 'name'));
  console.log(Reflect.get(myObject, 'baz', myReceiverObject));

  // Reflect.set方法设置target对象的name属性等于value
  // 第一个参数不是对象，Reflect.set会报错
  // 如果name属性设置了赋值函数，则赋值函数的this绑定receiver
  Reflect.set(myObject, 'age', 22);
  console.log(myObject.age);
  Reflect.set(myObject, 'age', 25, myReceiverObject);
  console.log(myObject.age, myReceiverObject.age);

  // Reflect.has方法对应name in obj里面的in运算符
  // 如果第一个参数不是对象，Reflect.has和in运算符都会报错
  console.log('age' in myObject);
  console.log(Reflect.has(myObject, 'age'));

  // Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性
  delete myObject._r;
  console.log('_r' in myObject);
  Reflect.deleteProperty(myObject, '_pe');
  console.log(Reflect.has(myObject, '_pe'));

  // Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法
  function Greeting(name) {
    this.name = name;
  }

  console.log(Reflect.construct(Greeting, ['lisi']));
  console.log(new Greeting('lisi'));

  // Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)
  // 如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错
  console.log(Object.getPrototypeOf(myObject));
  console.log(Object.getPrototypeOf(1));
  // console.log(Reflect.getPrototypeOf(1));// 报错

  // Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功
  // 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错,如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错
  // 如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false
  console.log(Reflect.setPrototypeOf({}, Array.prototype));
  console.log(Reflect.setPrototypeOf({}, null));
  console.log(Reflect.setPrototypeOf(Object.freeze({}), null));

  // Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数
  let ages = [11, 33, 12, 54, 18, 96];
  console.log(Math.min.apply(Math, ages));
  console.log(Reflect.apply(Math.min, Math, ages));

  // Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性
  // 如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误
  function MyDate() {
  }

  Object.defineProperty(MyDate, 'now', {
    value: () => Date.now()
  });
  console.log(MyDate.now);
  Reflect.defineProperty(MyDate, 'now', {
    value: () => Date.now()
  });
  console.log(MyDate.now);

  // Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象
  // 如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法
  let myOwnProObject = {};
  Object.defineProperty(myOwnProObject, 'hidden', {
    value: true,
    enumerable: false,
  });
  console.log(myOwnProObject);
  console.log(Object.getOwnPropertyDescriptor(myOwnProObject, 'hidden'));
  console.log(Reflect.getOwnPropertyDescriptor(myOwnProObject, 'hidden'));

  // Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展
  // 参数不是对象，Object.isExtensible会返回false 而Reflect.isExtensible会报错
  console.log(Object.isExtensible({}));
  console.log(Reflect.isExtensible({}));

  // Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功
  // 如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错
  // ES6 环境
  console.log(Object.preventExtensions(1));
  console.log(Object.preventExtensions({}));
  console.log(Reflect.preventExtensions({}));

  // Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
  let myOwnObject = {
    foo: 1,
    bar: 2,
    [Symbol.for('baz')]: 3,
    [Symbol.for('bing')]: 4,
  };
  // 旧写法
  console.log(Object.getOwnPropertyNames(myOwnObject));
  console.log(Object.getOwnPropertySymbols(myOwnObject));
  // 新写法
  console.log(Reflect.ownKeys(myOwnObject));
}
// Proxy 和 Reflect 应用：实现解耦
{
  function validator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let va = this._validator[key];
          if (!!va(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            throw Error(`不能设置${key}到${value}`)
          }
        } else {
          throw Error(`${key} 不存在`)
        }
      }
    })
  }

  let personValidators = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    },
    mobile(val) {
    }
  };

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      this.mobile = '1111';
      return validator(this, personValidators)
    }
  }

  let person = new Person('lilei', 30);
  console.info(person);
  person.name = 'Han mei mei';
  console.info(person);
  // person.sex = 'male'; // 不存在的属性
  // person.name = 55; // name 只能是string
  // person.age = 15; // age只能是大于18的数值
  console.info(person);
}