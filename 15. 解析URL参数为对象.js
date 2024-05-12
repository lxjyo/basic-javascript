/**
 * 解析url参数为对象
 */

function parseParams(url) {
  // (?<=y)x  仅当前面是y时匹配x
  const reg = /(?<=\?)(.+)$/g;
  let paramsStr = url.match(reg)[0];
  const hashIndex = paramsStr.indexOf('#');
  paramsStr = hashIndex > -1 ? paramsStr.slice(0, hashIndex) : paramsStr;
  const paramsArr = paramsStr.split('&');
  return paramsArr.reduce((p, c) => {
    let [key, value] = c.split('=');
    value = decodeURIComponent(value);
    if (p.hasOwnProperty(key)) {
      p[key] = [].concat(p[key], value);
    } else {
      p[key] = value;
    }
    return p;
  }, {});
}

const address =
  'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%20mdn&fenlei=256&rsv_pq=0xdcbd15360012ee2b&rsv_t=f90aeoihw7td2jI0w4BxkNX4p0EiS2P0gKYeF3ueLfUoMr1L49sCzODWS4fJ&rqlang=en&rsv_dl=tb&rsv_enter=1&rsv_sug3=32&rsv_sug1=40&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&prefixsug=%25E6%25AD%25A3%25E5%2588%2599%25E8%25A1%25A8%25E8%25BE%25BE%25E5%25BC%258F%2520mdn&rsp=7&inputT=9765&rsv_sug4=9764#456';

const result = parseParams(address);
const url = new URLSearchParams(address);
console.log(result, url);

