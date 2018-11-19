/**
 * created by: heiye1991
 * created time: 2018-11-17
 * description: 正则表达式扩展
 *    编译对一些新增的正则属性和方法不能很好地编译，出现意料外的结果
 */
// RegExp构造函数的拓展
{
  // es5
  let test1 = new RegExp('xyz', 'i');
  let test2 = new RegExp(/xyz/i);
  // es6，后面的修饰符覆盖前面的修饰符
  let test3 = new RegExp(/xyz/i, 'g');
  // ES5 的 source 属性 返回正则表达式的正文
  console.log(test1.source, test2.source, test3.source);
  // ES6 的 flags 属性 返回正则表达式的修饰符
  console.log(test1.flags, test2.flags, test3.flags);
}
// y修饰符
{
  let s = 'ccc_cc_c';
  let r1 = /c+/ig;
  let r2 = /c+/iy;
  console.log(r1.flags, r2.flags);
  // 判断是否有y修饰符
  console.log(r1.sticky, r2.sticky);
  // 后一次匹配都从上一次匹配成功的下一个位置开始，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始
  console.log(r1.exec(s), r2.exec(s));
  console.log(r1.exec(s), r2.exec(s));
}
// u修饰符 用来正确处理大于\uFFFF的 Unicode 字符,会正确处理四个字节的 UTF-16 编码
{
  let s = '\uD83D\uDC2A';
  let r1 = /\uD83D/i;
  let r2 = /\uD83D/iu;
  console.log(r1.flags, r2.flags);
  // 判断是否有u修饰符
  console.log(r1.unicode, r2.unicode);
  // u修饰符将后面的大于\uFFFF的字符当成一个
  console.log(r1.test(s), r2.test(s));
}
// 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
{
  console.log(`\u{20BB7}`);
  let s = '𠮷';
  //// 点字符 对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符
  console.log(/^.$/.test(s));
  console.log(/^.$/u.test(s));
  // 量词
  console.log(/𠮷{2}/.test('𠮷𠮷'));
  console.log(/𠮷{2}/u.test('𠮷𠮷'));
  //ES6 新增了使用大括号表示 Unicode 字符在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词
  console.log(/\u{61}/.test('a'), /\u{61}/u.test('a'));
  //预定义模式
  console.log(/^\S$/.test('𠮷'));
  console.log(/^\S$/u.test('𠮷'));
}
// s修饰符 es2018 解决行终止符的问题
{
  const re = /foo.bar/s;
  console.log(re.flags);
  // 判断是否有s修饰符
  console.log(re.dotAll);
  console.log(re.test('foo\nbar'));
}
// 后行断言 es2018  “后行断言”的实现，需要先匹配/(?<=y)x/的x，然后再回到左边，匹配y的部分
{
  const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
  console.log('$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar'));

  // 后行断言的组匹配，与正常情况下结果是不一样的
  console.log(/(?<=(\d+)(\d+))$/.exec('1053'));
  console.log(/^(\d+)(\d+)$/.exec('1053'));
  // “后行断言”的反斜杠引用，也与通常的顺序相反，必须放在对应的那个括号之前
  console.log(/(?<=(o)d\1)r/.exec('hodor'));
  console.log(/(?<=\1d(o))r/.exec('hodor'));
}
// ES2018 正则表达式 Unicode 转义 引入了一种新的类的写法\p{...}和\P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符
{
  /*const reGreekSymbol = /\p{Script=Greek}/u;
  console.log(regexGreekSymbol.test('π'));*/
}
// ES2018具名组匹配 允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用
{
  const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
  const matchObj = RE_DATE.exec('1999-12-31');
  const year = matchObj.groups.year;
  const month = matchObj.groups.month;
  const day = matchObj.groups.day;
  console.log(matchObj, year, month, day);
  // 解构赋值
  /*let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
  console.log(one,two);*/
  // 字符串替换时，使用$<组名>引用具名组
  /*let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
  '2015-01-02'.replace(re, '$<day>/$<month>/$<year>');*/
  // 在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法
  const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
  console.log(RE_TWICE.test('abc!abc!abc'));
  console.log(RE_TWICE.test('abc!abc!ab'));
}