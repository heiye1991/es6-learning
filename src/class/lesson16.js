/**
 * created by: heiye1991
 * created time: 2018-11-22
 * description: async
 *     async函数，es2017引入，是Generator 函数的语法糖
 *     async函数自带执行器
 *     async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
 *     async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
 *     async函数的返回值是 Promise 对象，用then方法指定下一步的操作
 *     async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变执行then方法指定的回调函数，除非遇到return语句或者抛出错误
 *     只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行
 *     多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发 await Promise.all()
 */
{
  // 基本用法
  async function timeout(ms) {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
  }

  asyncPrint('hello world', 50);

  // async函数内部return语句返回的值，会成为then方法回调函数的参数
  async function asy1() {
    // return 'world';
    return await 'world';
  }

  asy1().then(function (res) {
    console.log(res);
  });

  // async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。可以被then里的回调函数接收到
  async function asy2() {
    throw new Error('fail1');
    // return await Promise.reject('err');
  }

  asy2().then(function (res) {
    console.log(res);
  }, function (err) {
    console.log(err);
  });

  // await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到
  async function asy3() {
    await Promise.reject('err');
    await Promise.resolve('hello world'); // 不会执行
  }

  asy3().then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });

  async function asy4() {
    try {
      await Promise.reject('err2');
    } catch (e) {
      throw new Error('fail2');
    }
    await Promise.resolve('hello world'); // 会执行
  }

  asy4().then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });

  async function asy5() {
    await Promise.reject('err3').catch(function (err) {
      throw new Error('fail3');
    });
    await Promise.resolve('hello world'); // 会执行
  }

  asy5().then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });
}

// Iterator只适合于同步操作 异步操作提供原生的遍历器接口，即value和done这两个属性都是异步产生
// 异步遍历器 es2018引入
// 异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象，如果next方法返回的 Promise 对象被reject，for await...of就会报错，要用try...catch捕捉
// 异步遍历器的方法（next，throw，和return），每个方法都返回一个 Promise，Promise 返回 { value, done }
// for...of循环用于遍历同步的 Iterator 接口
// for await...of循环，则是用于遍历异步的 Iterator 接口，for await...of循环也可以用于同步遍历器
// for await...of循环只能在 async 函数或者 async 生成器里面使用
{
  // 异步遍历器实例
  let asyncIteObj = {
    [Symbol.asyncIterator]: () => {
      let items = [1, 2, 3, 4, 5, 6];
      return {
        next: () => Promise.resolve({
          done: items.length === 0,
          value: items.shift()
        })
      }
    }
  };
  (async function () {
    for await (let item of asyncIteObj) {
      console.log(item);
    }
  })();
  // for await...of循环也可以用于同步遍历器
  (async function () {
    for await (let item of [111, 222]) {
      console.log(item);
    }
  })();
  //错误用catch捕获
  (async function () {
    try {
      for await (let item of [333, 444, 555]) {
        console.log(item);
      }
    } catch (e) {
      console.error(e);
    }
  })();

}

// Generator 函数返回一个同步遍历器对象
// async Generator 函数 es2018引入，作用是返回一个异步遍历器对象
// 异步 Generator 函数内部，能够同时使用await和yield命令。可以这样理解，await命令用于将外部操作产生的值输入函数内部，yield命令用于将函数内部的值输出
// 异步 Generator 函数的返回值是一个异步 Iterator，即每次调用它的next方法，会返回一个 Promise 对象，也就是说，跟在yield命令后面的，应该是一个 Promise 对象
// 如果异步 Generator 函数抛出错误，会导致 Promise 对象的状态变为reject，然后抛出的错误被catch方法捕获
{
  // 实例
  async function* gen() {
    yield 'async Generator';
  }

  let genObj = gen();
  genObj.next().then(res => console.log(res));

  // 实例
  async function* asyncGen() {
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(666);
      }, 1000)
    });
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(777);
      }, 1000)
    });
    yield await p1;
    yield await p2
  }

  (async function () {
    for await (let val of asyncGen()) {
      console.log(val);
    }
  })();

  // 实例
  function fetchRandom() {
    let url = 'https://www.random.org/decimal-fractions/'
      + '?num=1&dec=10&col=1&format=plain&rnd=new';
    return fetch(url);
  }

  async function* asyncGenerator() {
    console.log('Start');
    let result = await fetchRandom();
    yield 'Result: ' + await result.text();
    console.log('Done');
  }

  let ag = asyncGenerator();
  ag.next().then(({value, done}) => {
    console.log(888, value);
  });
  ag.next();

  // 异步 Generator 函数的执行器
  async function takeAsync(asyncIterable, count = Infinity) {
    const result = [];
    const iterator = asyncIterable[Symbol.asyncIterator]();
    while (result.length < count) {
      const {value, done} = await iterator.next();
      if (done) break;
      result.push(value);
    }
    return result;
  }

  async function f() {
    async function* gen() {
      yield 'a';
      yield 'b';
      yield 'c';
    }

    return await takeAsync(gen());
  }

  f().then(function (result) {
    console.log(999, result);
  });

  // yield*语句
  async function* gen1() {
    yield 'a';
    yield 'b';
    return 2;
  }

  async function* gen2() {
    yield* gen1();
  }

  (async function () {
    for await (const item of gen2()) {
      console.log(111111, item);
    }
  })();
}