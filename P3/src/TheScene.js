
/* ******* ******* ******* ******* ******* ******* ******* 
  
  Clase fachada, la escena.

   ******* ******* ******* ******* ******* ******* ******* */
TheScene = function (/*renderer*/) {
  THREE.Scene.call (this);
  
  // class variables
  var camera = null;
  var controls = null;
  var axis = null;
  var model = null;
  var objetivos = new Array();
  var nodoObjetivos = new THREE.Object3D();
  var personaje = null;
  var crosshairs = new Array();
  var crosshair = null;
  var raycaster_crosshair = new THREE.Raycaster();
  var suelo = null;
  
  // Creación de la cámara
  var createCamera = function (self) {
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
	createCrosshairs();
	self.setCrosshair("lineas");
  }
  
  // Creación de las mirillas
  var createCrosshairs = function(){
	var material = new THREE.LineBasicMaterial({ color: 0xff00bb });
	
	// lineas
	var x = 0.008, y = 0.008;

	var geometry = new THREE.Geometry();

	// crosshair
	geometry.vertices.push(new THREE.Vector3(0, y, 0));
	geometry.vertices.push(new THREE.Vector3(0, -y, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	geometry.vertices.push(new THREE.Vector3(x, 0, 0));    
	geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

	var crosshair1 = new THREE.Line( geometry, material );

	// place it in the center
	var crosshairPercentX = 50;
	var crosshairPercentY = 50;
	var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
	var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
	var crosshairPositionZ = -0.8;
	
	crosshair1.position.x = crosshairPositionX;
	crosshair1.position.y = crosshairPositionY;
	crosshair1.position.z = crosshairPositionZ;
	
	crosshair1.name = "lineas";
	crosshairs.push(crosshair1);
	
	
	// dot
	var dotgeometry = new THREE.Geometry();
	var dotmaterial = new THREE.PointsMaterial( { size: 0.01, color: 0xff00bb } );
	dotgeometry.vertices.push(new THREE.Vector3(0, 0, 0));
	
	var crosshair2 = new THREE.Points( dotgeometry, dotmaterial );
	
	// place it in the center

	crosshair2.position.x = crosshairPositionX;
	crosshair2.position.y = crosshairPositionY;
	crosshair2.position.z = -0.8;
	
	crosshair2.name = "punto";
	crosshairs.push(crosshair2);
	
  }
  
  var nuevoNodoTraslacion = function(x,y,z){
	var nodo = new THREE.Object3D();
	nodo.position.set(x,y,z);
	return nodo;
  }

  // Creación de los controles
  var createControls = function (){
	  camera.add(personaje);
	  controls = new THREE.PointerLockControls(camera);
	  controls.getObject().position.set(0,12,0);
  }
  
  /// Se crean las luces y se añaden a la escena
  var createLights = function (self) {
    // Una ambiental
    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    self.add (ambientLight);
  }
  
  var createBackground = function (self) {
    var path = "imgs/fondo1.jpg";
    var loader = new THREE.TextureLoader();
    var textura = loader.load(path);
    var material = new THREE.MeshBasicMaterial();
    material.map = textura;
    material.side = THREE.BackSide;
    var geometria = new THREE.SphereGeometry(5000.0, 20, 20);
    var fondo = new THREE.Mesh(geometria, material);
	fondo.name = "fondo";
    self.add(fondo);
  }
  
  var createFloor = function (self){
	  var material_suelo = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	  suelo = new Suelo (1000, 1000, 'imgs/suelo1.jpg', material_suelo);
	  self.add(suelo);
  }
  
  /// Se crea el modelo
  /**
   * @return La raiz de la rama del modelo
   */
  var createModel = function (self) {
	  
	var rot_z = degToRadians(90);
	var rot_y = degToRadians(-90);
	var bala = new Bala('resources/models/bala/', 'bullet.obj','bullet.mtl', 0.1, 0, 0, 0, 0, rot_y, rot_z, 50 );
	
	var arma = new Arma('resources/models/pistola/', 'm1911-handgun.obj','m1911-handgun.mtl', 
		0.05, -0.3, -0.8, 1.7, 0,degToRadians(180),0, bala, 250, 500, 0.2);
	createCamera (self);
	personaje = new Personaje(arma);
	createControls();
	
	return controls.getObject();
	
  }
  
  
  var createObjectives = function(self){
		var rotacion_mesh = Math.PI/2;
		
		// Objetivo 1
		var material1 = new THREE.MeshPhongMaterial({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
		var nodo_tras1 = nuevoNodoTraslacion(0,20,-100);
		var objetivo1 = new Objetivo("objetivo1",5,5,Math.PI/2,'imgs/diana.jpg',material1);
		objetivo1.translateY(10);
		nodo_tras1.add(objetivo1);
		
		var posicionInicial1 = { pos : 0 };
		var posicionFinal1 = { pos : 2 * Math.PI };
		var tween1 = new TWEEN.Tween(posicionInicial1).to(posicionFinal1, 5000);
		tween1.onUpdate(function(){
			nodo_tras1.rotation.z = posicionInicial1.pos;
		}).repeat(Infinity).start();
		
		objetivos.push(objetivo1);
		nodoObjetivos.add(nodo_tras1);
		
		// Objetivo 2
		var material2 = new THREE.MeshPhongMaterial({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
		var nodo_tras2 = nuevoNodoTraslacion(100,20,-150);
		var objetivo2 = new Objetivo("objetivo2",7,5,Math.PI/2,'imgs/diana.jpg',material2);
		objetivo2.translateY(10);
		nodo_tras2.add(objetivo2);
		
		var posicionInicial2 = { pos : 75 };
		var posicionFinal2 = { pos : 125 };
		var tween2 = new TWEEN.Tween(posicionInicial2).to(posicionFinal2, 2500);
		tween2.onUpdate(function(){
			nodo_tras2.position.x = posicionInicial2.pos;
		}).repeat(Infinity).yoyo(true).start();
		
		objetivos.push(objetivo2);
		nodoObjetivos.add(nodo_tras2);
		
		// Objetivo 3
		var material3 = new THREE.MeshPhongMaterial({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
		var nodo_tras3 = nuevoNodoTraslacion(-75,20,-120);
		var objetivo3 = new Objetivo("objetivo3",5,5,Math.PI/2,'imgs/diana.jpg',material3);
		objetivo3.translateY(10);
		nodo_tras3.add(objetivo3);
		
		var posicionInicial3 = { pos : 20 };
		var posicionFinal3 = { pos : 70 };
		var tween3 = new TWEEN.Tween(posicionInicial3).to(posicionFinal3, 3000);
		tween3.onUpdate(function(){
			nodo_tras3.position.y = posicionInicial3.pos;
		}).repeat(Infinity).yoyo(true).start();
		
		objetivos.push(objetivo3);
		nodoObjetivos.add(nodo_tras3);
		nodoObjetivos.name = "objetivos";
		self.add(nodoObjetivos);
  }
  
  /// Inicializador
  /**
   * @param renderer - El renderer donde se visualizará la escena
   */
  var init = function (self, /*renderer*/) {
	self.name = "la_escena";

    createLights (self);
	createBackground(self);
    createFloor(self);
	createObjectives(self);
	
    axis = new THREE.AxisHelper (25);
    self.add (axis);
	
    model = createModel(self);
    self.add (model);

  }
  
  // public

  /// Teniendo en cuenta los controles de la GUI se modifica en la escena todo lo necesario. Se realliza mediante mensajes a los objetos que correspondan. Los mensajes al modelo se realizan a través de su fachada.
  this.animate = function (controls) {
    // Se muestran o no los ejes
    axis.visible = controls.axis;

  }
  
  /// Getter de la cámara
  this.getCamera = function () {
    return camera;
  }
  
  /// Getter del controlador de la cámara
  this.getCameraControls = function () {
    return controls;
  }
  
  /// Modifica el ratio de aspecto de la cámara
  /**
   * @param anAspectRatio - El nuevo ratio de aspecto de la cámara
   */
  this.setCameraAspect = function (anAspectRatio) {
    camera.aspect = anAspectRatio;
    camera.updateProjectionMatrix();
  }
  
  this.getPersonaje = function(){
	  return personaje;
  }
 
  // Actualiza los valores de munición en el html
  this.actualizarMunicion = function(){
	var arma = personaje.getArmaActual()
	var municion_cargador = arma.getNumBalasCargador();
	var municion_actual = arma.getNumBalasActual();
	
	document.getElementById("municion_cargador").innerHTML = municion_cargador;
	document.getElementById("municion_actual").innerHTML = municion_actual;
  }
  
  this.generarBala = function(){
	  
	  var arma = personaje.getArmaActual();
	  
	  var puntoGeneracion = arma.getPuntoGeneracionBala();
	  var rotacionGeneracion = arma.getRotacionBala();
	  var puntoDireccion = this.crosshairHit();
	  
	  var bala = arma.getBala().generar(puntoGeneracion,rotacionGeneracion);

	  if (puntoDireccion != null)
		  bala.dirigir(puntoDireccion);
	  
	  this.add(bala);
	  personaje.disparar();
	  bala.animar(objetivos);
	  this.animarCamara(0.6);

	  this.actualizarMunicion();
  }
  
  this.crosshairHit = function(){
	  raycaster_crosshair.set(camera.getWorldPosition(),camera.getWorldDirection());
	  var intersection = raycaster_crosshair.intersectObjects(objetivos, true);

	  direccion = null;
	  
	  if (intersection.length > 0)
		  var direccion = intersection[0].point;
	  
	  return(direccion);
  }

  this.getCrosshair = function(){
	  return crosshair;
  }
  
  this.animarCamara = function(grados){
		var radianes = degToRadians(grados);
		var rotacionInicial = { angulo : 0 };
		var rotacionFinal = { angulo : -radianes};
		var tiempo = personaje.getArmaActual().getTiempoEntreDisparos()/2;
		var tween = new TWEEN.Tween(rotacionInicial).to(rotacionFinal, tiempo);
			
		tween.onUpdate(function(){
			camera.rotation.x = rotacionInicial.angulo;
		})
		
		tween.start();
	}
	
	this.getSuelo = function(){
		return suelo;
	}
	
	this.setCrosshair = function(tipo){
		camera.remove(crosshair);
		
		switch (tipo){
			case "punto":
				crosshair = crosshairs[1];
				break;
			default:
				crosshair = crosshairs[0];
				break;
		}

		camera.add( crosshair );
			
	}
  // constructor
  init (this/*, renderer*/);
}

TheScene.prototype = Object.create (THREE.Scene.prototype);
TheScene.prototype.constructor = TheScene;

function degToRadians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}