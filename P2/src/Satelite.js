// Satelite  hereda de   CuerpoCeleste

Satelite = function (radio, tiempoGiro, traslacion, textura, elMaterial, distancia) {
  this.distanciaAstro = distancia;
  this.tiempoTraslacion = traslacion;
  this.nodoDistancia;
  this.orbita;
  // La propia función que define la clase es su constructor
  // Lo primero que se hace es llamar al constructor de su superclase, en este caso CuerpoCeleste
  // Como parámetros se pasa a sí misma,   this,   más los otros parámetros que hicieran falta pasarle a la superclase.
  
  CuerpoCeleste.call (this, radio, tiempoGiro, textura, elMaterial);
}

// La clase  Satelite  hereda los métodos de su superclase, en este caso la clase CuerpoCeleste
Satelite.prototype = Object.create (CuerpoCeleste.prototype);

// Indicamos cuál es su constructor
Satelite.prototype.constructor = Satelite;

// Si queremos sobreescribir un método se define
/*Satelite.prototype.metodo = function () {
  // Si quisiéramos llamar al mismo método de su superclase hacemos uso de los prototipos de la superclase
  CuerpoCeleste.prototype.metodo();
}*/

