/**
 * created by: heiye1991
 * created time: 2018-11-22
 * description: Generator
 *
 *    两个特征。function关键字与函数名之间有一个星号；函数体内部使用yield表达式，定义不同的内部状态
 *    调用 Generator 函数后，该函数并不执行，返回的是一个指向内部状态的指针对象，必须调用遍历器对象的next方法，使得指针移向下一个状态，yield表达式是暂停执行的标记，而next方法可以恢复执行
 *    yield表达式只能用在 Generator 函数里面，yield表达式如果用在另一个表达式之中，必须放在圆括号里面，yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号
 *    每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束，done: false和value: undefined属性都是可以省略的
 *    过程：
 *        调用next方法时，遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值
 *        下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
 *        如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值
 *        如果该函数没有return语句，则返回的对象的value属性值为undefined
 *    Generator 可以暂停函数执行，返回任意表达式的值，应用
 *        异步操作的同步化表达
 *        控制流管理(只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤)
 *        利用 Generator 函数，可以在任意对象上部署 Iterator 接口
 *        可以对任意表达式，提供类似数组的接口
 *
 *
 *
 */
{
  function* gene1() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'd';
    // return 后面的不会执行了，因为执行return之后，done的值为true了
    // yield 'e';
  }

  let ge1 = gene1();
  let ge2 = gene1();
  // Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
  console.log(ge1[Symbol.iterator]() === ge1);
  console.log(ge1.next());
  console.log(ge1.next());
  console.log(ge1.next());
  console.log(ge1.next());
  console.log(ge1.next());
  console.log(ge1.next());
  // 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，不会输出return后的内容
  for (let item of ge2) {
    console.log(item);
  }

  // 没有yield
  function* gene2() {
    console.log('no yield');
  }

  console.log(gene2().next());

  // 可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口
  let obj = {
    name: 'li',
    age: 25
  };
  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  console.log(obj);
  for (let item of obj) {
    console.log(item);
  }

  // next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值，从第二次使用next方法开始，参数才是有效的
  function* gene3(x) {
    let y = 2 * (yield (x + 1));
    let z = yield (y / 3);
    return (x + y + z);
  }

  let ge3 = gene3(6);
  console.log(ge3.next()); // x=6，6+1=7
  console.log(ge3.next(9)); // 上一次yield为9，y=18，z=6
  console.log(ge3.next(8)); // 上一次yield为8，z=8，所有x+y+z=6+18+8=32
  console.log(ge3.next());

  // 处理普通对象，使其可以使用for of遍历任意对象
  function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);
    for (let propKey of propKeys) {
      yield [propKey, obj[propKey]];
    }
  }

  let objFor = {first: 'Jane', last: 'Doe'};
  for (let [key, value] of objectEntries(objFor)) {
    console.log(key, value);
  }

  function* numbers() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
  }

  console.log(numbers());
  // 扩展运算符
  console.log([...numbers()]);

  // Array.from 方法
  console.log(Array.from(numbers()));

  // 解构赋值
  let [x, y] = numbers();
  console.log(x, y);

  // for...of 循环
  for (let n of numbers()) {
    console.log(n);
  }

  // Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
  // throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法
  // throw方法可以接受一个参数，该参数会被catch语句接收
  // throw方法被捕获以后，会附带执行下一条yield表达式，即执行一次next方法
  // Generator 函数内部部署try...catch代码块，那么throw方法抛出的错误，不影响下一次遍历
  // Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获
  // Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，此时Generator 已经运行结束
  // throw命令与Generator的throw方法是无关的，两者互不影响
  function* gene4() {
    try {
      yield;
    } catch (e) {
      console.log('内部捕获', e);
    }
    // throw附带执行一条
    console.log('next1');
    yield 44;
    // 其他的next()
    console.log('next2');
    yield 55;
  }

  let ge4 = gene4();
  // 执行一次next方法，才能调用下面的throw方法
  console.log(111, ge4.next());
  try {
    // 第一次抛出错误，被 Generator 函数体内的catch语句捕获
    console.log(222, ge4.throw('a'));
    console.log(333, ge4.next());
    // 第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误
    console.info(444, ge4.throw(new Error('err')));
  } catch (e) {
    console.log('外部捕获', e);
  }
  console.log(555, ge4.next());

  // Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数，return方法调用时不提供参数，则返回值的value属性为undefined
  // Generator 函数执行return方法,此时Generator 已经运行结束
  // 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行
  function* gene5() {
    yield 1;
    yield 2;
    yield 3;
    try {
      yield 4;
      yield 5;
    } finally {
      yield 6;
      yield 7;
    }
    yield 8;
  }

  let ge5 = gene5();

  console.log(111, ge5.next());
  console.log(222, ge5.next());
  console.log(333, ge5.next());
  console.log(444, ge5.next());
  // finally 执行完才执行return()
  console.log(777, ge5.return('a'));
  // finally里的
  console.log(555, ge5.next());
  console.log(666, ge5.next());
  // console.log(777,ge5.return('b'));
  // Generator已经结束了
  console.log(888, ge5.next());
  console.log(999, ge5.next());
  console.log(101010, ge5.next());

  // yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数
  // 任何数据结构只要有 Iterator 接口，就可以被yield*遍历
  function* inner() {
    yield 'hello!';
  }

  function* outer1() {
    yield 'open1';
    // yield 不带* 返回一个遍历器对象
    yield inner();
    yield 'close1';
  }

  function* outer2() {
    yield 'open2';
    // yield 带* 返回遍历器对象的内部值
    yield* inner();
    yield 'close2';
  }

  let out1 = outer1();
  let out2 = outer2();
  for (let item of out1) {
    console.log(item);
  }
  for (let item of out2) {
    console.log(item);
  }

  function* gene6() {
    yield* [1, 2, 3, 4, 5];
    yield* 'string'
  }

  let ge6 = gene6();
  for (let item of ge6) {
    console.log(item);
  }

  function* gene7() {
    yield 2;
    yield 3;
    return "gene7";
  }

  function* gene8() {
    yield 1;
    // gene7的return提供返回值
    let re = yield* gene7();
    console.log("return: " + re);
    yield 4;
  }

  let ge8 = gene8();
  let ge82 = gene8();
  console.log([...ge82]);
  for (let item of ge8) {
    console.log(item);
  }

  // yield* 多维数组转为一位数组
  function* iterTree(tree) {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        yield* iterTree(tree[i]);
      }
    } else {
      yield tree;
    }
  }

  let douArr = ['a', ['b', 'c'], ['d', 'e']];
  let sinArr = [];
  for (let x of iterTree(douArr)) {
    sinArr.push(x);
  }
  console.log(sinArr);

  // yield*遍历完全二叉树
  // 下面是二叉树的构造函数，
  // 三个参数分别是左树、当前节点和右树
  function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
  }

  // 下面是中序（inorder）遍历函数。
  // 由于返回的是一个遍历器，所以要用generator函数。
  // 函数体内采用递归算法，所以左树和右树要用yield*遍历
  function* inorder(t) {
    if (t) {
      yield* inorder(t.left);
      yield t.label;
      yield* inorder(t.right);
    }
  }

  // 下面生成二叉树
  function make(array) {
    // 判断是否为叶节点
    if (array.length === 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
  }

  let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
  console.log('二叉树', tree);
  // 遍历二叉树
  let result = [];
  for (let node of inorder(tree)) {
    result.push(node);
  }
  console.log(result);

  // 让 Generator 函数返回一个正常的对象实例
  function* Fun() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
  }

  let objNull = {};
  // 既可以调用next方法，又可以获得正常的this
  // 空对象使用call方法绑定 Generator 函数内部的this，构造函数调用以后，空对象就是 Generator 函数的实例对象
  // 遍历器对象fun，生成的对象实例objNull
  let fun = Fun.call(objNull);
  // 构造函数fun没有执行，objNull没有内容
  console.log(objNull);
  console.log(fun.next());
  console.log(fun.next());
  console.log(fun.next());
  // 构造函数fun执行之后，objNull才有内容
  console.log(objNull);
  // 可以使用new
  // 遍历器对象和生成的对象实例统一
  function F() {
    return Fun.call(Fun.prototype);
  }

  let f = new F();
  for (let item of f) {
    console.log(item);
  }
}
{
  // 避免全局变量暴露以及修改
  function draw(count) {
    console.log(`剩余抽奖${count}次`);
  }

  function* residue(count) {
    while (count > 1) {
      count--;
      yield draw(count);
    }
  }

  let start = residue(5);
  let btn = document.createElement('button');
  btn.id = 'btn';
  btn.innerText = '抽奖';
  btn.style.color = 'red';
  document.body.appendChild(btn);
  document.getElementById('btn').addEventListener('click', function () {
    let state = start.next();
    console.log(state);
    if (state.done) {
      btn.setAttribute('disabled', true);
      btn.style.color = 'grey';
    }
  });

  // 长轮询
  function* ajax() {
    yield new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({code: 0});
      }, 200);
    })
  }

  function pull() {
    let get = ajax();
    let step = get.next();
    console.log(step);
    step.value.then(function (res) {
      if (res.code !== 0) {
        setTimeout(function () {
          console.log('wait');
          pull();
        }, 1000);
      } else {
        console.log(res);
      }
    });
  }

  pull();
}