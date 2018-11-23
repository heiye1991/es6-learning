/**
 * created by: heiye1991
 * created time: 2018-11-23
 * description: Module---import
 *    import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同，可以使用as重命名
 *    import命令输入的变量都是只读的，不能修改，如果是对象，可以改写其属性，但是不建议
 *    import命令具有提升效果，会提升到整个模块的头部，首先执行
 *    import是静态执行，不能使用表达式和变量
 *    import语句会执行所加载的模块 重复执行同一句import语句，那么只会执行一次
 */
// import 写法
// 加载执行但不输入任何值
import "./lesson-export";
// 加载一个
import {ex1} from "./lesson-export";
// 加载多个 as 重命名
import {ex2, ex4 as im1} from "./lesson-export";
// 用整体加载 * as 不用使用{}
import * as im2 from "./lesson-export";

im1.name = 'wang';
im2.ex4.name = 'wang';
console.log(im1);
console.log(im2);

// 加载函数
import {multiply} from './lesson-export';

console.log(multiply(1, 2));

// 加载类
import {Person} from './lesson-export';

console.log(new Person());

// import命令可以为export default的默认输出指定任意名字 可以不使用{}
import customName1 from './lesson-export';

customName1();
// 同时输入默认方法和其他接口
import customName2, {ex5} from './lesson-export';

customName2();

// 在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起
// 写成一行 相当于对外转发了这两个变量，导致当前模块不能直接使用
export {ex7, ex8} from './lesson-export';
// 改名
export {ex9 as ex6} from './lesson-export';
// 具名改为默认
export {ex10 as default} from './lesson-export';
// 整体
export * from './lesson-export';
// 默认
// export { default } from './lesson-export';
// 默认改具名
export {default as ex111} from './lesson-export';