import { createSignal, onCleanup, onMount } from 'solid-js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


function App() {
  const [size, setSize] = createSignal({ width: 0, height: 0 })
  const [rot, setRot] = createSignal<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
  let canvas: HTMLCanvasElement = null!;
  let parentDiv: HTMLDivElement = null!;

  onMount(async () => {
    // Reset the canvas size    
    setSize({ width: parentDiv.clientWidth, height: parentDiv.clientHeight })
    canvas.width = size().width
    canvas.height = size().height

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setClearColor(0x87ceeb, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(size().width, size().height)

    // create a perspective camera
    const camera = new THREE.PerspectiveCamera(75, size().width / size().height, 0.1, 1000)
    // Put the camera on top of the cube
    camera.position.set(0, 2, 5)

    const controls = new OrbitControls(camera, renderer.domElement);

    // Scene
    // TODO: Create a scene a separate file
    const loader = new GLTFLoader();
    const scene = new THREE.Scene()

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 0, 100)
    scene.add(light)

    let gridHelper = new THREE.GridHelper(20, 20)
    scene.add(gridHelper)

    // Create a simple green cube
    let basicMaterial = new THREE.MeshPhongMaterial({
      color: 0xc000c0,
      specular: 0x009900,
      shininess: 0,

    })

    let Material = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true })
    let cube1 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), Material)

    scene.add(cube1)

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // const helper = new THREE.CameraHelper(camera);
    // scene.add(helper);

    // Load the monkey Blender monkey
    // Applied a translucent color material for effect
    let monkey = await loader.loadAsync('assets/monkey.glb');
    scene.add(monkey.scene)


    // Start the game loop
    let frame = requestAnimationFrame(loop);
    const oneDeg = Math.PI / 180
    function loop(frame: number) {
      frame = requestAnimationFrame(loop);
      // Rotate the cube
      monkey.scene.rotation.x += 2 * oneDeg
      monkey.scene.rotation.y += oneDeg
      cube1.rotation.x += -oneDeg
      cube1.rotation.y += -oneDeg
      setRot(new THREE.Vector3(THREE.MathUtils.radToDeg(monkey.scene.rotation.x) % 360,
        THREE.MathUtils.radToDeg(monkey.scene.rotation.y) % 360,
        THREE.MathUtils.radToDeg(monkey.scene.rotation.z) % 360))
      controls.update();
      renderer.render(scene, camera)
    }

    window.addEventListener('resize', () => {
      // Needed a signal to update the canvas
      setSize({ width: parentDiv.clientWidth, height: parentDiv.clientHeight })
      const parentSize = size()
      canvas.width = parentSize.width
      canvas.height = parentSize.height

      // // Update camera
      camera.aspect = parentSize.width / parentSize.height
      camera.updateProjectionMatrix()
      renderer.setSize(parentSize.width, parentSize.height)
    }) // End resize event


    onCleanup(() => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', () => { })
    })
  })

  return (
    <>
      <div class='w-screen h-[calc(100vh-40px)]' ref={parentDiv} >
        <canvas id="area" ref={canvas} />
      </div>
      <div class='h-[40px] flex flex-row w-screen bg-blue-950 text-white items-center px-2 space-x-2'>
        <label class=''>Rotation</label>
        <span class=''>(x:{rot().x.toFixed(2)}, y:{rot().y.toFixed(2)}, z:{rot().z.toFixed(2)})</span>
      </div>
    </>
  )
}

export default App
