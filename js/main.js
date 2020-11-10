$( document ). ready( function(){

  let mouse = new THREE.Vector2( -1000, -1000 );

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  scene.add( camera );
  camera.position.z = 6;

  let light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, camera.position.z );
  scene.add( light );

  let geometry = new THREE.IcosahedronGeometry( 0.8, 0 );
  let material = new THREE.MeshLambertMaterial({ color: 0xfa33fa, flatShading: true });
  geometry.computeFlatVertexNormals();
  let nodo = new THREE.Mesh(geometry, material) ;
  //scene.add(nodo);

  let contenedor = new THREE.Object3D();
  scene.add( contenedor );



  function animate(){
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }
  animate();

  let isPressed = false;
  let timeCounter = 0;
  let colorCounter = 0;

  $( window ).on( 'mousemove', function( e ){


    let colorCubos = new THREE.Color( 0, colorCounter* ( Math.random() * 2), colorCounter);

    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    //console.log( mouse.x + " , " + mouse.y );
    camera.position.x = mouse.x * 5;
    camera.position.y = mouse.y * 5;
    camera.lookAt( 0, 0, 0 );
    light.position.x = mouse.x * 5;
    light.position.y = mouse.y * 5;

    if (isPressed){
      mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

      //let geometry = new THREE.BoxGeometry( 0.5* mouse.x , 0.5 * mouse.y, 0.2 );
      let geometry = new THREE.BoxGeometry( 0.2* (timeCounter * 0.01) , 0.2 * (timeCounter * 0.01) , 0.2 *(timeCounter * 0.01));
      let material = new THREE.MeshLambertMaterial({ color: colorCubos, flatShading: true });
      geometry.computeFlatVertexNormals();
      let nodo = new THREE.Mesh(geometry, material) ;

      var vector = new THREE.Vector3( mouse.x, mouse.y,  0.5);
      vector.unproject( camera );
      var dir = vector.sub( camera.position ).normalize();
      var distance = - camera.position.z / dir.z;
      var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
      nodo.position.copy( pos );

      nodo.position.z -= (timeCounter * 0.01);

      contenedor.add(nodo);
      timeCounter ++;
      colorCounter += 0.01;
      //console.log(colorCounter);
    }
  });

  $( window ).on( 'mousedown', function(){
    isPressed = true;

  });

  $( window ).on( 'mouseup', function(){
    isPressed = false;
    timeCounter = 0;
    colorCounter = 0;
  });

  $( window ).on( 'click', function( e ){
  });

}); // document ready
