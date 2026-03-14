import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense, useMemo, useEffect, useRef } from "react"
import * as THREE from "three"

function FullPC({ selectedParts, caseColor }) {

  const { scene } = useGLTF("/models/pc_full.glb")

  const model = useMemo(() => scene.clone(), [scene])

  const fanMeshes = useRef([])

  useEffect(() => {

    fanMeshes.current = []

    model.traverse((child) => {

      if (!child.isMesh) return

      const name = child.name
      const mat = child.material?.name

      //default visible
      child.visible = true

      //color case
      if (mat === "Case" || mat === "material_15") {
        if (caseColor) {
          child.material = child.material.clone()
          child.material.color.set(caseColor)
        }
        return
      }

      // hide components if not selected
      if (name.includes("Object_4") || name.includes("Object_5") || name.includes("Object_6")) {
        child.visible = !!selectedParts.cpu
      }

      if (name.includes("Object_8") || name.includes("Object_9") || name.includes("Object_10")) {
        child.visible = !!selectedParts.gpu
      }

      if (name.includes("Object_22") || name.includes("Object_23") || name.includes("Object_24")) {
        child.visible = !!selectedParts.ram
      }

      if (name.includes("Object_38") || name.includes("Object_39") || name.includes("Object_40")) {
        child.visible = !!selectedParts.motherboard
      }

      if (name.includes("Object_58") || name.includes("Object_60")) {
        child.visible = !!selectedParts.psu
      }

      if (name.includes("Object_78") || name.includes("Object_79")) {
        child.visible = !!selectedParts.fans
        fanMeshes.current.push(child)
      }

    })

  }, [model, selectedParts, caseColor])

  useFrame(() => {
    fanMeshes.current.forEach(mesh => {
      mesh.rotation.z += 0.25
    })
  })

  return (
    <primitive
      object={model}
      scale={1.8}
      position={[0, -1.2, 0]}
      rotation={[0, Math.PI, 0]}
    />
  )
}

export default function PCViewer3D({
  selectedParts,
  rgbEnabled,
  caseColor
}) {

  return (

    <Canvas camera={{ position:[2,1.6,2.4], fov:45 }}>

      <color attach="background" args={["#202020"]} />

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
        />
      </Suspense>

      <OrbitControls enablePan={false} enableDamping dampingFactor={0.05} />

    </Canvas>
  )
}

useGLTF.preload("/models/pc_full.glb")