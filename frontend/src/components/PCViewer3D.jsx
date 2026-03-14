import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { Suspense, useEffect, useMemo, useRef } from "react"


function FullPC({ selectedParts }) {

  const { scene } = useGLTF("/models/pc_full.glb")

  const model = useMemo(() => scene.clone(), [scene])

  useEffect(() => {

    model.traverse((child) => {

      // 🔎 PRINT MESH NAMES TO CONSOLE
      console.log("Mesh:", child.name)

      if (!child.isMesh) return

      const name = child.name.toLowerCase()

      if (name.includes("gpu")) {
        child.visible = selectedParts.gpu
      }

      if (name.includes("ram")) {
        child.visible = selectedParts.ram
      }

      if (name.includes("fan")) {
        child.visible = selectedParts.fans
      }

      if (name.includes("cooler") || name.includes("radiator")) {
        child.visible = selectedParts.cooler
      }

      if (name.includes("motherboard") || name.includes("board")) {
        child.visible = selectedParts.motherboard
      }

      if (name.includes("psu") || name.includes("power")) {
        child.visible = selectedParts.psu
      }

      if (name.includes("cpu")) {
        child.visible = selectedParts.cpu
      }

    })

  }, [model, selectedParts])


  return (
    <primitive
      object={model}
      scale={1}
      position={[0, -0.6, 0]}
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
    <mesh ref={ref} position={[1.1, 0.4, 0]}>
      <boxGeometry args={[0.02, 1.5, 1.4]} />
      <meshStandardMaterial transparent opacity={0.25} />
    </mesh>
  )
}



export default function PCViewer3D({
  rgbEnabled,
  glassPanel,
  selectedParts
}) {

  return (

    <Canvas camera={{ position: [4, 3, 6], fov: 45 }}>

      <Environment preset="city" />

      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      {rgbEnabled && (
        <>
          <pointLight color="cyan" intensity={2} position={[-1, 1, 1]} />
          <pointLight color="magenta" intensity={2} position={[1, 1, 1]} />
        </>
      )}

      <Suspense fallback={null}>
        <FullPC selectedParts={selectedParts} />
      </Suspense>

      <GlassPanel open={glassPanel} />

      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />

    </Canvas>

  )
}