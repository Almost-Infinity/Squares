export function hasClass(el, clazz) {
  return new RegExp(`(^| )(${clazz})($| )`).test(el.className);
}

export function addClass(el, clazz) {
  return (!hasClass(el, clazz)) ? el.className += ` ${clazz}` : false;
}

export function removeClass(el, clazz) {
  return (hasClass(el, clazz)) ? el.className = el.className.split(' ').filter((c) => c !== clazz).join(' ') : false;
}