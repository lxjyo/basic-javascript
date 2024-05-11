/**
 * 
 * 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？

要求：用Promise实现， 三个亮灯函数已经存在：
    function red() {
        console.log('red');
    }
    function green() {
        console.log('green');
    }
    function yellow() {
        console.log('yellow');
    }

**/

function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

function light(fn, time) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        fn();
      }, time);
    });
}

const arr = [green, yellow, red].map((fn, i) => light(fn, (i + 1) * 1000));

function run(arr) {
  let stop = false;
  const execute = (arr) => {
    arr
      .reduce((p, fn) => p.then(() => {
        if (!stop) {
          return fn();
        }
      }), Promise.resolve())
      .then(() => {
        console.log('********again*********');
        if (!stop) {
          execute(arr);
        }
      });
  };
  execute(arr);

  return () => {
    stop = true;
  };
}

const stop = run(arr);

setTimeout(() => {
  stop();
}, 20000);
