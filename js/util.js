window.util = {}
util.css = function(el,css){
	for(var name of Object.keys(css)){
		el.style[name] = css[name]
	}
}
util.hexToRgb = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)] : null;
}
util.rgbToHex = function(color) {
    var rgbClr = [parseInt(color[0] * 255, 10),parseInt(color[1] * 255, 10),parseInt(color[2] * 255, 10)]
    var r = rgbClr[0];
    var g = rgbClr[1];
    var b = rgbClr[2];
    return "#" + (r << 16 | g << 8 | b).toString(16).toUpperCase()
}