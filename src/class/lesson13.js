/**
 * created by: heiye1991
 * created time: 2018-11-21
 * description: Promise
 */
{
  // Promise的实例
  // Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功，多用resolved）和rejected（已失败）
  function promise(value) {
    return new Promise((resolve, reject) => {
      if (value > 5) {
        resolve(value);
      } else {
        reject(new Error('fail'))
      }
    });
  }

  // Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数，then方法是定义在原型对象Promise.prototype上的
  promise(8).then(function (res) {
    console.log(res, 'resolved');
  });
  promise(3).then(function (res) {
    console.log(res, 'resolved');
  }, function (err) {
    console.log(err, 'rejected')
  });
  // catch捕获错误，Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数
  // 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法
  // 没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码 Promise 内部有未捕获的错误，会直接终止进程
  promise(3).then(function (res) {
    console.log(res, 'resolved');
  }).catch(function (err) {
    console.log(err);
  });

  // es2018 finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
  promise(3).then(function (res) {
    console.log(res, 'resolved');
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    console.log('finally');
  });
  promise(6).then(function (res) {
    console.log(res, 'resolved');
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    console.log('finally');
  });
}
{
  // Promise.resolve方法将参数转为 Promise 对象
  console.log(Promise.resolve('foo'));
  // 参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例
  let pro = new Promise((resolve, reject) => {
    resolve(90);
  });
  console.log(Promise.resolve(pro));
  // Promise.resolve方法会将thenable对象(具有then方法的对象)转为 Promise 对象，然后就立即执行thenable对象的then方法
  let thenable = {
    then: function (resolve, reject) {
      resolve(42);
    }
  };
  Promise.resolve(thenable).then(function (value) {
    console.log(value);
  });
  // 参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved
  Promise.resolve('Hello').then(function (s) {
    console.log(s);
  });
  // Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象
  console.log(Promise.resolve());
  // 立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时
  setTimeout(function () {
    console.log('three');
  }, 0);
  Promise.resolve().then(function () {
    console.log('two');
  });
  console.log('one');

  // Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected
  // Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数
  console.log(Promise.reject('出错了'));
  console.log(Promise.reject(thenable));
}
{
  // 所有图片加载完再添加到页面
  function loadImgs(src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.style.width = '150px';
      img.src = src;
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function (err) {
        reject(err);
      }
    })
  }

  function showImgs(imgs) {
    imgs.forEach(function (img) {
      document.body.appendChild(img);
    })
  }

  // Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
  // Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例，如果不是，调用Promise.resolve方法转为Promise 实例
  // 只有所有参数的状态都变成resolved，Promise.all()的状态才会变成resolved，此时所有参数的返回值组成一个数组，传递给Promise.all()的回调函数
  // 只要参数之中有一个被rejected，Promise.all()的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给Promise.all()的回调函数
  // 某个参数定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法，未定义catch方法的报错才会触发
  Promise.all([
    loadImgs('http://d.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fa50dc96125381f30e924fc48.jpg'),
    loadImgs('http://d.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fa50dc96125381f30e924fc48.jpg'),
    loadImgs('http://d.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fa50dc96125381f30e924fc48.jpg')
  ]).then(showImgs)

}
{
  // 有一个图片加载完就添加到页面
  function loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.style.width = '150px';
      img.src = src;
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function (err) {
        reject(err);
      }
    })
  }

  function showImg(img) {
    let p = document.createElement('p');
    p.appendChild(img);
    document.body.appendChild(p)
  }

  // Promise.race方法将多个 Promise 实例，包装成一个新的 Promise 实例
  // Promise.race方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例，如果不是，调用Promise.resolve方法转为Promise 实例
  // 只要参数之中有一个实例率先改变状态，Promise.race()的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给Promise.race()的回调函数
  Promise.race([
    loadImg('http://d.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fa50dc96125381f30e924fc48.jpg'),
    loadImg('http://d.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fa50dc96125381f30e924fc48.jpg'),
    loadImg('http://d.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fa50dc96125381f30e924fc48.jpg')
  ]).then(showImg);
}
