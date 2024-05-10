function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getType(null), typeof null); // null object
console.log(getType(undefined), typeof undefined); // undefined undefined
console.log(getType([]), typeof []); // array object
console.log(getType(new Date()), typeof new Date()); // date object