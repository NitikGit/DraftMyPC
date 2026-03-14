import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense, useMemo, useEffect, useRef } from "react"
import * as THREE from "three"


const PART_MAP = {

  cpu:["Object_4","Object_5","Object_6"],

  gpu:[
    "Object_8","Object_9","Object_10",
    "Object_11","Object_12","Object_13","Object_14"
  ],

  ram:[
    "Object_22","Object_23","Object_24",
    "Object_26","Object_27","Object_28",
    "Object_30","Object_31","Object_32",
    "Object_34","Object_35","Object_36"
  ],

  motherboard:[
    "Object_38","Object_39","Object_40",
    "Object_42","Object_44","Object_51"
  ],

  psu:["Object_58","Object_60"],

  fans:["Object_78","Object_79"]

}


function FullPC({ selectedParts }){

  const { scene } = useGLTF("/models/pc_full.glb")

  const model = useMemo(()=>scene.clone(),[scene, selectedParts])

  const gpuMeshes = useRef([])
  const ramMeshes = useRef([])
  const fanMeshes = useRef([])

useEffect(()=>{

  gpuMeshes.current = []
  ramMeshes.current = []
  fanMeshes.current = []

  model.traverse((child)=>{

    if(!child.isMesh) return

    const name = child.name

    // hide everything first
    child.visible = false

    if(PART_MAP.cpu.includes(name)){
      child.visible = !!selectedParts.cpu
    }

    if(PART_MAP.motherboard.includes(name)){
      child.visible = !!selectedParts.motherboard
    }

    if(PART_MAP.psu.includes(name)){
      child.visible = !!selectedParts.psu
    }

    if(PART_MAP.gpu.includes(name)){
      child.visible = !!selectedParts.gpu
      gpuMeshes.current.push(child)
    }

    if(PART_MAP.ram.includes(name)){
      child.visible = !!selectedParts.ram
      ramMeshes.current.push(child)
    }

    if(PART_MAP.fans.includes(name)){
      child.visible = !!selectedParts.fans
      fanMeshes.current.push(child)
    }

  })

},[model,selectedParts])


  useFrame(()=>{
    fanMeshes.current.forEach(mesh=>{

      if(selectedParts.fans)
        mesh.rotation.z += 0.25

    })

  })


  return (
    <primitive
    object={model}
    scale={1.8}
    position={[0,-1.2,0]}
    rotation={[0, Math.PI, 0]}
    />
  )

}



export default function PCViewer3D({

  selectedParts,
  rgbEnabled

}){

  return(

    <Canvas camera={{position:[3,2,4],fov:45}}>

      <Environment preset="city"/>

      <ambientLight intensity={0.8}/>
      <directionalLight position={[5,5,5]} intensity={2}/>

      {rgbEnabled && (
        <>
          <pointLight color="cyan" intensity={2} position={[-1,1,1]}/>
          <pointLight color="magenta" intensity={2} position={[1,1,1]}/>
        </>
      )}

      <Suspense fallback={null}>
        <FullPC selectedParts={selectedParts}/>
      </Suspense>

      <OrbitControls
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      />

    </Canvas>

  )

}
useGLTF.preload("/models/pc_full.glb")