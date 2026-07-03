import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text3D, Center, Float, useTexture, useMatcapTexture } from "@react-three/drei"
import { useEffect, useRef, useMemo } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "../libs/gsap"

export function Model3D() {
  return (
    <Canvas
      id="canvas-elem"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <BrandScene />
    </Canvas>
  )
}

// Floating geometric accent shape
function GeoShape({ geometry, position, scale, speed, matcap, rotAxis }) {
  const ref = useRef()
  const initialPos = useRef(position)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.x = initialPos.current[0] + Math.sin(t * 0.7) * 0.15
    ref.current.position.y = initialPos.current[1] + Math.cos(t * 0.5) * 0.2
    ref.current.position.z = initialPos.current[2] + Math.sin(t * 0.3) * 0.1
    ref.current.rotation[rotAxis] += 0.005
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </Float>
  )
}

function BrandScene() {
  const groupRef = useRef()
  const textRef = useRef()
  const mousePos = useRef({ x: 0, y: 0 })

  const { camera, gl } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 5)
    gl.toneMapping = THREE.NoToneMapping
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [camera, gl])

  // Load matcap textures
  const matcapTextures = useTexture(
    Array.from({ length: 20 }, (_, i) => `/matcap/mat-${i + 1}.png`)
  ).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })

  const mat2 = matcapTextures[1]   // Silver
  const mat8 = matcapTextures[7]   // Warm gold
  const mat9 = matcapTextures[8]   // Blue steel
  const mat10 = matcapTextures[9]  // Copper
  const mat12 = matcapTextures[11] // Rose
  const mat13 = matcapTextures[12] // Purple
  const mat19 = matcapTextures[18] // Dark chrome

  // Material transition system (same as dogstudio)
  const materialState = useRef({
    uMatcap1: { value: mat19 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  })

  // Custom matcap material with transition shader
  const textMaterial = useMemo(() => {
    const mat = new THREE.MeshMatcapMaterial({
      matcap: mat2,
      flatShading: false,
    })

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uMatcapTexture1 = materialState.current.uMatcap1
      shader.uniforms.uMatcapTexture2 = materialState.current.uMatcap2
      shader.uniforms.uProgress = materialState.current.uProgress

      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        `
          uniform sampler2D uMatcapTexture1;
          uniform sampler2D uMatcapTexture2;
          uniform float uProgress;
          void main() {
        `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 matcapColor = texture2D( matcap, uv );",
        `
          vec4 matcapColor1 = texture2D(uMatcapTexture1, uv);
          vec4 matcapColor2 = texture2D(uMatcapTexture2, uv);
          float transitionFactor = 0.2;
          float progress = smoothstep(uProgress - transitionFactor, uProgress, (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5);
          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
        `
      )
    }

    mat.needsUpdate = true
    return mat
  }, [mat2])

  // Mouse parallax -- additive offset, doesn't fight GSAP
  const baseRotation = useRef({ x: 0, y: 0 })
  useFrame((state) => {
    if (!groupRef.current) return
    mousePos.current.x += (state.pointer.x * 0.15 - mousePos.current.x) * 0.02
    mousePos.current.y += (state.pointer.y * 0.08 - mousePos.current.y) * 0.02
    // Add mouse offset on top of GSAP-controlled rotation
    groupRef.current.rotation.y += mousePos.current.x * 0.01
    groupRef.current.rotation.x += -mousePos.current.y * 0.005
  })

  // ONE unified scroll timeline -- no conflicting tweens
  useGSAP(() => {
    if (!groupRef.current) return

    const canvasEl = document.getElementById('canvas-elem')
    const group = groupRef.current

    // Single timeline controlling EVERYTHING
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#footer-end",
        start: "top top",
        end: "bottom bottom",
        scrub: 3,  // higher = smoother
      },
    })

    // ============================================
    // HERO (0% - 15% of timeline)
    // UG floats right-center, slowly rotating
    // ============================================
    master
      .to(group.rotation, { y: Math.PI * 0.6, duration: 3, ease: "none" }, 0)
      .to(group.position, { x: 0.5, y: 0.1, duration: 3, ease: "none" }, 0)

    // ============================================
    // HERO → WORK TRANSITION (15% - 25%)
    // UG recedes deep into space, shrinks, canvas dims
    // NOT disappearing -- just going very far back
    // ============================================
      .to(group.position, { z: -12, x: 0, y: 0, duration: 3, ease: "power2.inOut" }, 3)
      .to(group.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 3, ease: "power2.inOut" }, 3)
      .to(group.rotation, { y: Math.PI * 1.5, duration: 3, ease: "power2.inOut" }, 3)
      .to(canvasEl, { opacity: 0.04, duration: 3, ease: "power2.inOut" }, 3)

    // ============================================
    // WORK SECTION (25% - 55%)
    // UG is tiny and far away, slowly spinning in deep background
    // Canvas at 4% opacity -- ghostly presence, visual continuity
    // ============================================
      .to(group.rotation, { y: Math.PI * 3.5, duration: 6, ease: "none" }, 6)

    // ============================================
    // WORK → FOOTER TRANSITION (55% - 70%)
    // UG slowly drifts forward, grows, canvas brightens GRADUALLY
    // This is the key -- long, slow, smooth return
    // ============================================
      .to(group.position, { z: -3, x: -0.5, y: 0.2, duration: 4, ease: "power1.inOut" }, 12)
      .to(group.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 4, ease: "power1.inOut" }, 12)
      .to(group.rotation, { y: Math.PI * 4, duration: 4, ease: "power1.inOut" }, 12)
      .to(canvasEl, { opacity: 0.35, duration: 4, ease: "power1.inOut" }, 12)

    // ============================================
    // FOOTER CTA (70% - 85%)
    // UG grows bigger, comes forward, canvas brightens more
    // ============================================
      .to(group.position, { z: 1, x: 0, y: 0, duration: 3, ease: "power2.inOut" }, 16)
      .to(group.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 3, ease: "power2.inOut" }, 16)
      .to(group.rotation, { y: Math.PI * 4.5, duration: 3, ease: "none" }, 16)
      .to(canvasEl, { opacity: 0.7, duration: 3, ease: "power2.inOut" }, 16)

    // ============================================
    // GRAND FINALE (85% - 100%)
    // UG fills the screen, full opacity, dramatic
    // ============================================
      .to(group.scale, { x: 5.5, y: 5.5, z: 5.5, duration: 3, ease: "power2.in" }, 19)
      .to(group.position, { z: 3.5, x: 0, y: 0, duration: 3, ease: "power2.in" }, 19)
      .to(group.rotation, { y: Math.PI * 5.2, x: Math.PI * 0.05, duration: 3, ease: "none" }, 19)
      .to(canvasEl, { opacity: 1, duration: 3, ease: "power2.in" }, 19)

  }, [])

  // Matcap change on project hover
  useEffect(() => {
    const changeMatcap = (newMatcap) => {
      materialState.current.uMatcap1.value = newMatcap
      gsap.to(materialState.current.uProgress, {
        value: 0.0,
        duration: 0.3,
        onComplete: () => {
          materialState.current.uMatcap2.value = materialState.current.uMatcap1.value
          materialState.current.uProgress.value = 1.0
        },
      })
    }

    const entries = [
      ["assessment", mat19],
      ["wolfpack", mat8],
      ["nilo", mat9],
      ["monkeybox", mat12],
      ["unitpay", mat10],
      ["xrstudio", mat13],
      ["webcubic", mat2],
    ]

    entries.forEach(([name, matcap]) => {
      document
        .querySelector(`.title[img-title="${name}"]`)
        ?.addEventListener("mouseenter", () => changeMatcap(matcap))
    })

    document.querySelector(".titles")?.addEventListener("mouseleave", () => changeMatcap(mat2))
  }, [mat2, mat8, mat9, mat10, mat12, mat13, mat19])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-3, 2, -3]} intensity={1.5} />

      <group ref={groupRef} position={[2.5, -0.3, 0]}>
        {/* Main 3D Text "UG" */}
        <Center>
          <Text3D
            ref={textRef}
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.2}
            height={0.4}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.02}
            bevelSegments={5}
            curveSegments={12}
            material={textMaterial}
          >
            UG
          </Text3D>
        </Center>

        {/* Floating geometric shapes around the monogram */}
        <GeoShape
          geometry={<icosahedronGeometry args={[0.2, 0]} />}
          position={[2, 1.2, 0.5]}
          scale={1}
          speed={0.6}
          matcap={mat13}
          rotAxis="y"
        />
        <GeoShape
          geometry={<octahedronGeometry args={[0.15, 0]} />}
          position={[-1.8, -0.8, 0.3]}
          scale={1}
          speed={0.5}
          matcap={mat8}
          rotAxis="x"
        />
        <GeoShape
          geometry={<torusKnotGeometry args={[0.12, 0.04, 64, 16]} />}
          position={[1.5, -1, -0.5]}
          scale={1}
          speed={0.45}
          matcap={mat9}
          rotAxis="z"
        />
        <GeoShape
          geometry={<dodecahedronGeometry args={[0.13, 0]} />}
          position={[-1.2, 1.5, -0.3]}
          scale={1}
          speed={0.55}
          matcap={mat10}
          rotAxis="y"
        />
        <GeoShape
          geometry={<tetrahedronGeometry args={[0.18, 0]} />}
          position={[2.2, -0.5, -0.8]}
          scale={1}
          speed={0.4}
          matcap={mat12}
          rotAxis="x"
        />
        <GeoShape
          geometry={<boxGeometry args={[0.15, 0.15, 0.15]} />}
          position={[-2, 0.3, 0.8]}
          scale={1}
          speed={0.65}
          matcap={mat19}
          rotAxis="z"
        />

        {/* Larger accent shapes further back */}
        <GeoShape
          geometry={<torusGeometry args={[0.3, 0.08, 16, 32]} />}
          position={[0, 2, -1.5]}
          scale={1}
          speed={0.3}
          matcap={mat2}
          rotAxis="x"
        />
        <GeoShape
          geometry={<icosahedronGeometry args={[0.25, 1]} />}
          position={[-2.5, -1.5, -1]}
          scale={1}
          speed={0.35}
          matcap={mat13}
          rotAxis="y"
        />
      </group>
    </>
  )
}
