/**
 * created by: heiye1991
 * created time: 2018-11-22
 * description: Decorator
 *    修饰器是一个函数
 *    修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升
 *    修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时
 *    修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类
 *    修饰器用于方法，可以接受三个参数，第一个参数是类的原型对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象，
 */
{
  // 修饰类 为类添加一个静态属性
  function testable(target) {
    target.isTestable = true;
  }

  @testable
  class MyTestableClass {
  }

  console.log(MyTestableClass.isTestable);

  // 修饰类 为类添加一个实例属性，通过目标类的prototype对象操作
  function testable2(target) {
    target.prototype.isTestable = true;
  }

  @testable2
  class MyTestableClass2 {
  }

  let obj = new MyTestableClass2();
  console.log(obj.isTestable);

  // 修饰类的方法
  // 打日志
  class Math {
    @log
    add(a, b) {
      return a + b;
    }

    @log
    connect(a, b) {
      return a * b;
    }
  }

  function log(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function () {
      console.log(`Calling ${name} with`, arguments);
      return oldValue.apply(this, arguments);
    };
    return descriptor;
  }

  let math = new Math();
  console.log(math.add(2, 4));
  console.log(math.connect(2, 4));

  // 只读属性
  let readonly = function (target, name, descriptor) {
    descriptor.writable = false;
    return descriptor
  };

  class Test {
    @readonly
    time() {
      return '2018-11-22'
    }
  }

  let test = new Test();
  // 不能修改
  // test.time=function(){
  //   console.log('reset time');
  // };
  console.log(test.time());

  // 如果同一个方法有多个修饰器，会先从外到内进入，然后由内向外执行
  function dec(id) {
    console.log('evaluated', id);
    return (target, property, descriptor) => console.log('executed', id);
  }

  class Example {
    @dec(1)
    @dec(2)
    method() {
    }
  }

  // 要修饰函数，可以采用高阶函数的形式直接执行
  function doSomething(name) {
    console.log('Hello, ' + name);
  }

  function loggingDecorator(wrapped) {
    return function () {
      console.log('Starting');
      let result = wrapped.apply(this, arguments);
      console.log('Finished');
      return result;
    }
  }

  let wrapped = loggingDecorator(doSomething);
  wrapped('es6');

  // 在修饰器的基础上，可以实现Mixin模式
  let Foo = {
    foo() {
      console.log('foo')
    }
  };

  class MyClass {
  }

  Object.assign(MyClass.prototype, Foo);

  let obj2 = new MyClass();
  obj2.foo();

}