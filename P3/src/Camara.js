 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Clase Camara
   
   ******* ******* ******* ******* ******* ******* ******* */

Camara = function (path, modelo, material, escala, position_x, position_y, position_z, laBala) {

	// Superclase Object3D
	THREE.Object3D.call (this);
	
}

// La clase  Astro  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
Camara.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Camara.prototype.constructor = Camara;