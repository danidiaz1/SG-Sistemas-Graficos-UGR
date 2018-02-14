 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Clase Objetivo
   
   ******* ******* ******* ******* ******* ******* ******* */

Objetivo = function (nombre, elRad, elAlto, rotacion, textura, elMaterial, 
	laVida = 200) {
	
	// Superclase Object3D

	THREE.Object3D.call (this);
	var rad = elRad;
	var alto = elAlto;
	var vida = laVida;
	
	// Textura
	var cargadorTextura = new THREE.TextureLoader();
	var texturaCargada = cargadorTextura.load (textura);
	
	// Geometría
	var geometria = new THREE.CylinderGeometry (rad, rad, alto, 20);
	
	//geometria.rotateX(-Math.PI /2);

	// Material
	var material = elMaterial;
	material.side = THREE.DoubleSide;
	material.map = texturaCargada;
		
	// Mesh
	var objetivo = new THREE.Mesh(geometria, material);
	objetivo.name = nombre;
	objetivo.rotateX(rotacion);
	this.add(objetivo);


}

// La clase  Astro  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
Objetivo.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Objetivo.prototype.constructor = Objetivo;