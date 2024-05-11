/**
 * 实现 JSON.parse
 * https://juejin.cn/post/6946022649768181774#heading-34
 */

function parse(value) {
  return eval('(' + value + ')')
}
