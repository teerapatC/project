// Youtube Link:https://youtu.be/fDeJSWJjN0A
// Presentation Date and Time:Thursday, November 18 (9:10 - 9.15am)
// Group: F987C5
// First Name:Puriwat 
// Last Name:Pattanasasinitikul
// Student ID:6309682208
// E-mail:puriwat.patt@dome.tu.ac.th
// First Name:Teerapat
// Last Name:Samerroob
// Student ID:6309682216
// E-mail:teerapat.same@dome.tu.ac.th

    import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
    import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
    import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
    
  let score = 0;  //score on scene
  const canvas = document.querySelector("#c");  
  const scene = new THREE.Scene();  //create scene
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // create camera
  camera.position.setY(250);  // set position camera

  //specification skybox cubemap
  scene.background = new THREE.CubeTextureLoader()
      .setPath('textures/cubeMaps/')
      .load([
        'yonder_lf.jpg',
        'yonder_rt.jpg',
        'yonder_up.jpg',
        'yonder_dn.jpg',
        'yonder_ft.jpg',
        'yonder_bk.jpg',
      ]);


  const renderer = new THREE.WebGLRenderer({canvas}); //create renderer
  document.body.appendChild( renderer.domElement ); //add renderer

  renderer.setPixelRatio(window.devicePixelRatio);  //set Ratio

  const listener = new THREE.AudioListener(); //create audio listener
  camera.add( listener ); //add listener to camera

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'skrrtt.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.1 );
  });

  const gui = new GUI();  //create button open control
  // gui.close();  //hide composition in open control
  var music = {
    play:function(){
      sound.play();
    },pause:function(){
      sound.pause();
    },start:function(){
      startG();
      if(score==10){
        window.location.href = window.location.href;  //reload this page
      }
    }}
  //set composition name
  gui.add(music, 'play').name('Play music'); 
  gui.add(music, 'pause').name('Pause music');
  gui.add(music, 'start').name('Start game');

  //create ball and add ball to scene
  const geomentry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        shading:THREE.FlatShading,
      });
  const point = new THREE.Mesh(geomentry, material);
  point.scale.setScalar(20);
  point.position.setY(5);
  scene.add(point);

  //random position ball on scene
  function randomPosition(){
    let ranX = Math.floor((Math.random()*490)-245);
    let ranZ = Math.floor((Math.random()*260)-130);
    point.position.setX(ranX);
    point.position.setZ(ranZ);
  }
  randomPosition();

  //create the floor
  var grassgeometry = new THREE.PlaneGeometry( 565.5, 279.5);
  var grasstextureload = new THREE.TextureLoader();
  var grasstexture = grasstextureload.load('grass2.png');
  var grassmaterial = new THREE.MeshBasicMaterial({map: grasstexture});
  var grass = new THREE.Mesh( grassgeometry, grassmaterial );
  grass.rotation.x = -(Math.PI / 2);
  scene.add(grass);

  //set position light
  const pointlight = new THREE.PointLight(0xffffff,1,5000);
  pointlight.position.set(0,200,0);
  scene.add(pointlight);

  //crate OribitControl
  const controls = new OrbitControls(camera, renderer.domElement);

  //import blender model
  let model;
  let obj;
  const loader = new GLTFLoader();
  const loader2 = new GLTFLoader(); 
  loader.load('car8.glb',(gltf)=>{
        model = gltf.scene;
        model.rotation.y =3.15;
        scene.add(model);
        obj = model.getObjectByName('car8');
      });

  //set event collision of object
  function checkCollision(){
    let carBox = new THREE.Box3().setFromObject(obj);
    let pointBox = new THREE.Box3().setFromObject(point);
    let collision = carBox.isIntersectionBox(pointBox);
    if(collision){
      randomPosition();
      score++;
      document.getElementById('nut').innerHTML="<br>"+score;
      if(score==10){
        point.position.setY(-5000);
        camera.position.set(0, 250, 0);
        document.removeEventListener("keydown", onDocumentKeyDown);
        let winobj;
        const loader3 = new GLTFLoader();
        loader3.load('win.glb',(gltf)=>{
                winobj = gltf.scene;
                winobj.position.setZ(-30);
                winobj.position.setY(-30);
                winobj.scale.setScalar(1.8);
                scene.add(winobj);
          });
      }
    }
  }

  //Control key
  function startG(){
    document.addEventListener("keydown", onDocumentKeyDown, false);
  }

  function onDocumentKeyDown(event) {
      var keyCode = event.which;
  
      if (keyCode == 87) {
        obj.position.z += 3;
        if(obj.position.z>125){
          obj.position.z = 125;
        }
        
        if( obj.rotation.y!=0.002734033817055302){
          obj.rotation.y = 0.002734033817055302;
        }
        console.log(camera.position);
        checkCollision()
        // w

      } else if (keyCode == 83) {
        obj.position.z -= 3;
        if(obj.position.z<-123){
          obj.position.z = -123;
        }
        
        if(obj.rotation.y==0.002734033817055302 || obj.rotation.y>0 || obj.rotation.y<0){
          obj.rotation.y=0;
          obj.rotation.y -= 3.15;
        }
        checkCollision()// s

      } else if (keyCode == 65) {
        obj.position.x += 3;
        if( obj.rotation.y>0 || obj.rotation.y<0){
          obj.rotation.y = 0;
          obj.rotation.y -=1.55;
        }
        if(obj.position.x>268){
          obj.position.x = 268;
        }
        console.log(obj.position.x);
        checkCollision()// a

      }else if (keyCode == 68) {
        obj.position.x -= 3;
        if(obj.position.x<-265){
          obj.position.x = -265;
        }
        if( obj.rotation.y<0 || obj.rotation.y==0.002734033817055302){
          obj.rotation.y = 0;
          obj.rotation.y +=1.6;
        }
        checkCollision()// d  

      }
  };

  //set renderer
  function resizeRendererToDisplaySize(renderer){
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize){
            renderer.setSize(width, height, false);
        }
        
        return needResize;
    }

    //Loop system
  function animate(){
    requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    controls.update();

    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);