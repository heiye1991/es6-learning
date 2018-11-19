/**
 * created by: heiye1991
 * created time: 2018-11-19
 * description: Set 和 Map 数据结构
 */
// Set数据类型通过new Set()定义
// constructor返回构造函数，默认就是Set函数 size属性获取成员数量
// 方法：add()添加成员，has()是否有某个成员，delete()删除某个成员，clear()清空成员
// 自动去重，没有重复数据
// 向 Set 加入值的时候，不会发生类型转换
// 两个NaN是相等,两个对象总是不相等的
{
  let s = new Set();
  s.add(1);
  s.add(2);
  s.add(2);
  s.add(NaN);
  s.add(NaN);
  s.add({});
  s.add({});
  s.add([]);
  s.add([]);
  s.add('2');
  console.log(s);
  console.log(s.size);
  console.log(s.constructor);
  let s2 = new Set([1, 2, 3, 4, 5, 1, 2, 3]);
  console.log(s2);
  console.log(s2.size);
  console.log(s2.has(2));
  s2.delete(2);
  console.log(s2);
  s2.clear();
  console.log(s2);
}
// Set遍历 Set的遍历顺序就是插入顺序,Set 结构没有键名，只有键值
{
  let set = new Set(['red', 'green', 'blue']);

  for (let item of set.keys()) {
    console.log(item);
  }
  for (let item of set.values()) {
    console.log(item);
  }

  for (let item of set.entries()) {
    console.log(item);
  }
  set.forEach((value, key) => console.log(key + ' : ' + value));

  // Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法
  console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);
  for (let x of set) {
    console.log(x);
  }
  // 从Set转为数组
  console.log([...set]);
  // 数组去重
  let arr = [3, 5, 2, 2, 5, 5];
  let unique = [...new Set(arr)];
  console.log(unique);
}
// WeakSet 的成员只能是对象,可以是null,[],不能是{}，而不能是其他类型的值
// WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
// WeakSet 的成员是不适合引用的，因为它会随时消失
// 方法add(),has(),delete()
{
  console.log(new WeakSet(null));
  console.log(new WeakSet([]));
  // console.log(new WeakSet({}));
  let s3 = new WeakSet();
  let o = {a: 1};
  s3.add(o);
  console.log(s3);
  console.log(s3.has(o));
  s3.delete(o);
  console.log(s3.has(o));
  s3.add([2]);
  console.log(s3);
  console.log(s3.has([2]));
  let s4 = new WeakSet([[1, 2], [3, 4]]); // 数组成员也必须是对象
  console.log(s4);
  // let s5 = new WeakSet([3, 4]);
}
// 通过new Map()定义
// Map 各种类型的值（包括对象）都可以当作键
// constructor返回构造函数，默认就是Map函数 size属性获取成员数量
// 方法：set()添加成员，get()添加成员，has()是否有某个成员，delete()删除某个成员，clear()清空成员
{
  let m1 = new Map();
  let a1 = ['abc'];
  m1.set(a1, '222');
  console.log(m1.get(a1));
  let m2 = new Map([['a', 123], ['b', 456]]);
  console.log(m2);
  console.log(m2.size);
  console.log(m2.constructor);
  console.log(m2.has('a'));
  m2.delete('a');
  console.log(m2);
  m2.clear();
  console.log(m2);
}
// Map遍历 Map的遍历顺序就是插入顺序
{
  let map = new Map([
    ['F', 'no'],
    ['T', 'yes'],
  ]);
  for (let key of map.keys()) {
    console.log(key);
  }
  for (let value of map.values()) {
    console.log(value);
  }
  for (let [key, value] of map.entries()) {
    console.log(key, value);
  }
  console.log(map[Symbol.iterator] === map.entries);
  for (let [key, value] of map) {
    console.log(key, value);
  }
  map.forEach(function (value, key, map) {
    console.log(key, value);
  });
  // Map转为Array
  const myMap = new Map()
    .set(true, 7)
    .set({foo: 3}, ['abc']);
  console.log([...myMap]);
}
// WeakMap只接受对象作为键名，可以是null,[],不能是{}
// WeakMap的键名所指向的对象，不计入垃圾回收机制
// 方法：get()、set()、has()、delete()
{
  console.log(new WeakMap(null));
  console.log(new WeakMap([]));
  // console.log(new WeakMap({}));
  const wm = new WeakMap();
  let key1 = {};
  let obj1 = {foo: 1};
  wm.set(key1, obj1);
  console.log(wm.has(key1));
  obj1 = null;
  console.log(wm.get(key1));
  wm.delete(key1);
  console.log(wm.get(key1));
}
{
  // 数据结构横向对比，增，查，改，删
  let map = new Map();
  let array = [];
  // 增
  map.set('t', 1);
  array.push({t: 1});

  console.info('map-array-add', map, array);

  // 查
  let map_exist = map.has('t');
  let array_exist = array.find(item => item.t);
  console.info('map-array-find', map_exist, array_exist);

  // 改
  map.set('t', 2);
  array.forEach(item => item.t ? item.t = 2 : '');
  console.info('map-array-modify', map, array);

  // 删
  map.delete('t');
  let index = array.findIndex(item => item.t);
  array.splice(index, 1);
  console.info('map-array-empty', map, array);
}

{
  // set和array的对比
  let set = new Set();
  let array = [];
  let obj = {t: 1};

  // 增
  set.add(obj);
  array.push({t: 1});

  console.info('set-array-add', set, array);

  // 查
  let set_exist = set.has(obj);
  let array_exist = array.find(item => item.t);
  console.info('set-array-find', set_exist, array_exist);

  // 改
  set.forEach(item => item.t ? item.t = 2 : '');
  array.forEach(item => item.t ? item.t = 2 : '');
  console.info('set-array-modify', set, array);

  // 删
  set.forEach(item => item.t ? set.delete(item) : '');
  let index = array.findIndex(item => item.t);
  array.splice(index, 1);
  console.info('set-array-empty', set, array);
}

{
  // map,set,object对比
  let item = {t: 1};
  let map = new Map();
  let set = new Set();
  let obj = {};

  // 增
  map.set('t', 1);
  set.add(item);
  obj['t'] = 1;

  console.info('map-set-obj-add', obj, map, set);

  // 查
  console.info('map-set-obj-find', {
    map_exist: map.has('t'),
    set_exist: set.has(item),
    obj_exist: 't' in obj
  });

  // 改
  map.set('t', 2);
  item.t = 2;
  obj['t'] = 2;
  console.info('map-set-obj-modify', obj, map, set);

  // 删除
  map.delete('t');
  set.delete(item);
  delete obj['t'];
  console.info('map-set-obj-empty', obj, map, set);
}
