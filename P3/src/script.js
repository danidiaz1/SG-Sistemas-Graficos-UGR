
renderer = null; 
scene = null;
controls = null;
GUIcontrols = null;
stats = null;

// Variables para el control del personaje
clockMovimiento = null;
velocity = null;
moveForward = null;
moveBackward = null;
moveLeft = null;
moveRight = null;
canJump = null;
agachado = null;
corriendo = null;
disparando = null;

// Las cuatro siguientes variables son para establecer el tiempo mínimo entre disparos
tiempo_transcurrido = null;
tiempo_entre_disparos = null;
tiempo_ultima_bala = null;
fecha = null;

// Variables necesarias para el salto, el suelo hace de "tope" para parar la caída del salto
raycaster_salto = null;
suelo = null;

/// Función que se llama para dibujar cada frame
function render() {
	stats.update();
	
	// La propia función se encola a sí misma para el siguiente render
	requestAnimationFrame(render);

	// Función para el movimiento del personaje
	actualizarPosicion();

	// Función que controla el disparo
	disparar();
	
	// Se dibuja la escena
	renderer.render(scene, scene.getCamera());

	// Se realizan los cambios para el siguiente frame
	scene.animate(GUIcontrols);

	// Si se tienen animaciones con TWEEN hay que actualizarlas
	TWEEN.update();
}


/// Se construye el renderer basado en WebGL
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;  
}

/// El  DOM  que muestra estadística
function initStats() {
  
  var stats = new Stats();
  
  stats.setMode(0); // 0: fps, 1: ms
  
  // Alineación top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  
  $("#Stats-output").append( stats.domElement );
  
  return stats;
}

/// Se crea la GUI
function createGUI (withStats) {
  /// Se crea la interfaz y se le añaden controles
  var gui = new dat.GUI();
  
  /// Todos los controles de la interfaz son 'variables' de una función
  GUIcontrols = new function() {
    this.axis = false;
	this.mirilla = 'lineas';
  }
  
  // Ahora se le añaden los controles a la interfaz
  // Lo que va entre las comillas simples debe coincidir con el nombre dado a la variable en la función  GUIcontrols
  gui.add(GUIcontrols, 'axis').name('Mostrar ejes: ');
  var controlador_mirilla = gui.add(GUIcontrols, 'mirilla', [ 'lineas', 'punto' ] ).name('Mirilla: ');
  
  controlador_mirilla.onFinishChange(function(value) {

	scene.setCrosshair(value);
  });
  
  if (withStats)
    stats = initStats();
}

/// Función encargada de procesar un cambio de tamaño de la ventana
function onWindowResize () {
  // Se actualiza la cámara
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  // Y también el renderer
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// Función encargada de implementar el bloqueo de puntero al hacer click en la ventana
function pointerLock(){
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
	var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
	if ( havePointerLock ) {
		var element = document.getElementById( 'WebGL-output' );
		var pointerlockchange = function ( event ) {
			if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
				controls.enabled = true;
				
				blocker.style.display = 'none';
			} else {
				controls.enabled = false;
				
				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';
				instructions.style.display = '';
			}
		};
		var pointerlockerror = function ( event ) {
			instructions.style.display = '';
		};
		// Hook pointer lock state change events
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'pointerlockerror', pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
		instructions.addEventListener( 'click', function ( event ) {
			instructions.style.display = 'none';
			// Ask the browser to lock the pointer
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
			element.requestPointerLock();
		}, false );
	} else {
		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
	}
}

// Listeners para el control
function addListeners(){
	var onKeyDown = function ( event ) {
		switch ( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = true;
				break;
			case 37: // left
			case 65: // a
				moveLeft = true; 
				break;
			case 40: // down
			case 83: // s
				moveBackward = true;
				break;
			case 39: // right
			case 68: // d
				moveRight = true;
				break;
			case 32: // space
				if ( canJump ) velocity.y += 180;
				canJump = false;
				break;
			case 67: // c
				controls.getObject().position.y = 6;
				agachado = true;
				break;
			case 16: // shift
				corriendo = true;
		}
	};
	
	var onKeyUp = function ( event ) {
		switch( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = false;
				break;
			case 37: // left
			case 65: // a
				moveLeft = false;
				break;
			case 40: // down
			case 83: // s
				moveBackward = false;
				break;
			case 39: // right
			case 68: // d
				moveRight = false;
				break;
			case 67: // c
				agachado = false;
				controls.getObject().position.y = 12;
				break;
			case 16: // shift
				corriendo = false;
		}
	};
	
	var onMouseDown = function ( event ){
		switch( event.button ) {
			case 0: // boton izquierdo el raton
				disparando = true;
				break;
		}
	}
	
	var onMouseUp = function ( event ){
		switch( event.button ) {
			case 0: // boton izquierdo el raton
				disparando = false;
				break;
		}
	}
	
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	document.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mouseup', onMouseUp, false );
}

// Función que actualiza la posición del personaje
function actualizarPosicion(){
	if ( controls.enabled ) {
		raycaster_salto.ray.origin.copy( controls.getObject().position );
		raycaster_salto.ray.origin.y -= 5;
		
		var intersections = raycaster_salto.intersectObjects( suelo, true );
		var isOnObject = intersections.length > 0;
		var vel_movimiento = 600;
		var vel_salto = 7;
		
		if ( agachado )
			vel_movimiento = 200;
		else if (corriendo)
			vel_movimiento = 1000;
			
		
		var delta = clockMovimiento.getDelta();
		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;
		velocity.y -= vel_salto * 100.0 * delta;
		
		if ( moveForward ) velocity.z -= vel_movimiento * delta;
		if ( moveBackward ) velocity.z += vel_movimiento * delta;
		if ( moveLeft ) velocity.x -= vel_movimiento * delta;
		if ( moveRight ) velocity.x += vel_movimiento * delta;
		
		if ( isOnObject ) {
			velocity.y = Math.max( 0, velocity.y );
			canJump = true;
		}
		
		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );
		
	}
}

// Función que controla el disparo
function disparar(){
	if ( controls.enabled ){
		fecha = new Date();
		tiempo_actual = fecha.getTime();
		tiempo_transcurrido = tiempo_actual - tiempo_ultima_bala;
		if ( disparando && tiempo_transcurrido > tiempo_entre_disparos){
			scene.generarBala();
			tiempo_ultima_bala = tiempo_actual;
		}		
	}
		
}
/// El main
$(function main() {
	
  // Se crea el renderer
  renderer = createRenderer();
  
  // Se añade la salida del renderer a su elemento html
  $("#WebGL-output").append(renderer.domElement);
  
  window.addEventListener ("resize", onWindowResize);
  
  // Se añaden los listeners para que el personaje se mueva
  addListeners();
  
  //Se inicializan la variables de velocidad y control
  velocity = new THREE.Vector3();
  clockMovimiento = new THREE.Clock();
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;
  agachado = false;
  corriendo = false;

  // Se crea la escena
  scene = new TheScene (/*renderer.domElement*/);
  scene.actualizarMunicion();
  tiempo_entre_disparos = scene.getPersonaje().getArmaActual().getTiempoEntreDisparos();
  tiempo_ultima_bala = 0;
  raycaster_salto = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
  suelo = new Array(); 
  suelo.push(scene.getSuelo());
  
  // Se obtienen los controles
  controls = scene.getCameraControls();
  
  // Se crea la GUI, con información estadística
  createGUI(true);
  
  // Se muestra la ventana de bloqueo de ratón
  pointerLock();
  
  // El primer render
  render();
});
 
 
 
 