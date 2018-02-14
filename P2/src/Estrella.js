 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Con las clases  CuerpoCeleste  y  Estrella  (que hereda de CuerpoCeleste) se explica como se implementan
   las clases en  Javascript  mediante prototipos.
   
   ******* ******* ******* ******* ******* ******* ******* */

// Estrella  hereda de   CuerpoCeleste

Estrella = function (radio, tiempoGiro, textura, elMaterial) {
	// La propia función que define la clase es su constructor
	// Lo primero que se hace es llamar al constructor de su superclase, en este caso   CuerpoCeleste
	// Como parámetros se pasa a sí misma,   this,   más los otros parámetros que hicieran falta pasarle a la superclase.

	CuerpoCeleste.call (this, radio, tiempoGiro, textura, elMaterial);

	// Se le añade la componente emisiva a la estrella: intensidad y textura
	this.elCuerpoCeleste.material.emissive.set(0xffffff);
	this.elCuerpoCeleste.material.emissiveMap = this.texturaCargada;

	// Le ponemos una luz puntual
	this.elCuerpoCeleste.add (new THREE.PointLight(0xffffff,5,0,1));

	this.addPlaneta = function (planeta){
		planeta.nodoDistancia = this.desplazarCuerpoCeleste(planeta);
		planeta.orbita = this.girarCuerpoCeleste(planeta);
		planeta.nodoDistancia.add(planeta);
		planeta.orbita.add(planeta.nodoDistancia);
		
		this.add(planeta.orbita);
	}
}

// La clase  Estrella  hereda los métodos de su superclase, en este caso la clase  CuerpoCeleste
Estrella.prototype = Object.create (CuerpoCeleste.prototype);

// Indicamos cuál es su constructor
Estrella.prototype.constructor = Estrella;

// Si queremos sobreescribir un método se define
/*Estrella.prototype.metodo = function () {
  // Si quisiéramos llamar al mismo método de su superclase hacemos uso de los prototipos de la superclase
  CuerpoCeleste.prototype.metodo();
  console.log ('Soy una Estrella');
}
*/
