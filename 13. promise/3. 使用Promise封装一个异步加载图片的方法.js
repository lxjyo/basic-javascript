
function loadImg(url) {
  // 安全性检查：判断url是否为空或格式不正确
  if (!url || typeof url !== 'string' || !/^https?:\/\/\w+(\.\w+)*\/\S*$/.test(url)) {
    return Promise.reject(new Error('Invalid URL'));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // 使用箭头函数简化函数声明
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load image at ${url}`));
    
    // 设置跨域属性，以应对跨域请求被阻止的情况（视具体需求而定）
    img.setAttribute('crossOrigin', 'anonymous');

    img.src = url;
  });
}