var scene3D = null;

function ModelScene(envData, vehicleModel) {
    this.container = g_CanvasContainer;
    this.vehicleModel = vehicleModel;
    this.envData = envData;
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
    this.renderer.shadowMap.type = THREE.PCFShadowMap;



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
    this.renderer.domElement.addEventListener('resize', this.onResize, true);
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown, false);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);
    this.renderer.domElement.addEventListener('mouseup', this.onMouseUp, false);
    this.renderer.domElement.addEventListener('touchstart', this.onTouchStart, false);
    this.renderer.domElement.addEventListener('touchmove', this.onTouchMove, false);
    this.renderer.domElement.addEventListener('touchend', this.onTouchEnd, false);
    this.renderer.domElement.addEventListener('touchcancel', this.onTouchCancel, false);
    this.renderer.domElement.addEventListener('click', this.onClick, false);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, this.screenRatio, 0.01, 100);

    // Cube Camera
    this.cubeCameraCnt = 0;
    this.cubeCamera1 = new THREE.CubeCamera(1, 1000, 256);
    this.cubeCamera1.renderTarget.texture.generateMipmaps = true;
    this.cubeCamera1.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

    this.cubeCamera2 = new THREE.CubeCamera(1, 1000, 256);
    this.cubeCamera2.renderTarget.texture.generateMipmaps = true;
    this.cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;


    // Camera controller
    this.cameraCtrl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    // this.cameraCtrl.enablePan = false;
    this.cameraCtrl.enableDamping = true;
    this.cameraCtrl.screenSpacePanning = true;
    // this.cameraCtrl.dampingFactor = 0.12;
    // this.cameraCtrl.minDistance = 0;
    // this.cameraCtrl.maxDistance = 7;
    this.cameraCtrl.rotateSpeed = 0.1
    this.cameraCtrl.panSpeed = 0.1;
    // this.cameraCtrl.minPolarAngle = Math.PI / 20;
    // this.cameraCtrl.maxPolarAngle = Math.PI / 2 - Math.PI / 20;


    //Add color picker
    this.selectedBodyPart = null;
    g_ColorPicker = document.createElement('div');
    g_ColorPicker.id = 'colorPickerWidget';
    g_CanvasContainer.append(g_ColorPicker);
    g_ColorPicker = $(g_ColorPicker);

    var self = this;
    g_ColorPicker.click(function () {
        var color = "#" + $(this).colorwheel('value');
        var selectedObject = self.selectedBodyPart;

        if (selectedObject !== null) {
            for (var i = 0; i < selectedObject.children.length; i++) {
                let mesh = selectedObject.children[i];
                if (mesh.material.name === selectedObject.name.replace('_paint_', '').replace('&','')) {
                    mesh.material.color.set(parseInt(color.replace('#', '0x')));
                }
            }
        }

    });



    this.init();
}

ModelScene.prototype.init = function () {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.scene.add(this.camera);
    this.scene.add(this.cubeCamera1);
    this.scene.add(this.cubeCamera2);

    // var gridHelper = new THREE.GridHelper(10, 10, 0xffff00, 0xff00ff);
    // gridHelper.material.opacity = 0.3;
    // gridHelper.material.transparent = true;
    // this.scene.add(gridHelper);

    // var axisHelper = new THREE.AxesHelper(5);
    // this.scene.add(axisHelper);




    //Light
    var ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
    light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 5, 0.3);
    light.position.set(0, 5, 1);
    light.target.position.set(0, -4, 0);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 10;
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);


    //Camera controller
    this.cameraCtrl.target = new THREE.Vector3(0, -3, 0);
    this.camera.position.set(-4, 2.5, -4);

    //Init environment scene
    if (this.envData.name === 'scene_00') {
        this.scene.add(this.envData.model);

        this.shinyMaterial = new THREE.ShaderMaterial({
            uniforms: {
                bumpiness: { type: 'f', value: 1 },
                repeatUV: { type: 'v2', value: new THREE.Vector2(1, 1) },
                diffuseMap: { type: 't', value: this.envData.textures.diffuse },
                specularMap: { type: 't', value: this.envData.textures.specular },
                normalMap: { type: 't', value: this.envData.textures.normal },
                detailNormalMap: { type: 't', value: this.envData.textures.displacement },
                envMap: { type: 't', value: this.cubeCamera2.renderTarget.texture },
                specular: { type: 'f', value: 0 },
                roughness: { type: 'f', value: 2 },
                cubeMapSize: { type: 'v3', value: new THREE.Vector3(1, 1, 1) }
            },
            vertexShader: this.envData.shaderContainers.reflectVert,
            fragmentShader: this.envData.shaderContainers.reflectFrag,
            side: THREE.FrontSide
        });

        this.shinyMaterial.uniforms.normalMap.value.wrapS =
            this.shinyMaterial.uniforms.normalMap.value.wrapT =
            this.shinyMaterial.uniforms.detailNormalMap.value.wrapS =
            this.shinyMaterial.uniforms.detailNormalMap.value.wrapT =
            this.shinyMaterial.uniforms.diffuseMap.value.wrapS =
            this.shinyMaterial.uniforms.diffuseMap.value.wrapT =
            this.shinyMaterial.uniforms.specularMap.value.wrapS =
            this.shinyMaterial.uniforms.specularMap.value.wrapT =
            THREE.RepeatWrapping;



        let self = this;
        this.envData.model.children.forEach(function (e) {
            e.geometry.center();

            var indices_array = [];
            for (var j = 0; j < e.geometry.attributes.position.array.length / 3; j++) {
                indices_array.push(j);
            }

            e.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices_array), 1));

            THREE.BufferGeometryUtils.computeTangents(e.geometry);
            var t = e.geometry.boundingBox.max.clone();
            t.sub(e.geometry.boundingBox.min);
            var scale = 8 / t.y;
            e.scale.set(scale, scale, scale);
            e.material = self.shinyMaterial;
            t.multiply(e.scale);
            e.material.uniforms.cubeMapSize.value.copy(t);

            self.envData.mesh = e;
        });

        //Floor
        var floorGeo = new THREE.PlaneGeometry(25, 40, 1);
        this.envData.textures.floor.wrapS = THREE.RepeatWrapping;
        this.envData.textures.floor.wrapT = THREE.RepeatWrapping;
        this.envData.textures.floor.repeat.set(6, 9);

        var floorMat = new THREE.MeshPhongMaterial({
            map: this.envData.textures.floor,
            shininess: 0,
            reflectivity: 0
        });

        this.floor = new THREE.Mesh(floorGeo, floorMat);
        this.floor.rotation.set(-Math.PI / 2, 0, 0);
        this.floor.position.set(0, -4, 0);
        this.floor.castShadow = false;
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
    }

    //Init vehicle
    this.vehicleModel.name = "vehicle_root";
    this.vehicleModelInitPos = new THREE.Vector3(0, -4, 0);
    this.vehicleModel.position.set(this.vehicleModelInitPos.x, this.vehicleModelInitPos.y, this.vehicleModelInitPos.z);
    this.vehicleModel.rotation.set(0, Math.PI / 5, 0);
    this.vehicleModel.scale.set(1.2, 1.2, 1.2);
    this.scene.add(this.vehicleModel);


    //Wheel
    this.wheels = [];
    this.wheelDiameter = 22;
    this.wheelWidth = 12;
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
    this.paintObjects = [];
    this.paintTargets = [];

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
            this.wheels.push(partialModel);
        }

        //Add tire
        if (partialModel.name.includes("tire")) {
            this.tires.push(partialModel);
        }

        //Add suspension
        if (partialModel.name.includes("Suspension")) {
            this.suspension = partialModel;
        }

        //Add paint object
        if (partialModel.name.includes("_paint")) {
            var name = partialModel.name;
            name = name.split("_");
            partialModel.partName = (name[name.length - 1]).replace('&', ' ');

            this.paintTargets.push(new PaintTarget(this, partialModel));
            this.paintObjects.push(partialModel);
        }

    }


    // Composer
    this.initPostprocessing();

    scene3D = this;
}

ModelScene.prototype.update = function () {

    //update the position of Color picker 
    for (var i = 0; i < this.paintTargets.length; i++) {
        this.paintTargets[i].updatePosition(this.camera);
    }


    if (this.cubeCameraCnt % 2 === 0) {

        //Update envMap for Environment
        this.envData.mesh.material.uniforms.envMap.value = this.cubeCamera1.renderTarget.texture;

        this.cubeCamera2.update(this.renderer, this.scene);

    } else {

        //Update envMap for Environment
        this.envData.mesh.material.uniforms.envMap.value = this.cubeCamera2.renderTarget.texture;

        this.cubeCamera1.update(this.renderer, this.scene);

    }

    this.cubeCameraCnt++;

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
        darkness: 0.7
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
        new POSTPROCESSING.BloomEffect(),
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

    switch (partialModelType) {
        case 'wheel':
            for (var i = 0; i < this.wheels.length; i++) {
                for (var j = 0; j < this.wheels[i].children.length; j++) {
                    let mesh = this.wheels[i].children[j];
                    if (mesh.name.includes('main')) {
                        mesh.material.color.set(parseInt(color.replace('#', '0x')));
                    }
                }

            }
            this.wheelColor = color;
            break;
        case 'suspension':
            for (var i = 0; i < this.suspension.children.length; i++) {
                let mesh = this.suspension.children[i];
                if (mesh.name.includes('body') || mesh.name.includes('main')) {
                    mesh.material.color.set(parseInt(color.replace('#', '0x')));
                }
            }
            this.suspensionColor = color;
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