/**
 * 实现字符串模版方法
 * `c ${name} ${age}`
 */

function templateStr(template, data) {
  return template.replace(/\$\{(\w+)\}/g, (match, key) => data[key])
}

console.log(templateStr('c ${name} ${age}', { name: 'zhangsan', age: 18 }))

const name = 'zhangsan'
const age = 18
console.log(`c ${name} ${age}`)