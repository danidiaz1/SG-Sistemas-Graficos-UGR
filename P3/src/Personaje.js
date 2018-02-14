 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Clase Personaje
   
   ******* ******* ******* ******* ******* ******* ******* */

Personaje = function (elArma) {

	// Superclase Object3D
	THREE.Object3D.call (this);
	
	// Variables de clase
	var armaActual = elArma;
	var transformArma = new THREE.Object3D();
	
	transformArma.position.set(1.3,-0.8,-5);
	transformArma.add(armaActual);
	this.add(transformArma);
	
	this.getArmaActual = function(){
		return armaActual;
	}
	
	this.disparar = function(){
		armaActual.disparar();
		armaActual.animar();
	}


}

// La clase  Astro  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
Personaje.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Personaje.prototype.constructor = Personaje;