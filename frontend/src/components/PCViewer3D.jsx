import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Environment } from "@react-three/drei"
import { Suspense, useRef, useEffect } from "react"

function Model({ path, scale=1, position=[0,0,0], rotation=[0,0,0] }) {
  const { scene } = useGLTF(path)

  return (
    <primitive
      object={scene.clone()}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  )
}

function AnimatedGPU({ visible }) {
  const { scene } = useGLTF("/models/gpu.glb")
  const ref = useRef()
  const fans = useRef([])

  useEffect(() => {
    fans.current = []
    scene.traverse((child) => {
      if (child.name.toLowerCase().includes("fan")) {
        fans.current.push(child)
      }
    })
  }, [scene])

  useFrame(() => {
    if (!ref.current) return

    const targetY = visible ? 0.7 : 1.5
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05

    fans.current.forEach((fan) => {
      fan.rotation.z += 0.2
    })
  })

  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      scale={1.1}
      position={[0.5,1.5,0]}
    />
  )
}



function GlassPanel({ open }) {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    const target = open ? -Math.PI / 2 : 0
    ref.current.rotation.y += (target - ref.current.rotation.y) * 0.1
  })

  return (
    <mesh ref={ref} position={[1.2,0.8,0]}>
      <boxGeometry args={[0.02,1.6,1.6]} />
      <meshStandardMaterial transparent opacity={0.25}/>
    </mesh>
  )
}

export default function PCViewer3D({
  rgbEnabled,
  glassPanel,
  selectedParts
}){

return(

<Canvas camera={{position:[4,3,6],fov:45}}>

<Environment preset="city" />
<ambientLight intensity={0.8}/>
<directionalLight position={[5,5,5]} intensity={2}/>

{rgbEnabled && (
<>
<pointLight color="cyan" intensity={2} position={[-1,1,1]}/>
<pointLight color="magenta" intensity={2} position={[1,1,1]}/>
</>
)}

<Suspense fallback={<mesh><boxGeometry/><meshBasicMaterial/></mesh>}>
{selectedParts.case && (
<Model path="/models/case.glb" scale={2}/>
)}

{selectedParts.motherboard && (
<Model
path="/models/motherboard.glb"
scale={1.2}
position={[0,0.6,-0.2]}
/>
)}

{selectedParts.ram && (
<Model
path="/models/ram.glb"
scale={0.8}
position={[-0.2,0.9,-0.1]}
/>
)}

<AnimatedGPU visible={selectedParts.gpu}/>

{selectedParts.cooler && (
<Model
path="/models/cooler.glb"
scale={0.9}
position={[0,1,-0.1]}
/>
)}

{selectedParts.fans && (
<>
<Model path="/models/fan.glb" scale={0.7} position={[-1,0.8,1]}/>
<Model path="/models/fan.glb" scale={0.7} position={[0,0.8,1]}/>
<Model path="/models/fan.glb" scale={0.7} position={[1,0.8,1]}/>
</>
)}

{selectedParts.psu && (
<Model
path="/models/psu.glb"
scale={0.9}
position={[0,-0.7,0.8]}
/>
)}

</Suspense>

<GlassPanel open={glassPanel}/>

<OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5}/>
</Canvas>

)
}