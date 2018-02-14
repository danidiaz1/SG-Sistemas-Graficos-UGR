
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Con las clases  CuerpoCeleste  y  Estrella  (que hereda de CuerpoCeleste) se explica como se implementan
   las clases en  Javascript  mediante prototipos.
   
   ******* ******* ******* ******* ******* ******* ******* */

// CuerpoCeleste   va a heredar de la clase   Object3D   de la biblioteca THREE

CuerpoCeleste = function (radio, tiempoGiro, textura, elMaterial) {
	
	// Inicio constructor
		// La propia función que define la clase es su constructor
		// Lo primero que se hace es llamar al constructor de su superclase, en este caso   Object3D
		// Como parámetros se pasa a sí misma,   this,   más otros parámetros que hicieran falta pasarle a la superclase.
		THREE.Object3D.call (this);

		// Las variables   var   son variables  locales  al constructor. No son accesibles desde los métodos prototipo.
		var disiviones_esfera = 20;
		var cargadorTextura = new THREE.TextureLoader();

		// Las variables   this.   son variables de instancia públicas.
		// Siempre hay que nombrarlas con la sintaxis this.variable   No poner this. daría error ya que no sería la misma variable.
		var esfera = new THREE.SphereGeometry (radio,disiviones_esfera,disiviones_esfera);
		this.texturaCargada = cargadorTextura.load (textura);
		this.material = elMaterial;
		this.material.side = THREE.FrontSide;
		this.material.map = this.texturaCargada;
		this.elCuerpoCeleste = new THREE.Mesh (
			esfera,
			this.material
		);

		var rotacionInicial = { angulo : 0 };
		var rotacionFinal = { angulo : 2 * Math.PI };
		// Alamacenamos en la variable local   astro   una referencia  al atributo this.elCuerpoCeleste
		var astro = this.elCuerpoCeleste;
		this.movimientoRotacion = new TWEEN.Tween (rotacionInicial).to(rotacionFinal, tiempoGiro)
			.onUpdate (function(){
			  // Dentro de esta función podemos acceder a  this.elCuerpoCeleste  gracias a la referencia que hemos almacenado previamente en   astro
			  astro.rotation.y = rotacionInicial.angulo;
			})
			.repeat (Infinity)
			.start();

		this.add (this.elCuerpoCeleste);
	// Fin constructor
	
	// Crea un nodo para desplazar un cuerpo celeste (según el atributo distanciaAstro del mismo)
	this.desplazarCuerpoCeleste = function (cuerpoCeleste){
		var nodoDistancia = new THREE.Object3D();
		nodoDistancia.position.x = cuerpoCeleste.distanciaAstro;
		return nodoDistancia;
	}
	
	this.girarCuerpoCeleste = function (cuerpoCeleste) {
		
		var rotacionInicial = { angulo : 0 };
		var rotacionFinal = { angulo : 2 * Math.PI };
		var orbita = new THREE.Object3D();
		movimientoTraslacion = new TWEEN.Tween (rotacionInicial).to(rotacionFinal, cuerpoCeleste.tiempoTraslacion)
			.onUpdate (function(){
			  orbita.rotation.y = rotacionInicial.angulo;
			})
			.repeat(Infinity)
			.start();

		return orbita;
	}
	
	this.asignarTexturaEspecular = function(path) {
		var cargadorTextura = new THREE.TextureLoader();
		var texturaEspecular = cargadorTextura.load(path);
		this.material.specularMap = texturaEspecular;
	}
	
	this.asignarTexturaNormales = function(path) {
		var cargadorTextura = new THREE.TextureLoader();
		var texturaNormales = cargadorTextura.load(path);
		this.material.normalMap = texturaNormales;
	}
}

// La clase  CuerpoCeleste  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
CuerpoCeleste.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
CuerpoCeleste.prototype.constructor = CuerpoCeleste;

  // Ahora se añaden los nuevos métodos públicos de la clase. Se añaden como prototipos.

CuerpoCeleste.prototype.startStop = function (onOff) {
  if (onOff) {
    // Recordar. Para acceder a los atributos de la clase hay que usar obligatoriamente la notación this.variable
    this.movimientoRotacion.resume();
  } else {
    this.movimientoRotacion.pause();
  }
}

// Este método se incluye para explicar como se redefinen métodos y como se haría una llamada al método equivalente de la superclase.
// Se explicará en la clase  Estrella  que hereda de  CuerpoCeleste.
/*CuerpoCeleste.prototype.metodo = function () {
  console.log ('Soy un CuerpoCeleste');
}*/
