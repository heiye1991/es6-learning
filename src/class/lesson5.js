/**
 * created by: heiye1991
 * created time: 2018-11-19
 * description: 数值扩展
 */
// 二进制0B或者0b，八进制0O或者0o
{
  console.log(0b1101010);
  console.log(0o737);
}
// Number.isFinite()，Number.isNaN()
// Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false
{
  // es5的全局方法isFinite()和isNaN()先调用Number()将非数值的值转为数值，再进行判断
  console.log(isFinite(25));
  console.log(isFinite('25'));
  console.log(Number.isFinite(Infinity));
  console.log(Number.isFinite(-Infinity));
  console.log(Number.isFinite(NaN));
  console.log(Number.isFinite(8));
  console.log(Number.isFinite('8'));
  console.log(isNaN(NaN));
  console.log(isNaN("NaN"));
  console.log(Number.isNaN(NaN));
  console.log(Number.isNaN('NaN'));
  console.log(Number.isNaN(1 + '22'));
  console.log(Number.isNaN(1 / 'a'));
}
// Number.parseInt(), Number.parseFloat(),和es5的parseInt()和parseFloat()功能一样
{
  console.log(parseInt('12.34'));
  console.log(parseFloat('123.45#'));
  console.log(Number.parseInt('12.34'));
  console.log(Number.parseFloat('123.45#'));
}
// Number.isInteger()用来判断一个数值是否为整数
// 参数不是数值，Number.isInteger返回false
// 如果数值精度超过JavaScript的规定，会误判
{
  console.log(Number.isInteger(25));
  console.log(Number.isInteger(25.0));
  console.log(Number.isInteger(25.1));
  console.log(Number.isInteger('25'));
  console.log(Number.isInteger(NaN));
  console.log(Number.isInteger(Infinity));
}
// 安全整数和 Number.isSafeInteger()
// JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值,Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内
{
  console.log(Number.MAX_SAFE_INTEGER);
  console.log(Number.MIN_SAFE_INTEGER);
  console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1));
  console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER));
  console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
  console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
  console.log(Number.isSafeInteger(8));
  console.log(Number.isSafeInteger(8.1));
  console.log(Number.isSafeInteger('8'));
  console.log(Number.isSafeInteger(Infinity));
  console.log(Number.isSafeInteger(NaN));
}
// Number.EPSILON实际上是 JavaScript 能够表示的最小精度
{
  console.log(Number.EPSILON);
}
// MATH 扩展方法,非数值自动调用Number方法将其先转为数值
{
  // Math.trunc方法用于去除一个数的小数部分，返回整数部分
  console.log(Math.trunc(5.9));
  console.log(Math.trunc(-5.9));
  console.log(Math.trunc('5.99'));
  console.log(Math.trunc('hello'));
  // Math.sign方法用来判断一个数到底是正数、负数、还是零
  console.log(Math.sign(10));
  console.log(Math.sign(-10));
  console.log(Math.sign(0));
  console.log(Math.sign('50'));
  console.log(Math.sign('hello'));
  // Math.cbrt方法用于计算一个数的立方根
  console.log(Math.cbrt(-1));
  console.log(Math.cbrt(8));
  console.log(Math.cbrt('8'));
  console.log(Math.cbrt('hello'));
  // Math.clz32方法返回一个数的 32 位无符号整数形式有多少个前导 0,对于小数只考虑整数部分。对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算
  console.log(Math.clz32(1000));
  console.log(Math.clz32(NaN));
  console.log(Math.clz32('hello'));
  // Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数,Math.imul方法可以返回正确的低位数值
  console.log((0x7fffffff * 0x7fffffff) | 0);
  console.log(Math.imul(0x7fffffff, 0x7fffffff));
  // Math.fround方法返回一个数的32位单精度浮点数形式,Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数
  console.log(Math.fround(1.125));
  console.log(Math.fround(0.3));
  console.log(Math.fround(NaN));
  console.log(Math.fround(Infinity));
  console.log(Math.fround('hello'));
  // ath.hypot方法返回所有参数的平方和的平方根
  console.log(Math.hypot(3, 4));
  console.log(Math.hypot('3', 4));
  console.log(Math.hypot('hello', 4));
  // Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1
  console.log(Math.expm1(2));
  // Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN
  console.log(Math.log1p(2));
  console.log(Math.log1p('2'));
  console.log(Math.log1p(-2));
  // Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN
  console.log(Math.log10(2));
  console.log(Math.log10('2'));
  console.log(Math.log10(-2));
  // Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN
  console.log(Math.log2(2));
  console.log(Math.log2('2'));
  console.log(Math.log2(-2));
  // Math.sinh(x) 返回x的双曲正弦，Math.cosh(x) 返回x的双曲余弦，Math.tanh(x) 返回x的双曲正切，Math.asinh(x) 返回x的反双曲正弦，Math.acosh(x) 返回x的反双曲余弦，Math.atanh(x) 返回x的反双曲正切
}
// 指数运算符**,从右开始计算
{
  console.log(3 ** 3);
  console.log(2 ** 3 ** 3);
}