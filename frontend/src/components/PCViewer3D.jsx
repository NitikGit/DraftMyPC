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

  fans:[
    "Object_78","Object_79","Object_20",
    "Object_74","Object_76","Object_83","Object_89"
  ],

  storage:[
    "Object_46","Object_47",
    "Object_53","Object_54",
    "Object_55","Object_56"
  ],

  cooler:[
    "Object_16","Object_18",
    "Object_62","Object_63"
  ],

  case:[
    "Object_65","Object_67",
    "Object_68","Object_70",
    "Object_72","Object_81",
    "Object_87"
  ]
}

function FullPC({ selectedParts, caseColor, glassPanel }){

  const { scene } = useGLTF("/models/pc_full.glb")

  const model = useMemo(()=>scene.clone(),[scene])

  const fanMeshes = useRef([])

  useEffect(()=>{

    fanMeshes.current = []

    model.traverse((child)=>{

      if(!child.isMesh) return

      const name = child.name

      child.visible = false

      // CASE always visible
      if(PART_MAP.case.includes(name)){
        child.visible = true

        // apply case color
        child.material = child.material.clone()
        child.material.color = new THREE.Color(caseColor)
      }

      // glass panel toggle
      if(name === "Object_70" || name === "Object_72"){
        child.visible = glassPanel
      }

      if(PART_MAP.cpu.includes(name))
        child.visible = !!selectedParts.cpu

      if(PART_MAP.motherboard.includes(name))
        child.visible = !!selectedParts.motherboard

      if(PART_MAP.psu.includes(name))
        child.visible = !!selectedParts.psu

      if(PART_MAP.gpu.includes(name))
        child.visible = !!selectedParts.gpu

      if(PART_MAP.ram.includes(name))
        child.visible = !!selectedParts.ram

      if(PART_MAP.storage.includes(name))
        child.visible = !!selectedParts.storage

      if(PART_MAP.cooler.includes(name))
        child.visible = !!selectedParts.cooler

      if(PART_MAP.fans.includes(name)){
        child.visible = !!selectedParts.fans
        fanMeshes.current.push(child)
      }

    })

  },[model, selectedParts, caseColor, glassPanel])


  useFrame(()=>{
    fanMeshes.current.forEach(mesh=>{
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
  rgbEnabled,
  caseColor,
  glassPanel
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
        <FullPC
          selectedParts={selectedParts}
          caseColor={caseColor}
          glassPanel={glassPanel}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
      />

    </Canvas>

  )

}
//pre load the 3d asset for better performance when user navigates to the 3D viewer
useGLTF.preload("/models/pc_full.glb")