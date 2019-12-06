function PaintTarget(modelScene, targetObj) {

  this.modelScene = modelScene;
  this.partName = targetObj.partName;

  this.root = document.createElement('div');
  this.root.style.position = 'absolute';
  this.root.style.top = -1000;
  this.root.style.left = -1000;
  this.root.classList.add('body-color-target');
  jQuery(this.root).hide();

  var dot_ext = document.createElement('span');
  dot_ext.classList.add('dot-ext');
  this.root.appendChild(dot_ext);

  this.dot_int = document.createElement('span');
  this.dot_int.classList.add('dot-int');
  this.root.appendChild(this.dot_int);

  this.comment = document.createElement('span');
  this.comment.innerText = this.partName;
  this.comment.classList.add('comment');
  jQuery(this.comment).hide();
  this.root.appendChild(this.comment);

  this.container = document.getElementById("canvas-container");
  this.container.appendChild(this.root);

  this.parent = targetObj;
  this.position = new THREE.Vector3(0, 0, 0);

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

PaintTarget.prototype.fadeShow = function () {

  var self = this;

  $(self.root).show();
  $(self.comment).hide();

  self.root.classList.remove('animated', 'zoomIn')
  self.root.classList.remove('animated', 'zoomOut')
  self.comment.classList.remove('animated', 'fadeInLeft')
  self.comment.classList.remove('animated', 'fadeOutLeft')

  self.root.classList.add('animated', 'zoomIn')

  function handleAnimationEnd() {
    $(self.root).show();
    self.root.classList.remove('animated', 'zoomIn');
    self.root.removeEventListener('animationend', handleAnimationEnd)

    //Show comment
    $(self.comment).show();

    self.comment.classList.add('animated', 'fadeInLeft')
    function haEnd() {
      $(self.comment).show();
      $(self.root).show();

      self.comment.classList.remove('animated', 'fadeInLeft')
      self.comment.removeEventListener('animationend', haEnd)
    }
    self.comment.addEventListener('animationend', haEnd)
    ///

  }

  self.root.addEventListener('animationend', handleAnimationEnd)
}

PaintTarget.prototype.fadeHide = function () {
  var self = this;

  $(self.comment).hide();
  $(self.root).hide();
  
}
