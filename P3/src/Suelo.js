 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Clase Suelo
   
   ******* ******* ******* ******* ******* ******* ******* */

Suelo = function (ancho, alto, textura, elMaterial) {

	// Superclase Object3D

	THREE.Object3D.call (this);

	// Textura
	var cargadorTextura = new THREE.TextureLoader();
	var texturaCargada = cargadorTextura.load (textura);

		// Repetición de la textura
		texturaCargada.wrapS = THREE.RepeatWrapping;
		texturaCargada.wrapT = THREE.RepeatWrapping;
		texturaCargada.repeat.set(4, 4);

	// Geometría
	var geometria = new THREE.PlaneGeometry (ancho, alto);
	
	geometria.rotateX(-Math.PI /2);

	// Material
	var material = elMaterial;
	material.side = THREE.FrontSide;
	material.map = texturaCargada;
		
	// Mesh
	var suelo = new THREE.Mesh(geometria, material);

	this.add(suelo);
}

// La clase  Astro  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
Suelo.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Suelo.prototype.constructor = Suelo;