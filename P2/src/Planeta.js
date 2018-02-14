// Planeta  hereda de   CuerpoCeleste

Planeta = function (radio, tiempoGiro, traslacion, textura, elMaterial, distancia) {
	// Inicio constructor
		this.distanciaAstro = distancia;
		this.tiempoTraslacion = traslacion;
		this.nodoDistancia;
		this.orbita;
		// La propia función que define la clase es su constructor
		// Lo primero que se hace es llamar al constructor de su superclase, en este caso CuerpoCeleste
		// Como parámetros se pasa a sí misma,   this,   más los otros parámetros que hicieran falta pasarle a la superclase.

		CuerpoCeleste.call (this, radio, tiempoGiro, textura, elMaterial);
	// Fin constructor
	
	this.addSatelite = function (satelite){
		satelite.nodoDistancia = this.desplazarCuerpoCeleste(satelite);
		satelite.orbita = this.girarCuerpoCeleste(satelite);
		satelite.nodoDistancia.add(satelite);
		satelite.orbita.add(satelite.nodoDistancia);
		
		this.add(satelite.orbita);
	}
}

// La clase  Planeta  hereda los métodos de su superclase, en este caso la clase CuerpoCeleste
Planeta.prototype = Object.create (CuerpoCeleste.prototype);

// Indicamos cuál es su constructor
Planeta.prototype.constructor = Planeta;

// Si queremos sobreescribir un método se define
/*Planeta.prototype.metodo = function () {
  // Si quisiéramos llamar al mismo método de su superclase hacemos uso de los prototipos de la superclase
  CuerpoCeleste.prototype.metodo();
}*/

