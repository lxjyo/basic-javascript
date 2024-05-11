Function.prototype.customCall = function (ctx, ...args) {
  if (!ctx || typeof ctx !== 'object') {
    ctx = globalThis;
  }
  const name = Symbol('fn');
  ctx[name] = this;
  const result = ctx[name](...args);
  delete ctx[name];
  return result;
}

Function.prototype.customApply = function(ctx, args = []) {
  if (!ctx || typeof ctx !== 'object') {
    ctx = globalThis;
  }
  const name = Symbol('fn');
  ctx[name] = this;
  const result = ctx[name](...args);
  delete ctx[name];
  return result;
}

Function.prototype.customBind = function(ctx, ...args) {
  if (!ctx || typeof ctx !== 'object') {
    ctx = globalThis;
  }
  const Origin = this;
  function F() {}
  F.prototype = Origin.prototype;

  function ReturnF() {
    return Origin.apply(this instanceof ReturnF ? this : ctx, args.concat(...arguments));
  }
  
  ReturnF.prototype = new F();

  return ReturnF;
}

const name = 'test';
const value = new Date().toLocaleDateString();

function log(value) {
  console.log(this.name, value)
}

const obj = {
  name: 'obj',
}

// log.customCall(null, value);
// log.call(null, value)

// log.customApply(obj, [value]);
// log.apply(obj, [value])
