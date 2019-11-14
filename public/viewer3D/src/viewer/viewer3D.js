// Viewer --------------------------------------------------------
/* exported Viewer */
var g_pixelRatio = window.devicePixelRatio || 1;
var g_clock;

var g_CanvasContainer;
var g_LoadingContainer;
var g_ColorPicker;

function Viewer3D() {
  g_clock = new THREE.Clock();
  //canvas container
  g_CanvasContainer = $('#canvas-container');
  //loading
  g_LoadingContainer = $('#loading-container');

  

  this.assetLoader = new AssetLoader();
}

Viewer3D.prototype.loadEnvAndVehicleAsset = function (url) {
  this.assetLoader.loadEnvAndVehicle(url);
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


