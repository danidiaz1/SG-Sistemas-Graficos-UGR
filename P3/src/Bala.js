 
/* ******* ******* ******* ******* ******* ******* ******* 
   
   Clase Bala
   
   ******* ******* ******* ******* ******* ******* ******* */

Bala = function (elPath, elModelo, elMaterial, laEscala, 
	posicion_inicial_x, posicion_inicial_y, posicion_inicial_z, 
	rotacion_inicial_x, rotacion_inicial_y, rotacion_inicial_z, 
	elDanio = 20) {

	// Superclase Object3D
	THREE.Object3D.call (this);
	
	var path = elPath;
	var modelo = elModelo;
	var material = elMaterial;
	var escala = laEscala;
	
	var position_x = posicion_inicial_x;
	var position_y = posicion_inicial_y;
	var position_z = posicion_inicial_z;
	
	var rotation_x = rotacion_inicial_x;
	var rotation_y = rotacion_inicial_y;
	var rotation_z = rotacion_inicial_z;
	
	var danio = elDanio;
	var tiempo = 5000;
	var distancia_recorrida = -10;
	
	var posicion = new THREE.Object3D();
	var rotacion = new THREE.Object3D();
	
	var destruido = false;
	var bbox = new THREE.Mesh();
	bbox.name = "bbox";
	
	var raycaster_collision = new THREE.Raycaster();
	raycaster_collision.far = 7;
	// Generación del modelo a partir de .obj y .mtl
	var that = this;
	var mtlLoader = new THREE.MTLLoader();
	
	mtlLoader.setPath(path);
	
	mtlLoader.load(material, function(materials) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath(path);
		objLoader.load(modelo, function(modelo3D) {
			// Creación de un mesh bounding box para usar con raycaster

			modelo3D.scale.set(escala, escala, escala);
			var box3 = new THREE.Box3();
			box3.setFromObject(modelo3D);
			var size = box3.getSize();
			var geometria = new THREE.BoxGeometry( size.x*2, size.y*2, size.z*2 );

			var material_bbox = new THREE.MeshBasicMaterial();
			material_bbox.visible = false;
			bbox.geometry = geometria;
			bbox.material = material_bbox;
			modelo3D.position.set(position_x,position_y,position_z);
			modelo3D.rotation.set(rotation_x,rotation_y,rotation_z);
			//var axis = new THREE.AxisHelper(5);
			//bbox.add(axis);
			
			bbox.add(modelo3D);
			rotacion.add(bbox);
			posicion.add(rotacion);
			that.add(posicion);
		});
	});
	
	this.getDanio = function(){
		return danio;
	}
	
	this.setDanio = function(d){
		this.danio = d;
	}

	this.comprobarImpacto = function(elementos){
		raycaster_collision.ray.direction.copy(bbox.getWorldDirection().negate());
		raycaster_collision.ray.origin.copy(bbox.getWorldPosition());
		var intersections = raycaster_collision.intersectObjects(elementos, true);
		if (intersections.length > 0){
			
			this.destruir();
			var objeto = intersections[0].object;
			console.log(objeto.name);
			objeto.material.emissive.setHex(0xff0000);
		}
	}
	
	this.animar = function(elementos){
		var posicionInicial = { z : 0 };
		var posicionFinal = { z : -600 };

		var tween = new TWEEN.Tween(posicionInicial).to(posicionFinal, tiempo);

		/*var arrow = new THREE.ArrowHelper( bbox.getWorldDirection().negate(), bbox.getWorldPosition(), 5, Math.random() * 0xffffff );
		bbox.add( arrow );*/
			
		tween.onUpdate(function(){
			bbox.translateZ(distancia_recorrida);
			that.comprobarImpacto(elementos);
		});
		
		tween.onComplete(function(){
			if (!destruido)
				that.destruir();
		});
		
		tween.start();
	}
	

	this.setObjetivos = function(objetivos){
		elementos = objetivos;
	}
	
	this.getTiempo = function(){
		return tiempo;
	}
	
	this.destruir = function(){
		
		var mesh_bala = bbox.children[0].children[0];
		mesh_bala.geometry.dispose();
		mesh_bala.material.dispose();
		bbox.children[0].remove(mesh_bala);
		
		bbox.material.dispose();
		bbox.geometry.dispose();
		rotacion.remove(bbox);
		this.parent.remove(this);
		destruido = true;
	}
	
	this.getPosicion = function(){
		return posicion;
	}
	
	this.getRotacion = function(){
		return rotacion;
	}
	
	this.generar = function(pos,rot){
		var copia = new Bala(path,modelo,material,escala,
			position_x,position_y,position_z,
			rotation_x,rotation_y,rotation_z,
			danio);
		
		copia.getRotacion().rotateX(rot.x);
		copia.getRotacion().rotateY(rot.y);
		copia.getRotacion().rotateZ(rot.z);

		copia.getPosicion().translateX(pos.x);
		copia.getPosicion().translateY(pos.y);
		copia.getPosicion().translateZ(pos.z);

		return copia;
	}
	
	this.dirigir = function(punto){
		var newDir = punto.negate();
		var pos = new THREE.Vector3();
		pos.addVectors(newDir, posicion.position);
		rotacion.lookAt(pos);
	}
	
}

// La clase  Astro  hereda los métodos de su superclase, en este caso la clase  Object3D  de la biblioteca  THREE
Bala.prototype = Object.create (THREE.Object3D.prototype);

// Indicamos cuál es su constructor
Bala.prototype.constructor = Bala;