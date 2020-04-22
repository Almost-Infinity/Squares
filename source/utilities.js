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

/**
 * Change color brightness
 *
 * @param {number} hex Hex color
 * @param {number} factor Float factor. > 0 - darker, < 0 - lighter
 * @returns {string} Modified hex color
 */
export function brightness(hex, factor) {
  hex = parseInt(hex, 16);

  const r = ((hex >> 16) & 255) * factor;
  const g = ((hex >> 8) & 255) * factor;
  const b = (hex & 255) * factor;

  return (b | (g << 8) | (r << 16)).toString(16);
}

/**
 * Combine classes into a single string
 *
 * @param  {...any} cns Classlist
 * @returns {string} Class list
 */
export function cn(...cns) {
  return cns.reduce((acc, curr) => `${acc} ${curr}`);
}