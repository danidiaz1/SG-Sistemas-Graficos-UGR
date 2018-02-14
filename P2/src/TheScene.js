
/* ******* ******* ******* ******* ******* ******* ******* 

Javascript implementa el paradigma de la orientación a objetos de una manera diferente a otros
lenguajes como Java o C++

Se podría decir que una función es una clase.

Dentro de esa función las variables y funciones que se declaren con   var   serían 
variables de instancia y métodos privados.

Mientras que lo que se declare con   this.   serían 
variables de instancia y métodos públicos.

Ver como ejemplo esta clase   TheScene.

El problema está, que en cada objeto que se cree a partir de una clase definida de esta manera, se repite todo el código de todos los métodos, con lo que las necesidades de memoria aumentan considerablemente.

Lo deseable sería que el código de los métodos existiera solamente una vez, común para todos los objetos que se creen de dicha clase.

Para ello, debemos recurrir al modo de definición de métodos de clases mediante prototipos.

Para la clase   TheScene,   dado que es una clase fachada, de la que solo va a existir un objeto, no importa definirla de la manera que se muestra en este archivo. Pero para clases de las que se van a instanciar muchos objetos, lo recomendable es hacerlo mediante prototipos.

En las clases   CuerpoCeleste   y   Estrella   que se incluyen en este proyecto, se tiene un ejemplo de cómo se definen clases mediante prototipos.

   ******* ******* ******* ******* ******* ******* ******* */


/// Clase fachada, la escena
TheScene = function (renderer) {
  THREE.Scene.call (this);
  
  var camera = null;
  // El objeto que permite interactuar con la cámara
  var trackballControls = null;
  var axis = null;
  var model = null;
  
  /// Se crea la cámara, es necesario el renderer para interactuar con ella
  /**
   * @param renderer - El renderer que muestra la imagen y al mismo tiempo captura la interacción del usuario
   */
  var createCamera = function (self, renderer) {
    // Se define una cámara en perspectiva, con un ángulo de visión de 45 grados,
    // Un ratio de aspecto según las dimensiones de la ventana
    // Y unos planos de recorte cercano y lejano
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
    
    // Dónde se sitúa y hacia donde mira
    camera.position.set (30, 30, 30);
    var look = new THREE.Vector3 (0,0,0);
    camera.lookAt(look);
    
    // El objeto que permite orbitar la cámara, reencuadrarla y hacer zoom
    trackballControls = new THREE.TrackballControls (camera, renderer);
    trackballControls.rotateSpeed = 5;
    trackballControls.zoomSpeed = -2;
    trackballControls.panSpeed = 0.5;
    trackballControls.target = look;
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
	var geometria = new THREE.SphereGeometry(1000.0, 20, 20);
	var fondo = new THREE.Mesh(geometria, material);
	self.add(fondo);
  }
  
  /// Se crea el modelo
  /**
   * @return La raiz de la rama del modelo
   */
  var createModel = function () {
  	// Variables para la animación/construcción
        
        // Sol
        var radio_sol = 1.0;
        var rotacion_sol = 60000;
        
            // Tierra
            var rotacion_tierra = 20000;
            var traslacion_tierra = 60000;
            var radio_tierra = radio_sol/5;
            var distancia_tierra_sol = radio_sol*4;
            
                // Luna
                var rotacion_luna = rotacion_tierra/3;
                var traslacion_luna = traslacion_tierra/3;
                var radio_luna = radio_tierra/4;
                var distancia_luna_tierra = radio_tierra*2;
        
            // Mercurio
            var radio_mercurio = radio_sol/6;
            var distancia_mercurio_sol = radio_sol*2;
            var rotacion_mercurio = rotacion_tierra*5;
            var traslacion_mercurio = rotacion_tierra/2;
        
            // Venus
            var radio_venus = radio_sol/5.5;
            var distancia_venus_sol = radio_sol*3;
            var rotacion_venus = rotacion_tierra*10;
            var traslacion_venus = traslacion_tierra*2/3;
        
            // Marte
            var radio_marte = radio_sol/3;
            var distancia_marte_sol = radio_sol*5.5;
            var rotacion_marte = rotacion_tierra;
            var traslacion_marte = traslacion_tierra*2;
            
                // Fobos
                var rotacion_fobos = rotacion_marte/3;
                var traslacion_fobos = traslacion_marte/3;
                var radio_fobos = radio_luna/2;
                var distancia_fobos_marte = radio_marte*2;
                
                // Deimos
                var rotacion_deimos = rotacion_marte/3;
                var traslacion_deimos = traslacion_marte/4;
                var radio_deimos = radio_luna*1.1;
                var distancia_deimos_marte = radio_marte*2.5;
        
            // Jupiter
            var radio_jupiter = radio_sol/2;
            var distancia_jupiter_sol = radio_sol*7;
            var rotacion_jupiter = rotacion_tierra/2;
            var traslacion_jupiter = traslacion_tierra*7;
            
                // Callisto
                var rotacion_callisto = rotacion_jupiter/2;
                var traslacion_callisto = traslacion_jupiter/14;
                var radio_callisto = radio_luna*2;
                var distancia_callisto_jupiter = radio_jupiter*2;
                
                // Europa
                var rotacion_europa = rotacion_jupiter*2/3;
                var traslacion_europa = traslacion_jupiter/18;
                var radio_europa = radio_luna*1.2;
                var distancia_europa_jupiter = radio_jupiter*2.5;
                
                // Io
                var rotacion_io = rotacion_jupiter*3;
                var traslacion_io = traslacion_jupiter/16;
                var radio_io = radio_luna*1.5;
                var distancia_io_jupiter = radio_jupiter*1.3;

    var material_sol = new THREE.MeshLambertMaterial ({
        color: 0x0f0f0f
    });

	/* Materiales de planetas */
    var material_tierra = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0x404040, shininess: 70, emissive: 0});
	var material_venus = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_mercurio = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_marte = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_jupiter = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});

	/* Materiales de satelites */
	var material_luna = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_fobos = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_deimos = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_callisto = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_europa = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	var material_io = new THREE.MeshPhongMaterial ({ color: 0x606060, specular: 0, shininess: 1, emissive: 0});
	
	// Sol
    var sol = new Estrella (radio_sol, rotacion_sol, 'imgs/sun.jpg', material_sol);
	
	/* Planetas */
    var tierra = new Planeta (radio_tierra, rotacion_tierra, traslacion_tierra, 'imgs/tierra.jpg', material_tierra, distancia_tierra_sol);
		/* Tierra con texturas en otros canales */
		tierra.asignarTexturaEspecular('imgs/tierra_especular.jpg');
		tierra.asignarTexturaNormales('imgs/tierra_normales.jpg');
	var mercurio = new Planeta (radio_mercurio, rotacion_mercurio, traslacion_mercurio, 'imgs/mercurio.jpg', material_mercurio, distancia_mercurio_sol);
	var venus = new Planeta (radio_venus, rotacion_venus, traslacion_venus, 'imgs/venus.jpg', material_venus, distancia_venus_sol);
	var marte = new Planeta (radio_marte, rotacion_marte, traslacion_marte, 'imgs/marte.jpg', material_marte, distancia_marte_sol);
	var jupiter = new Planeta (radio_jupiter, rotacion_jupiter, traslacion_jupiter, 'imgs/jupiter.jpg', material_jupiter, distancia_jupiter_sol);
	
	/* Satelites */
	var luna = new Satelite(radio_luna, rotacion_luna, traslacion_luna, 'imgs/luna.jpg', material_luna, distancia_luna_tierra);
	var fobos = new Satelite(radio_fobos, rotacion_fobos, traslacion_fobos, 'imgs/fobos.jpg', material_fobos, distancia_fobos_marte);
	var deimos = new Satelite(radio_deimos, rotacion_deimos, traslacion_deimos, 'imgs/deimos.jpg', material_deimos, distancia_deimos_marte);
	var callisto = new Satelite(radio_callisto, rotacion_callisto, traslacion_callisto, 'imgs/callisto.jpg', material_callisto, distancia_callisto_jupiter);
	var europa = new Satelite(radio_europa, rotacion_europa, traslacion_europa, 'imgs/europa.jpg', material_europa, distancia_europa_jupiter);
	var io = new Satelite(radio_io, rotacion_io, traslacion_io, 'imgs/io.jpg', material_io, distancia_io_jupiter);
	
	// Montamos el grafo de escena
	tierra.addSatelite(luna);
	marte.addSatelite(fobos);
	marte.addSatelite(deimos);
	jupiter.addSatelite(callisto);
	jupiter.addSatelite(europa);
	jupiter.addSatelite(io);
	
    sol.addPlaneta(mercurio);
	sol.addPlaneta(venus);
	sol.addPlaneta(tierra);
	sol.addPlaneta(marte);
	sol.addPlaneta(jupiter);

    return sol;
  }
  
  /// Inicializador
  /**
   * @param renderer - El renderer donde se visualizará la escena
   */
  var init = function (self, renderer) {
    createLights (self);
	createBackground(self);
    createCamera (self, renderer);
    axis = new THREE.AxisHelper (25);
    self.add (axis);
    model = createModel ();
    self.add (model);
  }
  
  // public

  /// Teniendo en cuenta los controles de la GUI se modifica en la escena todo lo necesario. Se realliza mediante mensajes a los objetos que correspondan. Los mensajes al modelo se realizan a través de su fachada.
  this.animate = function (controls) {
    // Se muestran o no los ejes
    axis.visible = controls.axis;
    model.startStop(controls.startStop);
  }
  
  /// Getter de la cámara
  this.getCamera = function () {
    return camera;
  }
  
  /// Getter del controlador de la cámara
  this.getCameraControls = function () {
    return trackballControls;
  }
  
  /// Modifica el ratio de aspecto de la cámara
  /**
   * @param anAspectRatio - El nuevo ratio de aspecto de la cámara
   */
  this.setCameraAspect = function (anAspectRatio) {
    camera.aspect = anAspectRatio;
    camera.updateProjectionMatrix();
  }
  
  // constructor
  
  init (this, renderer);
}

TheScene.prototype = Object.create (THREE.Scene.prototype);
TheScene.prototype.constructor = TheScene;

