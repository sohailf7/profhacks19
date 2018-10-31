const canvas = new fabric.Canvas("space_animation");

const rect = new fabric.Rect({
  left: 100,
  top: 100,
  width: 20,
  height: 20
});

const space_img = new fabric.Image.fromURL("/assets/img/space.jpg", function (oImg) {
  canvas.add(oImg);
});

canvas.add(rect);
