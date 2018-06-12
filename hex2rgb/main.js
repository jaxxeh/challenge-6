const hex2rgb = require('./index');
// valid
console.log(hex2rgb.convert('#fbb'));
console.log(hex2rgb.convert('#fbb2'));
console.log(hex2rgb.convert('#fc327d'));
console.log(hex2rgb.convert('#fc327d78'));
console.log(hex2rgb.convert('rgb(234, 5, 67)'));
console.log(hex2rgb.convert('rgba(4, 65, 167, 0.3)'));
// not valid
console.log(hex2rgb.convert('#fc32d'));
console.log(hex2rgb.convert('rgb(234, 5)'));
console.log(hex2rgb.convert(456));
console.log(hex2rgb.convert('red'));
