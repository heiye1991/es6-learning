/**
 * created by: heiye1991
 * created time: 2018-11-19
 * description: 数组扩展
 */
// ...扩展运算符
{
  console.log(1, ...[2, 3, 4], 5);
  console.log([...[], 1]);
}
// Array.of方法用于将一组值，转换为数组
{
  console.log(Array.of(1, 2, 3));
  console.log(Array.of(1));
  console.log(Array.of());
}
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象
// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
{
  let obj = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
  };
  // es5
  console.log([].slice.call(obj));
  // es6
  console.log(Array.from(obj));
  console.log(Array.from([1, 2, 3], (x) => x * x));
}
// fill方法使用给定值，填充一个数组
{
  console.log([1, 2, 3].fill(7));
  console.log([1, 2, 3].fill(7, 2));
  console.log([1, 2, 3].fill(7, 1, 3));
}
// entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
{
  for (let index of [1, 2, 3].keys()) {
    console.log(index);
  }
  for (let value of [1, 2, 3].values()) {
    console.log(value);
  }
  for (let [index, value] of [1, 2, 3].entries()) {
    console.log(index, value);
  }
}
// includes()方法返回一个布尔值，表示某个数组是否包含给定的值
{
  console.log([1, 2, 3, 4].includes(1));
  console.log([1, 2, 3, 4].includes(1, 1));
  console.log([1, 2, 3, 4].includes(1, -2));
  console.log([1, 2, 3, 4].includes(1, -5)); // 第二个参数超出数组长度置为0
  console.log([1, 2, 3, NaN].indexOf(NaN)); // es5 indexOf不能正确识别判断是否包含NaN
  console.log([1, 2, 3, NaN].includes(NaN)); // es6includes可以
}
// flat()用于将嵌套的数组“拉平”，变成一维的数组,该方法返回一个新数组，对原数据没有影响.默认为1，flat()方法会跳过空位
// flatMap()方法对原数组的每个成员执行一个函数，然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组,flatMap()只能展开一层数组
{
  console.log([1, 2, , 4, 5].flat());
  console.log([1, 2, 3, 4, 5].flat());
  console.log([1, 2, [3, [4, 5]]].flat());
  console.log([1, 2, [3, [4, 5]]].flat(2));
  console.log([1, 2, [3, [4, 5]]].flat(Infinity)); // 不管有多少层嵌套，都要转成一维数组
  console.log([2, 3, 4].flatMap((x) => [x, x * 2]));
  console.log([2, 3, 4].flatMap((x) => [[x, x * 2]]));
}
// copyWithin方法,在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组,会修改当前数组
{
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 5));
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, -7));
  console.log([1, 2, 3, 4, 5].copyWithin(0, 2, -2));
  console.log([1, 2, 3, 4, 5].copyWithin(0, -4, -2));
}
// find()和findIndex()
{
  console.log([1, 2, 3, 4, 5, 6].find((n) => n > 3)); // 找出第一个符合条件的数组成员
  console.log([1, 2, 3, 4, 5, 6].find((n) => n > 10)); // 没找到返回undefined
  // find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组
  console.log([1, 2, 3, 4].find(function (value, index, arr) {
    console.log(value, index, arr);
    return value > 10;
  }));
  console.log([1, 2, 3, 4, 5, 6].findIndex((n) => n > 3)); // 找出第一个符合条件的数组成员的位置
  console.log([1, 2, 3, 4, 5, 6].findIndex((n) => n > 10)); // 没找到返回-1
}
// 数组空位处理
// ES6 明确将空位转为undefined