/**
 * created by: heiye1991
 * created time: 2018-11-18
 * description: 字符串的扩展
 */

// Unicode表示法，可以识别码点在\u0000~\uFFFF之间的字符
{
  console.log('\u0061'); // es5可以识别码点在\u0000~\uFFFF之间的字符
  console.log('\uD842\uDFB7'); // 两个双字节的形式表示码点大于0xFFFF的字符
  console.log('\u20BB7'); // es5不能正确识别码点大于0xFFFF的字符
  console.log('\u{20BB7}'); // es6可以正确识别
}
// codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符十进制的码点
// codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法
{
  // charAt()，charCodeAt()不能正确处理码点大于0xFFFF的字符
  let s = '𠮷';
  console.log(s.length, s.charAt(0), s.charAt(1), s.charCodeAt(0), s.charCodeAt(1), s.codePointAt(0), s.codePointAt(1));
  // codePointAt()可以正确处理码点大于0xFFFF的字符
  let s1 = '𠮷a';
  console.log(s1.length, s1.codePointAt(0), s1.codePointAt(1), s1.codePointAt(2));
  console.log(s1.length, s1.codePointAt(0).toString(16), s1.codePointAt(1).toString(16), s1.codePointAt(2).toString(16));

  function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
  }

  console.log(is32Bit("𠮷"));
  console.log(is32Bit("a"));
}

// String.fromCodePoint 可以识别大于0xFFFF的字符,从码点返回对应字符
{
  console.log(String.fromCharCode(0x20BB7)); // es5不能正确识别
  console.log(String.fromCodePoint(0x20BB7)); // es6能正确识别
}
//ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化
{
  console.log('\u01D1' === '\u004F\u030C');
  console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize());
}
// for...of循环，会正确识别 32 位的 UTF-16 字符
{
  let s = '𠮷a';
  // es5 for
  for (let i = 0; i < s.length; i++) {
    console.log(s[i].codePointAt(0).toString(16));
  }
  // es6 for of
  for (let ch of s) {
    console.log(ch.codePointAt(0).toString(16));
  }
}
// includes() 返回布尔值，表示是否找到了参数字符串
// startsWith() 返回布尔值，表示参数字符串是否在原字符串的头部
// endsWith() 返回布尔值，表示参数字符串是否在原字符串的尾部
// 使用第二个参数n时 endsWith 针对前n个字符,startsWith和endsWith从第n个位置直到字符串结束
{
  let str = 'stringsWorld';
  console.log(str.indexOf('r'));
  console.log(str.includes('r'), str.includes('r', 6));
  console.log(str.startsWith('s'), str.startsWith('s', 6));
  console.log(str.endsWith('d'), str.endsWith('g', 6));
}
// repeat方法返回一个新字符串，表示将原字符串重复n次
// 参数如果是小数，会被取整
// 参数是 0 到-1 之间的小数，则等同于 0
// 参数NaN等同于 0
// 参数是负数或者Infinity 报错
{
  let str = 'abc';
  console.log(str.repeat(2));
  console.log(str.repeat(2.9));
  console.log(str.repeat(-0.5));
  console.log(str.repeat(NaN));
  // console.log(str.repeat(-1));
  // console.log(str.repeat(Infinity));
}
// padStart()，padEnd() ES2017 字符串补全长度的功能,padStart()用于头部补全，padEnd()用于尾部补全
// 两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串
{
  let str = 'abc';
  // 大于原字符串长度
  console.log(str.padStart(5, 'x'));
  console.log(str.padEnd(5, 'y'));
  // 小于等于原字符串长度
  console.log(str.padStart(3, 'x'));
  console.log(str.padEnd(3, 'y'));
}
// 模板字符串
{
  let name = 'list';
  let info = 'hello world';
  let m = `I am ${name} say ${info}`;
  console.log(m);
}
// 标签模板
// “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容
// “标签模板”的一个应用,多语言转换（国际化处理）
{
  let user = {
    name: 'list',
    info: 'hello world'
  };

  function abc(s, v1, v2) {
    console.log(s.length, s[0], s[1], s[2], v1, v2);
  }

  abc`I am ${user.name} say ${user.info}`
}
// String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串
// String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用
{
  console.log(`Hi\n${2 + 3}!`); // es5 没有转义换行
  console.log(String.raw`Hi\n${2 + 3}!`);
  console.log(String.raw`Hi\u000A!`);
  console.log(String.raw`Hi\\n`);
  // String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组
  console.log(String.raw({raw: 'test'}, 1, 2, 3, 4));
}