// Viewer --------------------------------------------------------
/* exported Viewer */
var g_pixelRatio = window.devicePixelRatio || 1;
var g_clock;

var g_CanvasContainer;
var g_LoadingContainer;

function Viewer3D() {
  g_clock = new THREE.Clock();
  //canvas container
  g_CanvasContainer = $('#canvas-container');
  //loading
  g_LoadingContainer = $('#loading-container');



  this.assetLoader = new AssetLoader();
}

Viewer3D.prototype.loadEnvAndVehicleAsset = function (url, callback) {
  this.assetLoader.loadEnvAndVehicle(url, callback);
}

Viewer3D.prototype.loadPartialAsset = function (url, type) {
  this.assetLoader.loadGLTFZip(url, type);
}

Viewer3D.prototype.setWheelSize = function (diameter, width) {
  this.assetLoader.modelScene.setWheelSize(diameter, width);
}

Viewer3D.prototype.setTireSize = function (diameter) {
  this.assetLoader.modelScene.setTireSize(diameter);
}

Viewer3D.prototype.setSuspensionSize = function (size) {
  this.assetLoader.modelScene.setSuspensionSize(size);
}

Viewer3D.prototype.setModelColor = function (color, modelType) {
  this.assetLoader.modelScene.setModelColor(color, modelType);
}

Viewer3D.prototype.setBodyColor = function (color, modelType) {
  this.assetLoader.modelScene.setBodyColor(color, modelType);
}

Viewer3D.prototype.setOpacityBodyGlass = function (val) {
  this.assetLoader.modelScene.setOpacityBodyGlass(val);
}

Viewer3D.prototype.showAllBodyAnnotation = function () {
  this.assetLoader.modelScene.showAllBodyAnnotation();
}

Viewer3D.prototype.setHDRI = function (val) {
  this.assetLoader.modelScene.setHDRI(val);
}

Viewer3D.prototype.setWheelDistance = function (val) {
  this.assetLoader.modelScene.setWheelDistance(val);
}


Viewer3D.prototype.hideAllBodyAnnotation = function () {
  this.assetLoader.modelScene.hideAllBodyAnnotation();
}
