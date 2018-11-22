/**
 * created by: heiye1991
 * created time: 2018-11-22
 * description: Iterator
 *
 *    Iterator 的作用有三个：
 *        一是为各种数据结构，提供一个统一的、简便的访问接口；
 *        二是使得数据结构的成员能够按某种次序排列；
 *        三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费
 *    指针对象的next方法，用来移动指针，每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束，done: false和value: undefined属性都是可以省略的
 *    默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器
 *    原生具备 Iterator 接口的数据结构有：Array、Map、Set、String、函数的 arguments 对象、NodeList 对象、TypedArray
 *
 */
{
  // 数组
  let arr = [1, 2, 3];
  let ite1 = arr[Symbol.iterator]();
  let ite2 = arr[Symbol.iterator]();
  console.log(ite1);
  console.log(ite2);
  console.log(ite1.next());
  console.log(ite1.next());
  console.log(ite1.next());
  console.log(ite1.next());
  console.log(ite1.next());
  console.log(ite1.next());
  for (let item of ite2) {
    console.log(item);
  }
  // 对象
  let obj = {
    data: [6, 4, 5, 7],
    [Symbol.iterator]() {
      let self = this;
      let index = 0;
      let len = self.data.length;
      return {
        next() {
          if (index < len) {
            return {
              value: self.data[index++],
              done: false
            }
          } else {
            return {
              value: undefined,
              done: true
            }
          }
        }
      }
    }
  };
  for (let item of obj) {
    console.log(item);
  }

  // 类数组对象部署数组的Symbol.iterator方法
  let objArr = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for (let item of objArr) {
    console.log(item);
  }
  // 普通对象部署数组的Symbol.iterator方法，并无效果
  let objCommon = {
    name: 'li',
    age: 25,
    sex: 'male',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for (let item of objCommon) {
    console.log(item);
  }

  // arguments对象
  function printArgs() {
    for (let x of arguments) {
      console.log(x);
    }
  }

  printArgs('a', 'b');

  // 任何接受数组作为参数的场合 默认调用 Iterator 接口
  // 解构赋值 默认调用 Iterator 接口
  // 扩展运算符 默认调用 Iterator 接口
  // yield* 默认调用 Iterator 接口
  // for of 默认调用 Iterator 接口
  let generator = function* () {
    yield 1;
    yield* [2, 3, 4];
    yield 5;
  };
  let iterator = generator();
  for (let item of iterator) {
    console.log(item);
  }

  // 字符串是一个类似数组的对象，原生具有 Iterator 接口
  let str = 'str';
  let strIte = str[Symbol.iterator]();
  for (let item of str) {
    console.log(item);
  }
  for (let item of strIte) {
    console.log(item);
  }

  // return方法(可选)的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法
  // return方法必须返回一个对象
  let objRe = {
    data: [6, 4, 5, 7],
    [Symbol.iterator]() {
      let self = this;
      let index = 0;
      let len = self.data.length;
      return {
        next() {
          if (index < len) {
            return {
              value: self.data[index++],
              done: false
            }
          } else {
            return {
              value: undefined,
              done: true
            }
          }
        },
        return() {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  };
  for (let item of objRe) {
    console.log(item);
    break;
  }
  for (let item of objRe) {
    console.log(item);
    throw new Error('fail');
  }
}
