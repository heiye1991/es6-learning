/**
 * created by: heiye1991
 * created time: 2018-11-20
 * description: class 类
 */
{
  // 类的定义
  // 类不存在变量提升
  class Person {
    // 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加
    // constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象
    constructor(name = 'meimei') {
      this.name = name;
    }

    // 公共方法
    pe() {
      return 22;
    }

    // 静态方法 该方法不会被实例继承，而是直接通过类来调用
    static say() {
      return 'hello';
    }

    // get 方法
    get prop() {
      return 'getter';
    }

    // set方法
    set prop(value) {
      console.log(value);
    }
  }

  // 类的实例
  // console.log(Person());  // 类必须使用new调用，否则会报错
  let per = new Person('lili');
  let per2 = new Person('hanhan');
  console.log(per.name);
  console.log(per.__proto__ === per2.__proto__); // 类的所有实例共享一个原型对象   使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例

  console.log(Person.say());  // 静态方法不能被实例继承，可以被父类调用
  // console.log(per.say());  // 在实例上调用静态方法，会抛出一个错误，表示不存在该方法

  // get set
  console.log(per.prop);
  per.prop = 555;

  // 类的name属性
  console.log(Person.name);
  // 类的数据类型
  console.log(typeof Person);
  // 类本身就指向构造函数
  console.log(Person === Person.prototype.constructor);
  // 在类的实例上面调用方法，就是调用原型上的方法
  console.log(per.constructor === Person.prototype.constructor);
  // 类的内部所有定义的方法，都是不可枚举的
  console.log(Object.keys(Person.prototype));
  console.log(Object.getOwnPropertyNames(Person.prototype));

  // 类的静态属性
  // Class 内部只有静态方法，没有静态属性
  Person.age = 3;
  console.log(Person.age);
  console.log(Person.constructor);

  // class 表达式
  // 左边的才是类名
  // 右边的类名只在 Class 的内部代码可用，指代当前类
  const MyClass = class Me {
    constructor(name) {
      this.name = name;
    }

    getClassName() {
      return Me.name;
    }
  };
  let inst = new MyClass();
  console.log(inst.getClassName());
  // Me.name; // 报错

  // 类的继承
  class Child extends Person {

  }

  let pep = new Person();
  let chi = new Child();
  console.log(pep, chi);

  console.log(Child.__proto__ === Person); // 子类的__proto__属性，表示构造函数的继承，总是指向父类
  console.log(Child.prototype.__proto__ === Person.prototype); // 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
  console.log(Person.__proto__ === Function.prototype); // 基类（即不存在任何继承）是一个普通函数，直接继承Function.prototype
  console.log(Person.prototype.__proto__ === Object.prototype); // 基类（即不存在任何继承）的prototype.__proto__指向构造函数（Object）的prototype属性
  console.log(chi.__proto__.__proto__ === pep.__proto__); // 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性  通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为

  // 类的继承并实例传参以及添加新属性
  class Child2 extends Person {
    constructor(name = 'sangsang', age = 30) {
      super(name);
      console.log(super.pe());
      this.age = age;      // 要放在super之后，否则报错
    }
  }

  console.log(new Person(), new Child2('jack', 50));
  console.log(Object.getPrototypeOf(Child2) === Person); // Object.getPrototypeOf方法可以用来从子类上获取父类，判断一个类是否继承了另一个类
  console.log(Child.say());// 父类的静态方法可以被继承
}
{
  // new.target属性，一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined
  class Rectangle {
    constructor(length, width) {
      console.log(new.target);
      this.length = length;
      this.width = width;
    }
  }

  // Class 内部调用new.target，返回当前 Class
  let obj = new Rectangle(3, 4);

  class Square extends Rectangle {
    constructor(length) {
      super(length, length);
    }
  }

  // 子类继承父类时，new.target会返回子类
  let chiObj = new Square(3);

  // 不能独立使用、必须继承后才能使用的类
  class Shape {
    constructor() {
      if (new.target === Shape) {
        throw new Error('本类不能实例化');
      }
    }
  }

  class Rect extends Shape {
    constructor(length, width) {
      super();
    }
  }

  // let x = new Shape();  // 报错
  let y = new Rect(3, 4);  // 正确
}