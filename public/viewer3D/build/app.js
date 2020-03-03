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

function AssetLoader() {
	var self = this;

	this.vehicleLoad = true;

	this.vehicleModel = null;
	this.partialModel = null;

	this.envData = {
		name: 'scene_00',
		model: null,
		shaderContainers: {},
		textures: {}
	};

	this.modelScene = null;

	this.isEndLoading = false;
	this.isEndLoadingGltfForPartial = false;
	// Assets & Loaders --------------------------------------------------------
	this.loadingManager = new THREE.LoadingManager();
	this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
		// console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
	};
	this.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
		// console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
	};
	this.loadingManager.onLoad = function () {

		if (self.isEndLoading) {
			g_LoadingContainer.hide();

			if (self.vehicleLoad) {
				//Create new scene
				g_CanvasContainer.html('');

				self.modelScene = new ModelScene(self);
				self.modelScene.run();

				self.vehicleLoad = false;
			}
			else {
				//Partial model
				if (self.isEndLoadingGltfForPartial) {
					self.modelScene.addPartialModel(self.partialModel, self.loadModelType);
					self.isEndLoadingGltfForPartial = false;
				}
			}
		}
	};


	this.textureLoader = new THREE.TextureLoader(this.loadingManager);

	this.gltfLoader = new THREE.GLTFLoader(this.loadingManager);

	this.objLoader = new THREE.OBJLoader(this.loadingManager);

	this.zipLoader = new THREE.ZipLoader(this.loadingManager);

	this.rgbLoader = new THREE.RGBELoader(this.loadingManager);

	//Shader loader
	this.shaderLoader = new THREE.FileLoader(this.loadingManager);
	this.shaderLoader.setResponseType('text');
	this.shaderLoader.loadMultiple = function (shaderContainer, urls) {
		_.each(urls, function (value, key) {
			self.shaderLoader.load(value, function (shader) {
				shaderContainer[key] = shader;
			});

		});

	};

	this.shaderLoader.loadMultiple(this.envData.shaderContainers, {
		reflectVert: 'viewer3D/shaders/reflect.vert',
		reflectFrag: 'viewer3D/shaders/reflect.frag',
		reflect2Frag: 'viewer3D/shaders/reflect2.frag',
	});


	this.loadModelType = "";
}

AssetLoader.prototype.loadEnvAndVehicle = function (url, callback) {
	this.loadEnvMap('VeniceSunset');
	this.loadGLTFZip(url, 'Vehicle', callback);
}

AssetLoader.prototype.loadGLTF = function (url, callback) {
	var self = this;

	this.gltfLoader.load(url, function (model) {
		if (self.vehicleLoad) {
			self.vehicleModel = model.scene.children[0].children[0].children[0].children[0];

			//------------------------------------------------------------------------------------------------------------------------------------
			//Parse Vehicle Model
			//------------------------------------------------------------------------------------------------------------------------------------

			//body
			var bodyPartNames = [];
			for (var i = 0; i < self.vehicleModel.children.length; i++) {
				var child = self.vehicleModel.children[i];
				if (child.name.includes("_paint")) {
					var name = child.name;
					name = name.split("_");
					var partName = (name[name.length - 1]).replace('&', ' ');
					bodyPartNames.push(partName);
				}
			}


			//callback for body part
			callback(null, bodyPartNames);

		}
		else {
			self.partialModel = model.scene.children[0].children[0].children[0].children[0].children[0];
			self.isEndLoadingGltfForPartial = true;


		}
		self.isEndLoading = true;
	});
}

AssetLoader.prototype.loadGLTFZip = function (url, type, callback) {
	var self = this;

	this.loadModelType = type;

	new Promise(function (resolve, reject) {

		if (url.match(/\.zip$/)) {

			self.zipLoader.load(url).then(function (zip) {

				self.loadingManager.setURLModifier(zip.urlResolver);

				resolve(zip.find(/\.(gltf|glb)$/i)[0]);

			});

		} else {

			resolve(url);

		}

	}).then(function (file) {

		self.loadGLTF(file, callback);

	});
}

AssetLoader.prototype.loadEnvMap = function (name) {
	var self = this;
	this.rgbLoader
		.setType(THREE.UnsignedByteType)
		.setPath('viewer3D/models/env/')
		.load( name + '.hdr', function (texture) {
			self.envData.textures.env = texture;
		});

}
var scene3D = null;

function ModelScene(loader) {

    this.loader = loader;

    this.container = g_CanvasContainer;
    this.vehicleModel = loader.vehicleModel;
    this.envData = loader.envData;
    this.width = this.container.width();
    this.height = this.container.height();
    this.screenRatio = this.width / this.height;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(g_pixelRatio);
    this.renderer.autoClear = false;
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.2;
    this.renderer.shadowMap.enabled = true;

    // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Env texture
    var cubeGenerator = new THREE.EquirectangularToCubeGenerator(this.envData.textures.env, { resolution: 1024 });
    cubeGenerator.update(this.renderer);
    var pmremGenerator = new THREE.PMREMGenerator(cubeGenerator.renderTarget.texture);
    pmremGenerator.update(this.renderer);
    var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
    pmremCubeUVPacker.update(this.renderer);
    this.envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
    pmremGenerator.dispose();
    pmremCubeUVPacker.dispose();
    // this.scene.background = cubeGenerator.renderTarget;

    //Add event
    this.container.append(this.renderer.domElement);
    this.renderer.domElement.mySelf = this;
    this.renderer.domElement.addEventListener('resize', this.onResize, false);
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown, false);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);
    this.renderer.domElement.addEventListener('mouseup', this.onMouseUp, false);
    this.renderer.domElement.addEventListener('touchstart', this.onTouchStart, false);
    this.renderer.domElement.addEventListener('touchmove', this.onTouchMove, false);
    this.renderer.domElement.addEventListener('touchend', this.onTouchEnd, false);
    this.renderer.domElement.addEventListener('touchcancel', this.onTouchCancel, false);
    this.renderer.domElement.addEventListener('click', this.onClick, false);

    // Camera
    this.camera = new THREE.PerspectiveCamera(46, this.screenRatio, 0.01, 100);

    // Camera controller
    this.cameraCtrl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    // this.cameraCtrl.enablePan = false;
    this.cameraCtrl.enableDamping = true;
    this.cameraCtrl.screenSpacePanning = true;
    this.cameraCtrl.dampingFactor = 0.12;
    this.cameraCtrl.minDistance = 0;
    this.cameraCtrl.maxDistance = 4.5;
    this.cameraCtrl.rotateSpeed = 0.1
    this.cameraCtrl.panSpeed = 0.1;
    this.cameraCtrl.minPolarAngle = Math.PI / 50;
    this.cameraCtrl.maxPolarAngle = Math.PI / 2 - Math.PI / 50;


    //Add color picker

    this.init();
}

ModelScene.prototype.init = function () {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 22);


    this.scene.add(this.camera);

    // var gridHelper = new THREE.GridHelper(10, 10, 0xffff00, 0xff00ff);
    // gridHelper.material.opacity = 0.3;
    // gridHelper.material.transparent = true;
    // this.scene.add(gridHelper);

    // var axisHelper = new THREE.AxesHelper(5);
    // this.scene.add(axisHelper);


    //Light
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(1, 10, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = - 10;
    dirLight.shadow.camera.left = - 10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);

    // ground
    var groundMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(40, 40),
        new THREE.MeshPhongMaterial({
            color: 0x999999,
            depthWrite: false
        })
    );
    groundMesh.rotation.x = - Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);


    //Camera controller
    this.cameraCtrl.target = new THREE.Vector3(0, -3, 0);
    this.camera.position.set(-4, 2.5, -4);


    //Init vehicle
    this.vehicleModel.name = "vehicle_root";
    this.vehicleModelInitPos = new THREE.Vector3(0, 0, 0);
    this.vehicleModel.position.set(this.vehicleModelInitPos.x, this.vehicleModelInitPos.y, this.vehicleModelInitPos.z);
    this.vehicleModel.rotation.set(0, Math.PI / 12, 0);
    this.vehicleModel.scale.set(1.2, 1.2, 1.2);
    this.scene.add(this.vehicleModel);

    //Set camera
    this.fitCameraToObject(this.camera, this.vehicleModel, 3, this.cameraCtrl);

    //Wheel
    this.wheels = [];
    this.wheelDiameter = 22;
    this.wheelWidth = 12;
    this.wheelDistance = 0;
    this.wheelColor = null;

    this.wheelDiameterScale = 1;
    this.wheelWidthScale = 1;

    //Tire
    this.tires = [];
    this.tireDiameter = 22;

    //Suspension
    this.suspension = null;
    this.suspensionSize = 0;
    this.suspensionColor = null;

    //Body color 
    this.bodyParts = [];
    this.bodyTargets = [];
    this.bodyGlass = null;

    //Shock
    this.shock = null;
    this.shockColor = null;

    //Frontbumper
    this.frontBumper = null;
    this.frontBumperColor = null;

    //Rearbumper
    this.rearBumper = null;
    this.rearBumperColor = null;

    //Fender
    this.fender = null;
    this.fenderColor = null;

    //Grille
    this.grille = null;
    this.grilleColor = null;

    //Grille
    this.grille = null;
    this.grilleColor = null;

    //HeadLight
    this.headLight = null;
    this.headLightColor = null;

    //Hood
    this.hood = null;
    this.hoodColor = null;

    //BedCover
    this.bedCover = null;
    this.bedCoverColor = null;

    //BedAccessory
    this.bedAccessory = null;
    this.bedAccessoryColor = null;

    //AdditionalLight
    this.additionalLight = null;
    this.additionalLightColor = null;

    //BedAccessory
    this.hitch = null;
    this.hitchColor = null;

    for (var i = 0; i < this.vehicleModel.children.length; i++) {

        var partialModel = this.vehicleModel.children[i];

        //Set shadow and envMap
        for (var j = 0; j < partialModel.children.length; j++) {
            var mesh = partialModel.children[j];
            mesh.material.envMap = this.envMap
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }

        //Add wheel
        if (partialModel.name.includes("wheel")) {
            partialModel.originDis = partialModel.position.x;
            this.wheels.push(partialModel);
        }

        //Add tire
        if (partialModel.name.includes("tire")) {
            partialModel.originDis = partialModel.position.x;
            this.tires.push(partialModel);
        }

        //Add suspension
        if (partialModel.name.includes("Suspension")) {
            this.suspension = partialModel;
        }

        //Add shock
        if (partialModel.name.includes("Shock")) {
            this.shock = partialModel;
        }

        //Add frontBumper
        if (partialModel.name.includes("FrontBumper")) {
            this.frontBumper = partialModel;
        }

        //Add rearBumper
        if (partialModel.name.includes("RearBumper")) {
            this.rearBumper = partialModel;
        }

        //Add fender
        if (partialModel.name.includes("Fender")) {
            this.fender = partialModel;
        }

        //Add grille
        if (partialModel.name.includes("Grille")) {
            this.grille = partialModel;
        }

        //Add headLight
        if (partialModel.name.includes("HeadLight")) {
            this.headLight = partialModel;
        }

        //Add hood
        if (partialModel.name.includes("Hood")) {
            this.hood = partialModel;
        }

        //Add bedCover
        if (partialModel.name.includes("BedCover")) {
            this.bedCover = partialModel;
        }

        //Add bedAccessory
        if (partialModel.name.includes("BedAccessory")) {
            this.bedAccessory = partialModel;
        }

        //Add additionalLight
        if (partialModel.name.includes("AdditionalLight")) {
            this.additionalLight = partialModel;
        }

        //Add hitch
        if (partialModel.name.includes("Hitch")) {
            this.hitch = partialModel;
        }

        //Add body
        if (partialModel.name.includes("_paint")) {
            var name = partialModel.name;
            name = name.split("_");
            partialModel.partName = (name[name.length - 1]).replace('&', ' ');

            this.bodyTargets.push(new PaintTarget(this, partialModel));
            this.bodyParts.push(partialModel);

            //Body glass
            if (partialModel.partName === "Body Glass") {
                this.bodyGlass = partialModel;
                var self = this;
                this.bodyGlass.traverse(function (child) {
                    if (child.isMesh) {
                        self.bodyGlassOpacity = child.material.opacity;
                    }

                })
            }
        }

    }


    // Composer
    this.initPostprocessing();

    scene3D = this;
}

ModelScene.prototype.update = function () {

    //update the position of Color picker 
    for (var i = 0; i < this.bodyTargets.length; i++) {
        this.bodyTargets[i].updatePosition(this.camera);
    }


    this.cameraCtrl.update();

    // this.renderer.render(this.scene, this.camera);
    this.updatePostprocessing();

}

ModelScene.prototype.run = function () {
    update();
}
function update() {
    scene3D.update();
    requestAnimationFrame(update);
}

ModelScene.prototype.resize = function () {
    if (this.width !== this.renderer.domElement.offsetWidth || this.height !== this.renderer.domElement.offsetHeight) {
        this.width = this.renderer.domElement.offsetWidth;
        this.height = this.renderer.domElement.offsetHeight;
        this.screenRatio = this.width / this.height;
        this.camera.aspect = this.screenRatio;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(g_pixelRatio);
        this.composer.setSize(this.width, this.height);
    }
}

ModelScene.prototype.onMouseDown = function (event) {
    var mySelf = event.currentTarget.mySelf;
}

ModelScene.prototype.onMouseUp = function (event) {
    var mySelf = event.currentTarget.mySelf;
}

ModelScene.prototype.onMouseMove = function (event) {
    var mySelf = event.currentTarget.mySelf;
}

ModelScene.prototype.onTouchStart = function (event) {
    var mySelf = event.currentTarget.mySelf;
}

ModelScene.prototype.onTouchEnd = function () {

}

ModelScene.prototype.onTouchCancel = function () {

}
ModelScene.prototype.onTouchMove = function () {

}

ModelScene.prototype.onResize = function (event) {
    var mySelf = event.currentTarget.mySelf;
    mySelf.resize();
}

ModelScene.prototype.onClick = function (event) {
    var mySelf = event.currentTarget.mySelf;
}

ModelScene.prototype.initPostprocessing = function () {

    this.composer = new POSTPROCESSING.EffectComposer(this.renderer);

    this.composer.addPass(new POSTPROCESSING.RenderPass(this.scene, this.camera));

    const vignetteEffect = new POSTPROCESSING.VignetteEffect({
        eskil: false,
        offset: 0.05,
        darkness: 0.5
    });

    const brightnessContrastEffect = new POSTPROCESSING.BrightnessContrastEffect({ contrast: 0.04, brightness: 0 });
    const gammaCorrectionEffect = new POSTPROCESSING.GammaCorrectionEffect({ gamma: 1 });

    const areaImage = new Image();
    areaImage.src = POSTPROCESSING.SMAAEffect.areaImageDataURL;


    const searchImage = new Image();
    searchImage.src = POSTPROCESSING.SMAAEffect.searchImageDataURL;


    var smaaEffect = new POSTPROCESSING.SMAAEffect(searchImage, areaImage);

    var edgesTextureEffect = new POSTPROCESSING.TextureEffect({
        blendFunction: POSTPROCESSING.BlendFunction.ADD,
        texture: smaaEffect.renderTargetColorEdges.texture
    });

    var weightsTextureEffect = new POSTPROCESSING.TextureEffect({
        blendFunction: POSTPROCESSING.BlendFunction.ADD,
        texture: smaaEffect.renderTargetWeights.texture
    });


    const effectPass = new POSTPROCESSING.EffectPass(
        this.camera,
        // new POSTPROCESSING.BloomEffect(),
        smaaEffect,
        vignetteEffect,
        brightnessContrastEffect,
        // gammaCorrectionEffect,
        // edgesTextureEffect,
        // weightsTextureEffect
    );

    effectPass.renderToScreen = true;
    this.composer.addPass(effectPass);


}
ModelScene.prototype.updatePostprocessing = function () {
    this.composer.render();
}

ModelScene.prototype.addPartialModel = function (partialModel, partialModelType) {
    //Set shadow and envMap
    for (var j = 0; j < partialModel.children.length; j++) {
        var mesh = partialModel.children[j];
        mesh.material.envMap = this.envMap
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    }

    this.vehicleModel.add(partialModel);

    //Change partial model
    var newPartialModels = [];

    switch (partialModelType) {
        case 'wheel':

            for (var i = 0; i < this.wheels.length; i++) {

                if (i === 0) {
                    newPartialModels.push(partialModel);
                } else {
                    //Clone new wheel
                    var clonePartialModel = partialModel.deepClone();
                    this.vehicleModel.add(clonePartialModel);

                    newPartialModels.push(clonePartialModel);
                }

                //Set pos and rot
                newPartialModels[i].position.set(this.wheels[i].position.x, this.wheels[i].position.y, this.wheels[i].position.z);
                newPartialModels[i].rotation.set(this.wheels[i].rotation.x, this.wheels[i].rotation.y, this.wheels[i].rotation.z);

                //Remove wheel
                for (var j = 0; j < this.wheels[i].children.length; j++) {

                    this.wheels[i].children[j].geometry.dispose();
                    this.wheels[i].children[j].material.dispose();
                }

                this.vehicleModel.remove(this.wheels[i]);
            }

            this.wheels = newPartialModels;

            this.setWheelSize(this.wheelDiameter, this.wheelWidth);
            this.setModelColor(this.wheelColor, partialModelType);

            break;
        case 'tire':

            for (var i = 0; i < this.tires.length; i++) {

                if (i === 0) {
                    newPartialModels.push(partialModel);
                } else {
                    //Clone new tire
                    var clonePartialModel = partialModel.deepClone();
                    this.vehicleModel.add(clonePartialModel);

                    newPartialModels.push(clonePartialModel);
                }

                //Set pos and rot
                newPartialModels[i].position.set(this.tires[i].position.x, this.tires[i].position.y, this.tires[i].position.z);
                newPartialModels[i].rotation.set(this.tires[i].rotation.x, this.tires[i].rotation.y, this.tires[i].rotation.z);

                //Remove old tire
                for (var j = 0; j < this.tires[i].children.length; j++) {

                    this.tires[i].children[j].geometry.dispose();
                    this.tires[i].children[j].material.dispose();
                }

                this.vehicleModel.remove(this.tires[i]);
            }

            this.tires = newPartialModels;

            //Set tire size
            for (var i = 0; i < this.tires.length; i++) {
                this.tires[i].scale.set(this.wheelWidthScale, this.wheelDiameterScale, this.wheelDiameterScale);
            }
            break;
        case 'suspension':

            newPartialModels.push(partialModel);

            //Set pos and rot
            newPartialModels[0].position.set(this.suspension.position.x, this.suspension.position.y, this.suspension.position.z);
            newPartialModels[0].rotation.set(this.suspension.rotation.x, this.suspension.rotation.y, this.suspension.rotation.z);

            //Remove old suspension
            for (var j = 0; j < this.suspension.children.length; j++) {

                this.suspension.children[j].geometry.dispose();
                this.suspension.children[j].material.dispose();

            }

            this.vehicleModel.remove(this.suspension);

            this.suspension = newPartialModels[0];

            this.setModelColor(this.suspensionColor, partialModelType);

            break;
        default:
            break;
    }

}

ModelScene.prototype.setWheelSize = function (diameter, width) {
    //Convert size to scale
    var scaleYZ = 1;
    switch (diameter) {
        case 22:
            scaleYZ = 1;
            break;
        case 24:
            scaleYZ = 1.09;
            break;
        case 26:
            scaleYZ = 1.18;
            break;
        case 28:
            scaleYZ = 1.27;
            break;
        case 30:
            scaleYZ = 1.36;
            break;
        default:
            break;
    }

    var scaleX = 1;
    switch (width) {
        case 12:
            scaleX = 1;
            break;
        case 14:
            scaleX = 1.09;
            break;
        case 16:
            scaleX = 1.18;
            break;
        default:
            break;
    }

    this.wheelDiameterScale = scaleYZ;
    this.wheelWidthScale = scaleX;

    for (var i = 0; i < this.wheels.length; i++) {
        this.wheels[i].scale.set(this.wheelWidthScale, this.wheelDiameterScale, this.wheelDiameterScale);
    }

    this.wheelDiameter = diameter;
    this.wheelWidth = width;


    //Set tire size
    for (var i = 0; i < this.tires.length; i++) {
        this.tires[i].scale.set(this.wheelWidthScale, this.wheelDiameterScale, this.wheelDiameterScale);
    }
}

ModelScene.prototype.setWheelDistance = function (distance) {
    
    this.wheelDistance = distance * 0.0254;

    for (var i = 0; i < this.wheels.length; i++) {
        this.wheels[i].position.x = this.wheels[i].originDis > 0 ? this.wheels[i].originDis + this.wheelDistance : this.wheels[i].originDis - this.wheelDistance;
    }
    for (var i = 0; i < this.tires.length; i++) {
        this.tires[i].position.x = this.tires[i].originDis > 0 ? this.tires[i].originDis + this.wheelDistance : this.tires[i].originDis - this.wheelDistance;
    }
}

ModelScene.prototype.setTireSize = function (diameter) {

    this.tireDiameter = diameter;

    this.resetPositionVehicle();
}

ModelScene.prototype.resetPositionVehicle = function () {
    //Standard tire size is 33"
    var increasedValue = ((this.tireDiameter - 33) / 2) * 0.0254;

    this.vehicleModel.position.set(this.vehicleModelInitPos.x, increasedValue + this.vehicleModelInitPos.y, this.vehicleModelInitPos.z);
}

ModelScene.prototype.setModelColor = function (color, partialModelType) {

    if (color === null) {
        return;
    }

    var self = this;

    console.log(color, partialModelType);
    switch (partialModelType) {
        case 'wheel':
            for (var i = 0; i < this.wheels.length; i++) {
                for (var j = 0; j < this.wheels[i].children.length; j++) {
                    let mesh = this.wheels[i].children[j];
                    if (mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }

            }
            this.wheelColor = color;
            break;
        case 'suspension':
            if (this.suspension !== null) {
                for (var i = 0; i < this.suspension.children.length; i++) {
                    let mesh = this.suspension.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.suspensionColor = color;
            }
            break;
        case 'shock':
            if (this.shock !== null) {
                for (var i = 0; i < this.shock.children.length; i++) {
                    let mesh = this.shock.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.shockColor = color;
            }
            break;
        case 'frontbumper':
            if (this.frontBumper !== null) {
                for (var i = 0; i < this.frontBumper.children.length; i++) {
                    let mesh = this.frontBumper.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.frontBumperColor = color;
            }
            break;
        case 'rearbumper':
            if (this.rearBumper !== null) {
                for (var i = 0; i < this.rearBumper.children.length; i++) {
                    let mesh = this.rearBumper.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.rearBumperColor = color;
            }
            break;
        case 'fender':
            if (this.fender !== null) {
                this.fender.traverse(function (child) {
                    if (child.isMesh) {
                        self.fadeMeshColor(child, color);
                    }
                })
                this.fenderColor = color;
            }
            break;
        case 'grille':
            if (this.grille !== null) {
                for (var i = 0; i < this.grille.children.length; i++) {
                    let mesh = this.grille.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.grilleColor = color;
            }
            break;
        case 'headlight':
            if (this.headLight !== null) {
                for (var i = 0; i < this.headLight.children.length; i++) {
                    let mesh = this.headLight.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.headLightColor = color;
            }
            break;
        case 'hood':
            if (this.hood !== null) {
                this.hood.traverse(function (child) {
                    if (child.isMesh) {
                        self.fadeMeshColor(child, color);
                    }
                })
                this.hoodColor = color;
            }
            break;
        case 'bedcover':
            if (this.bedCover !== null) {
                this.bedCover.traverse(function (child) {
                    if (child.isMesh) {
                        self.fadeMeshColor(child, color);
                    }
                })
                this.bedCoverColor = color;
            }
            break;
        case 'bedaccessory':
            if (this.bedAccessory !== null) {
                for (var i = 0; i < this.bedAccessory.children.length; i++) {
                    let mesh = this.bedAccessory.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.bedAccessoryColor = color;
            }
            break;
        case 'additionallight':
            if (this.additionalLight !== null) {
                for (var i = 0; i < this.additionalLight.children.length; i++) {
                    let mesh = this.additionalLight.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.additionalLightColor = color;
            }
            break;
        case 'hitch':
            if (this.hitch !== null) {
                for (var i = 0; i < this.hitch.children.length; i++) {
                    let mesh = this.hitch.children[i];
                    if (mesh.name.includes('body') || mesh.name.includes('main')) {
                        this.fadeMeshColor(mesh, color);
                    }
                }
                this.hitchColor = color;
            }
            break;
        default:
            break;
    }

}


ModelScene.prototype.setSuspensionSize = function (size) {
    //Suspension max size 10"

    var currentSize = size * 2.54 * 0.01;

    var dis = currentSize - this.suspensionSize;

    for (var i = 0; i < this.vehicleModel.children.length; i++) {

        var partialModel = this.vehicleModel.children[i];

        if (partialModel.name.includes("wheel") || partialModel.name.includes("tire") || partialModel.name.includes("braker") || partialModel.name.includes("Suspension")) {

        }
        else {
            partialModel.position.set(partialModel.position.x, partialModel.position.y + dis, partialModel.position.z);
        }

    }

    this.suspensionSize = currentSize;

}

ModelScene.prototype.setBodyColor = function (color, partName) {
    if (color === null) {
        return;
    }

    for (var i = 0; i < this.bodyParts.length; i++) {
        if (partName === this.bodyParts[i].partName) {
            this.fadeMeshColor(this.bodyParts[i], color);
            break;
        }
    }

}

ModelScene.prototype.setOpacityBodyGlass = function (val) {
    if (this.bodyGlass === null)
        return;

    var opacity = this.bodyGlassOpacity + val / 100;

    this.bodyGlass.traverse(function (child) {
        if (child.isMesh) {
            child.material.opacity = opacity;
        }
    })
}

ModelScene.prototype.showBodyAnnotation = function (partName) {
    for (var i = 0; i < this.bodyTargets.length; i++) {
        if (this.bodyTargets[i].partName === partName) {
            this.bodyTargets[i].fadeShow();
        }
    }
}

ModelScene.prototype.showAllBodyAnnotation = function () {
    this.bodyTargets.forEach(function (t) {
        t.fadeShow();
    })
}

ModelScene.prototype.setHDRI = function (val) {

    var self = this;
    this.loader.rgbLoader
        .setType(THREE.UnsignedByteType)
        .setPath('viewer3D/models/env/')
        .load(val + '.hdr', function (texture) {
            var cubeGenerator = new THREE.EquirectangularToCubeGenerator(texture, { resolution: 1024 });
            cubeGenerator.update(self.renderer);
            var pmremGenerator = new THREE.PMREMGenerator(cubeGenerator.renderTarget.texture);
            pmremGenerator.update(self.renderer);
            var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
            pmremCubeUVPacker.update(self.renderer);
            self.envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
            pmremGenerator.dispose();
            pmremCubeUVPacker.dispose();

            self.scene.traverse(function(child){
                if(child.isMesh){
                    child.material.envMap = self.envMap
                }
            })
        });


}

ModelScene.prototype.hideAllBodyAnnotation = function () {
    this.bodyTargets.forEach(function (t) {
        t.fadeHide();
    })
}

ModelScene.prototype.fadeMeshColor = function (object, color) {

    var c = new THREE.Color(color);

    object.traverse(function (child) {
        if (child.isMesh) {
            TweenMax.to(child.material.color, 0.8, {
                ease: Sine.easeInOut,
                r: c.r,
                g: c.g,
                b: c.b
            });
        }
    })


}

ModelScene.prototype.fitCameraToObject = function (camera, object, offset, controls) {

    offset = offset || 1.25;

    const boundingBox = new THREE.Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject(object);

    const center = new THREE.Vector3();

    boundingBox.getCenter(center);

    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = camera.fov * (Math.PI / 180);

    var cameraZ = Math.abs(maxDim / 4);

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    if (controls) {

        // set camera to rotate around center of loaded object
        controls.target = center;

        // prevent camera from zooming out far enough to create far plane cutoff
        controls.maxDistance = cameraToFarEdge * 2;

        controls.saveState();

    } else {

        camera.lookAt(center)

    }
}
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
