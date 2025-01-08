function observeImg() {
  const imgs = document.querySelectorAll("img[data-src]");
  const observer = new IntersectionObserver((entries) => {
    // 回调参数是个数组
    entries.forEach((entry) => {
      // 判断元素是否出现在视口内
      if (entry.isIntersecting) {
        // 设置img的src属性
        entry.target.src = entry.target.dataset.src;
        // 设置src属性后，停止监听
        observer.unobserve(entry.target);
      }
    });
  }, {
    // threshold: 0.2 
  });
  for (let img of imgs) {
    observer.observe(img);
  }
}


observeImg();

