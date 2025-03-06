let lasttime = 0
const nextFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    let curtime = +new Date, delay = Math.max(1000 / 60, 1000 / 60 - (curtime - lasttime));
    lasttime = curtime + delay
    return setTimeout(callback, delay)
  };

const cancelFrame = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  clearTimeout;
// t: 当前时间（通常是从动画开始的经过时间）
// b: 起始值（动画的初始状态）
// c: 变化量（目标值 - 起始值，即动画的总变化）
// d: 动画总时长
// 函数的返回值是当前时间对应的动画状态值。
const tween = {
  linear: function (t, b, c, d) { return c * t / d + b; },
  ease: function (t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; },
  'ease-in': function (t, b, c, d) { return c * (t /= d) * t * t + b; },
  'ease-out': function (t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; },
  'ease-in-out': function (t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b; },
  bounce: function (t, b, c, d) { if ((t /= d) < (1 / 2.75)) { return c * (7.5625 * t * t) + b; } else if (t < (2 / 2.75)) { return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b; } else if (t < (2.5 / 2.75)) { return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b; } else { return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b; } }
};
let timer = null
// 元素、动画时长、动画曲线、动画目标值{attr:'x',value:'500'}
function animate(element, duration, easing = 'linear', target) {
  const stime = Date.now();
  cancelFrame(timer);
  ani()
  function ani(){
    const offset = Math.min(duration, Date.now() - stime);
    const s = tween[easing](offset, 0, 1, duration)
    if (offset < duration) {
      element.setAttr({ [target.attr]: target.value * s })
      timer = nextFrame(ani)
    }
  }

}
export default animate