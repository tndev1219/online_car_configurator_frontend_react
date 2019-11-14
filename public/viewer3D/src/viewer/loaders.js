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

				self.modelScene = new ModelScene(self.envData, self.vehicleModel);
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

AssetLoader.prototype.loadEnvAndVehicle = function (url) {
	this.loadEnvModel();
	this.loadGLTFZip(url, 'Vehicle');
	this.loadEnvMap();
}

AssetLoader.prototype.loadGLTF = function (url) {
	var self = this;


	this.gltfLoader.load(url, function (model) {
		if (self.vehicleLoad) {
			self.vehicleModel = model.scene.children[0].children[0].children[0].children[0];
		}
		else {
			self.partialModel = model.scene.children[0].children[0].children[0].children[0].children[0];
			self.isEndLoadingGltfForPartial = true;
		}
		self.isEndLoading = true;
	});
}

AssetLoader.prototype.loadGLTFZip = function (url, type) {
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

		self.loadGLTF(file);

	});
}

AssetLoader.prototype.loadEnvModel = function () {
	var self = this;
	var envPath = "viewer3D/models/env/"

	//Load environment Scene_00
	envPath += this.envData.name;
	if (this.envData.name === "scene_00") {
		this.textureLoader.load(envPath + '/' + 'diffuse.jpg', function (t) { self.envData.textures.diffuse = t; });
		this.textureLoader.load(envPath + '/' + 'specular.jpg', function (t) { self.envData.textures.specular = t; });
		this.textureLoader.load(envPath + '/' + 'normal.jpg', function (t) { self.envData.textures.normal = t; });
		this.textureLoader.load(envPath + '/' + 'displacement.jpg', function (t) { self.envData.textures.displacement = t; });
		this.textureLoader.load(envPath + '/' + 'floor.jpg', function (t) { self.envData.textures.floor = t; });
		this.textureLoader.load(envPath + '/' + 'floor_normal.jpg', function (t) { self.envData.textures.floor_normal = t; });

		this.objLoader.load(envPath + '/hall.obj', function (model) {
			self.envData.model = model;
		});
	}
	else if (this.envData.name === "scene_04") {
		this.gltfLoader.load(envPath + '/' + 'Scene_04.gltf', function (model) {
			self.envData.model = model.scene.children[0];
		});
	}

}


AssetLoader.prototype.loadEnvMap = function () {
	var self = this;
	this.rgbLoader
		.setType(THREE.UnsignedByteType)
		.setPath('viewer3D/models/env/equirectangular/')
		.load('venice_sunset_2k.hdr', function (texture) {
			self.envData.textures.env = texture;
		});

}