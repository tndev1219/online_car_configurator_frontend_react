function PaintTarget(modelScene, targetObj) {

  var self = this;

  this.modelScene = modelScene;

  this.root = document.createElement('div');
  this.root.style.position = 'absolute';
  this.root.style.top = -1000;
  this.root.style.left = -1000;
  this.root.classList.add('body-color-target');


  var dot_ext = document.createElement('span');
  dot_ext.classList.add('dot-ext');
  this.root.appendChild(dot_ext);


  this.dot_int = document.createElement('span');
  this.dot_int.classList.add('dot-int');
  this.root.appendChild(this.dot_int);

  this.comment = document.createElement('span');
  this.comment.innerText = targetObj.partName;
  this.comment.classList.add('comment');
  $(this.comment).hide();
  this.root.appendChild(this.comment);


  this.container = document.getElementById("canvas-container");
  this.container.appendChild(this.root);

  this.parent = targetObj;
  this.position = new THREE.Vector3(0, 0, 0);

  this.hover = false;


  this.root.addEventListener("mouseenter", function (event) {
    //Show comment
    if (!self.hover) {
      self.dot_int.classList.add('dot-int-hover');
      self.onShowComment();
    }

  })

  this.root.addEventListener("mouseleave", function (event) {
    if (self.hover) {
      self.dot_int.classList.remove('dot-int-hover');
      self.onHideComment();
      self.hover = false;

    }
  })


  this.root.addEventListener("click", function (event) {
    //Show color picker
    self.modelScene.selectedBodyPart = self.parent;
    self.onShowColorPicker();
  })

}


PaintTarget.prototype.setParent = function (threejsobj) {
  this.parent = threejsobj;
}

PaintTarget.prototype.updatePosition = function (camera) {
  if (this.parent) {

    var position = new THREE.Vector3();
    position.setFromMatrixPosition(this.parent.matrixWorld);

    var pos = new THREE.Vector3(position.x, position.y, position.z);
    this.position.copy(pos);
  }

  var coords2d = this.get2DCoords(camera);
  this.root.style.left = coords2d.x - this.root.offsetWidth / 2 + 'px';
  this.root.style.top = coords2d.y - this.root.offsetHeight + 'px';


}

PaintTarget.prototype.get2DCoords = function (camera) {
  var vector = this.position.project(camera);
  vector.x = (vector.x + 1) / 2 * this.container.offsetWidth;
  vector.y = -(vector.y - 1) / 2 * this.container.offsetHeight;
  return vector;
}

PaintTarget.prototype.onShowComment = function () {

  var self = this;
  var comment = this.comment;
  $(comment).show();

  comment.classList.add('animated', 'fadeInLeft')

  function handleAnimationEnd() {
    comment.classList.remove('animated', 'fadeInLeft')
    comment.removeEventListener('animationend', handleAnimationEnd)

    self.hover = true;

    if (typeof callback === 'function') callback()
  }

  comment.addEventListener('animationend', handleAnimationEnd)
}

PaintTarget.prototype.onHideComment = function () {

  var comment = this.comment;

  comment.classList.add('animated', 'fadeOutLeft')

  function handleAnimationEnd() {
    comment.classList.remove('animated', 'fadeOutLeft')
    comment.removeEventListener('animationend', handleAnimationEnd)

    $(comment).hide();

    if (typeof callback === 'function') callback()
  }

  comment.addEventListener('animationend', handleAnimationEnd)
}

PaintTarget.prototype.onShowColorPicker = function () {

  //Show color picker
  g_ColorPicker.show();

  //Animation
  g_ColorPicker.get(0).classList.add('animated', 'zoomIn')

  function handleAnimationEnd() {
    g_ColorPicker.get(0).classList.remove('animated', 'zoomIn')
    g_ColorPicker.get(0).removeEventListener('animationend', handleAnimationEnd)

    if (typeof callback === 'function') callback()
  }

  g_ColorPicker.get(0).addEventListener('animationend', handleAnimationEnd)



  //Init picker
  g_ColorPicker.colorwheel(
    'init',
    ['010101',
      'e5e5e5',
      'b5b5b5',
      '170e3e',
      '031E6C',
      '023A81',
      '1D305F',
      '2A362F',
      '024300',
      '71301f',
      '620303',
      '361800',
      '484C4D',
      '200E00'],
    g_ColorPicker
  );

}

// ['010101',
//       'e5e5e5',
//       'b5b5b5',
//       '170e3e',
//       '1f2267',
//       '3654a9',
//       '536591',
//       '1d3025',
//       '1d931a',
//       '71301f',
//       'ac111a',
//       '5d422d',
//       '49595b',
//       'd86408'],

// ['010101',
//       'e5e5e5',
//       'b5b5b5',
//       '170e3e',
//       '031E6C',
//       '023A81',
//       '1D305F',
//       '2A362F',
//       '024300',
//       '71301f',
//       '620303',
//       '361800',
//       '484C4D',
//       '200E00'],