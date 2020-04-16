/**
 * Checks if a class exists
 *
 * @param {HTMLElement} el HTML element for checking
 * @param {string} clazz Class name
 * @return {boolean} Result
 */
export function hasClass(el, clazz) {
  return new RegExp(`(^| )(${clazz})($| )`).test(el.className);
}

/**
 * Adds new class to HTML element
 *
 * @param {HTMLElement} el HTML element for adding
 * @param {string} clazz New class name
 * @return {string | boolean} Class names includes new class or false if class exists
 */
export function addClass(el, clazz) {
  return (!hasClass(el, clazz)) ? el.className += ` ${clazz}` : false;
}

/**
 * Removes class from HTML element
 *
 * @param {HTMLElement} el HTML element for removing
 * @param {string} clazz Class name
 * @return {string | boolean} Class names w/o passed class or false if class not exists
 */
export function removeClass(el, clazz) {
  return (hasClass(el, clazz)) ? el.className = el.className.split(' ').filter((c) => c !== clazz).join(' ') : false;
}

/**
 * Create dummy canvas with passed width and height
 *
 * @param {number} width Canvas width
 * @param {number} height Canvas height
 * @return {HTMLCanvasElement} Create canvas
 */
export function createDummyCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}