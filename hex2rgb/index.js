function toRGB(arr) {
  return arr.reduce((acc, c, i) => {
    if (i < 2) {
      return `${acc}${Number.parseInt(c, 16).toString(10)}, `;
    }
    return `${acc}${Number.parseInt(c, 16).toString(10)})`;
  }, 'rgb(');
}

function toRGBA(arr) {
  return arr.reduce((acc, c, i) => {
    if (i < 3) {
      return `${acc}${Number.parseInt(c, 16).toString(10)}, `;
    }
    return `${acc}${(Number.parseInt(c, 16) / 255.0).toFixed(2)})`;
  }, 'rgba(');
}

function toHEX(arr) {
  return arr.reduce((acc, c) => {
    return `${acc}${Number.parseInt(c, 10).toString(16).padStart(2, '0')}`;
  }, '#');
}

function toHEXA(arr) {
  return arr.reduce((acc, c, i) => {
    if (i < 3) {
      return `${acc}${Number.parseInt(c, 10).toString(16).padStart(2, '0')}`;
    }
    return `${acc}${Math.round(Number.parseFloat(c) * 255).toString(16).padStart(2, '0')}`;
  }, '#');
}

exports.convert = function(inStr, stripAlpha = false) {
  // Expected input formats for inStr (string):
  // Hex with alpha, will be converted to rgba(),
  // or to rgb() if stripAlpha is true:
  // '#xyza' or '#xxyyzzaa'
  // Hex without alpha, will be converted to rgb():
  // '#xyz' or '#xxyyzz'
  // RGB with alpha, will be converted to hex with alpha,
  // or to hex without alpha if stripAlpha is true:
  // 'rgba(x, y, z, a)'
  // RGB without alpha, will be converted to hex without alpha:
  // 'rgb(x, y, z)'
  //
  // Expected input formats for stripAlpha (boolean):
  // false if alpha is to be preserved (if it exists) - default value
  // true if alpha is to be ignored
  //
  // Returns an object with 2 properties:
  // 'error' will be set to an error message,
  // or null if there was no error
  // 'value' will be set to the converted value, or
  // to the input string if there was an error

  // Return immediately with an error if inStr is not a string or
  // if the start of the string does not match the expected formats
  if (typeof inStr !== 'string' || !/^(#|rgb)/.test(inStr.trim())) {
    return { error: 'Invalid input format.', value: inStr };
  }

  // Remove leading and trailing whitespaces from the input string
  let str = inStr.trim();

  // RegExp patterns for expected inputs
  // hex formats
  const hex1 = new RegExp('^#([0-9a-f])([0-9a-f])([0-9a-f])$');
  const hex2 = new RegExp('^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$');
  const hexa1 = new RegExp('^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])$');
  const hexa2 = new RegExp('^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$');
  // single valid color match expression (0-255) for use in rgb/rgba
  const cval = '25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]';
  // valid alpha match expression for floats in the range (0-1)
  const aval = '1(\\.0+?)?|0|0?(\\.\\d+?)';
  // rgb/rgba formats
  const rgb = new RegExp(`^rgb\\((${cval}) *?, *?(${cval}) *?, *?(${cval}) *?\\)$`);
  const rgba = new RegExp(`^rgba\\((${cval}) *?, *?(${cval}) *?, *?(${cval}) *?, *?(${aval}) *?\\)$`);

  if (hex1.test(str)) {
    return { error: null, value: toRGB(str.match(hex1).slice(1, 4).map(c => `${c}${c}`)) };
  } else if (hex2.test(str)) {
    return { error: null, value: toRGB(str.match(hex2).slice(1, 4)) };
  } else if (hexa1.test(str)) {
    return stripAlpha ?
      { error: null, value: toRGB(str.match(hexa1).slice(1, 4).map(c => `${c}${c}`)) }
      :
      { error: null, value: toRGBA(str.match(hexa1).slice(1, 5).map(c => `${c}${c}`)) };
  } else if (hexa2.test(str)) {
    return stripAlpha ?
      { error: null, value: toRGB(str.match(hexa2).slice(1, 4)) }
      :
      { error: null, value: toRGBA(str.match(hexa2).slice(1, 5)) };
  } else if (rgb.test(str)) {
    return { error: null, value: toHEX(str.match(rgb).slice(1, 4)) };
  } else if (rgba.test(str)) {
    return stripAlpha ?
      { error: null, value: toHEX(str.match(rgba).slice(1, 4)) }
      :
      { error: null, value: toHEXA(str.match(rgba).slice(1, 5)) };
  } else {
    return { error: 'Invalid input format.', value: inStr };
  }
};
