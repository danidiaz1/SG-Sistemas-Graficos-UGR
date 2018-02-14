 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Clase Arma
   
   ******* ******* ******* ******* ******* ******* ******* */

Arma = function (ruta, modelo, material, escala, 
	position_x=0, position_y=0, position_z=0, 
	rotation_x=0, rotation_y=0, rotation_z=0,
	laBala, t_disparos = 1000, t_recarga = 2000, ret = 1) {

	// Superclase Object3D
	THREE.Object3D.call (this);
	
	// Variables de clase
	var tiempo_recarga = t_recarga;
	var tiempo_entre_disparos = t_disparos;
	var num_balas_cargador = 20;
	var num_balas_actual = 20;
	var num_balas_total = 200;
	var bala = laBala;
	var retroceso = ret;
	
	// Generación del modelo a partir de .obj y .mtl
	var that = this;
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath(ruta);
	mtlLoader.load(material, function(materials) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath(ruta);
		objLoader.load(modelo, function(modelo3D) {
			modelo3D.scale.set(escala, escala, escala);
			modelo3D.position.set(position_x,position_y,position_z);
			modelo3D.rotation.set(rotation_x,rotation_y,rotation_z);
			that.add(modelo3D);
		});
	});
	
	this.getPuntoGeneracionBala = function(){
		var posicion = this.localToWorld( new THREE.Vector3(0,0,0) );
		return posicion;
	}

	this.getRotacionBala = function(){
		return this.getWorldRotation();
	}

	this.getTiempoEntreDisparos = function(){
		return tiempo_entre_disparos;
	}
	
	this.setNumBalasCargador = function(n){
		num_balas_cargador = n;
	}
	
	this.setNumBalasActual = function(n){
		num_balas_actual = n;
	}
	
	this.getNumBalasActual = function(){
		return num_balas_actual;
	}
	
	this.getNumBalasCargador = function(){
		return num_balas_cargador;
	}
	
	this.disparar = function(){
		if (num_balas_actual >= 1)
			num_balas_actual--;
		else
			this.recargar();
	}

	this.recargar = function(){
		num_balas_actual = num_balas_cargador;
	}
	
	this.getBala = function(){
		return bala;
	}
	
	this.animar = function(){
		var posicion_actual = this.position.z;
		
		var posInicial = { pos : posicion_actual };
		var posFinal = { pos : posicion_actual+retroceso};
		var tween = new TWEEN.Tween(posInicial).to(posFinal, tiempo_entre_disparos*0.45);
		var that = this;
		tween.onUpdate(function(){
			that.position.z = posInicial.pos;
		}).yoyo(true).repeat(1).start();

	}
}

// La clase  Astro  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
Arma.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Arma.prototype.constructor = Arma;