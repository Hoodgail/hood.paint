window.editor = {};
window.editor.canvas = document.createElement("canvas");
window.domElement = document.querySelector("#app");
window.domElement.append(window.editor.canvas);
window.editor.worker = new CanvasWorker(
  window.editor.canvas,
  window.domElement,
);
window.editor.GUI = new window.yagui.GuiMain(window.domElement, () =>
  editor.worker.updateSize(),
); // main gui
window.editor.mouseElement = document.createElement("div");
document.body.append(window.editor.mouseElement);
window.editor.topbar = window.editor.GUI.addTopbar(); // top bar
window.editor.leftbar = window.editor.GUI.addRightSidebar(
  editor.worker.updateSize,
); // right bar

//////////////////////////////
// CODE STARTS HERE
//////////////////////////////

editor.worker.updateSize();
editor.lineMenu = editor.leftbar.addMenu("line"); // menu
editor.lineMenu.addColor(
  "Color",
  util.hexToRgb(editor.worker.config.color),
  (color) => (editor.worker.config.color = util.rgbToHex(color)),
);
editor.lineMenu.addSlider("Width", editor.worker.config.lineWidth, (val) => {
  editor.worker.config.lineWidth = Number(val)
  util.css(editor.mouseElement, {
    height: `${val}px`,
    width: `${val}px`,
  });
}, 0, 500, 1);
editor.lineMenu.addSlider('Cursor Blur' ,2, function(val){
	editor.mouseElement.style.backdropFilter = `blur(${val}px)`;
}, 0, 20, 1);

util.css(domElement, {
  position: "absolute",
});
util.css(editor.mouseElement, {
  position: "absolute",
  height: `${editor.worker.config.lineWidth}px`,
  width: `${editor.worker.config.lineWidth}px`,
  border: "1px solid #0000009e",
  zIndex: 2147483647,
  pointerEvents: "none",
  boxShadow: "0 0 15px #00000057",
  backdropFilter: "blur(2px)",
  background: "#00000029",
  borderRadius: "100%",
});
window.editor.mouseElement.innerHTML = `<div style="background: gold;
    height: 7px;
    position: absolute;
    width: 7px;
    left: 50%;
    top: 50%;
    border-radius: 100%;
    transform: translate(-50%,-50%);"></div>`
function updateMouse(e) {
  var pos = {
    x: window.Event
      ? e.pageX
      : event.clientX +
        (document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft),
    y: window.Event
      ? e.pageY
      : event.clientY +
        (document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop),
  };
  editor.mouseElement.style.transform = `translate(${
    pos.x - editor.worker.config.lineWidth / 2
  }px,${pos.y - editor.worker.config.lineWidth / 2}px)`;
}
document.addEventListener("mousemove", updateMouse);
