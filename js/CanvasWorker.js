window.CanvasWorker = class CanvasWorker {
  constructor(canvas, domElement) {
    this.canvas = canvas;
    this.contex = canvas.getContext("2d");
    this.domElement = domElement;
    this.undos = [];
    this.config = {
      lineWidth: 10,
      lineCap: "round",
      color: "#000000",
      paint: true,
      erasor: false,
      down: false,
    };
    this.pos = {
      x: 0,
      y: 0,
      set(x, y) {
        this.x = x;
        this.y = y;
        return this;
      },
    };
    domElement.addEventListener("resize", () => this.updateSize());
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mousedown", (e) => this.down(e));
    this.canvas.addEventListener("mouseup", (e) => this.up(e));
  }
  draw(e) {
    var position = this.pos.set(e.clientX, e.clientY - 39);
    if (this.config.down && this.config.paint) {
      this.contex.lineWidth = this.config.lineWidth;
      this.contex.lineCap = this.config.lineCap;
      this.contex.strokeStyle = this.config.color;
      this.contex.lineTo(position.x, position.y);
      this.contex.stroke();
      this.contex.beginPath();
      this.contex.moveTo(this.pos.x, this.pos.y);
    }
  }
  updateSize() {
    this.canvas.height = domElement.clientHeight;
    this.canvas.width = domElement.clientWidth;
  }
  up(e) {
    this.config.down = false;
    this.contex.beginPath();
    this.undos.push({
      x: e.clientX,
      y: e.clientY - 39,
      size: this.config.lineWidth,
      color: this.config.color,
      mode: "draw",
    });
  }
  undo() {
    // remove the last drawn point from the drawing array
    var lastPoint = this.redos[this.redos.length - 1];
    this.redrawAll();
    delete this.redos[this.redos.length - 1];
    this.redos = this.redos.filter((r) => r);
  }
  redrawAll() {
    var points = this.redos;
    var ctx = this.contex;
    if (points.length == 0) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i in points) {
      var pt = points[i];
      var begin = false;
      if (ctx.lineWidth != pt.size) {
        ctx.lineWidth = pt.size;
        begin = true;
      }
      if (ctx.strokeStyle != pt.color) {
        ctx.strokeStyle = pt.color;
        begin = true;
      }
      if (pt.mode == "begin" || begin) {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
      }
      ctx.lineTo(pt.x, pt.y);
      if (pt.mode == "end" || i == points.length - 1) {
        ctx.stroke();
      }
    }
    ctx.stroke();
  }
  down(e) {
    this.config.down = true;
    this.draw(e);
  }
  appendImage(src, width, height) {
    var image = new Image();
    image.src = src;
    context.drawImage(image, width, height);
  }
};
