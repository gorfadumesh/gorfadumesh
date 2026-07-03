# Portfolio Redesign: The Developer's Cosmos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scroll-driven 3D portfolio where scrolling flies a camera through space, with 8 distinct chapters.

**Architecture:** Single R3F Canvas (background) + HTML Overlay (foreground). Lenis smooth scroll drives camera along a CatmullRomCurve3 spline. GSAP ScrollTrigger choreographs HTML content.

**Tech Stack:** Vite, React 18, React Three Fiber, Drei, @react-three/postprocessing, GSAP + ScrollTrigger, Lenis, Tailwind CSS, custom GLSL shaders.

**Spec:** `docs/superpowers/specs/2026-06-30-portfolio-redesign-design.md`

---

## File Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
├── public/
│   ├── fonts/                      # Self-hosted fonts
│   └── env.hdr                     # HDRI environment (small, 256px)
├── src/
│   ├── main.jsx                    # ReactDOM entry
│   ├── App.jsx                     # Root: Lenis + Canvas + Overlay
│   ├── index.css                   # Tailwind + globals + fonts
│   ├── data/
│   │   └── content.js              # All personal data
│   ├── hooks/
│   │   ├── useScrollProgress.js    # Lenis scroll 0-1
│   │   └── useMouse.js             # Normalized mouse + lerped
│   ├── components/
│   │   ├── LoadingScreen.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Navbar.jsx
│   │   └── ScrollProgress.jsx
│   ├── canvas/
│   │   ├── Scene.jsx               # Canvas wrapper
│   │   ├── CameraRig.jsx           # Spline camera
│   │   ├── StarField.jsx           # Instanced points
│   │   ├── Nebula.jsx              # Shader clouds
│   │   ├── HeroConstellation.jsx   # Particle text
│   │   ├── CrystalAvatar.jsx       # MeshTransmissionMaterial sphere
│   │   ├── WarpEffect.jsx          # Star stretch transition
│   │   ├── MetricsStation.jsx      # Glass panels
│   │   ├── NeuralWeb.jsx           # Node network
│   │   ├── TimelineSpline.jsx      # Tube path + waystations
│   │   ├── SkillPlanets.jsx        # Solar system
│   │   ├── ProjectHolograms.jsx    # Glass card carousel
│   │   ├── ContactBeacon.jsx       # Planet + beacon
│   │   └── Effects.jsx             # EffectComposer
│   ├── shaders/
│   │   ├── noise.glsl              # Simplex/curl noise
│   │   ├── nebula.frag             # Nebula fragment
│   │   ├── particles.vert          # FBO particle vertex
│   │   └── particles.frag          # FBO particle fragment
│   └── sections/
│       ├── HeroSection.jsx
│       ├── MetricsSection.jsx
│       ├── AboutSection.jsx
│       ├── ExperienceSection.jsx
│       ├── SkillsSection.jsx
│       ├── ProjectsSection.jsx
│       └── ContactSection.jsx
```

---

## Task 1: Project Scaffold + Dev Environment

**Files:** Create all config files and install dependencies.

- [ ] **Step 1: Create project with Vite**
```bash
cd /Users/vijaygorfad/Desktop/Umesh/gorfadumesh
npm create vite@latest portfolio -- --template react
cd portfolio
```

- [ ] **Step 2: Install core dependencies**
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install gsap @studio-freight/lenis
npm install tailwindcss @tailwindcss/vite
npm install three-custom-shader-material
npm install postprocessing
```

- [ ] **Step 3: Configure Tailwind** — Create `src/index.css` with `@import "tailwindcss"` and custom theme (colors, fonts).

- [ ] **Step 4: Configure Vite** — Add GLSL import support via `vite-plugin-glsl`, add Tailwind plugin.
```bash
npm install -D vite-plugin-glsl
```

- [ ] **Step 5: Create base `index.html`** with Google Fonts (Syne, JetBrains Mono, Outfit), viewport meta, dark background.

- [ ] **Step 6: Create `src/main.jsx`** — ReactDOM.createRoot, import index.css.

- [ ] **Step 7: Create `src/App.jsx`** — Skeleton: just a dark div with "Loading..." text. Verify dev server runs.
```bash
npm run dev
```

- [ ] **Step 8: Create `netlify.toml`** — Build command, publish dir, SPA redirect.

- [ ] **Step 9: Commit**

---

## Task 2: Data Layer

**Files:** Create `src/data/content.js`

- [ ] **Step 1: Create content.js** with all personal data exported as named constants:
  - `personal` (name, title, tagline, email, phone, location, linkedin, github, resumeUrl)
  - `metrics` (array of {value, suffix, label})
  - `experience` (array of {role, company, dates, tech, bullets, color})
  - `skills` (object of categories, each with array of tech names)
  - `projects` (array of {name, type, role, description, tech, color, demo, source})
  - `languages` (array of {name, proficiency})

- [ ] **Step 2: Commit**

---

## Task 3: Hooks — Scroll Progress + Mouse

**Files:** Create `src/hooks/useScrollProgress.js`, `src/hooks/useMouse.js`

- [ ] **Step 1: Create useScrollProgress** — Uses Lenis instance to track scroll progress (0-1). Stores in a mutable ref (not React state) for 60fps reads in useFrame. Also exposes scroll velocity.

- [ ] **Step 2: Create useMouse** — Tracks normalized mouse position (-1 to 1). Lerps for smooth follow. Stores in mutable ref.

- [ ] **Step 3: Create Lenis wrapper in App.jsx** — Initialize Lenis, raf loop, provide scroll progress via context.

- [ ] **Step 4: Verify** — Add a temporary scroll-position readout div. Scroll page and confirm values update.

- [ ] **Step 5: Commit**

---

## Task 4: R3F Canvas + Camera Rig + Star Field

**Files:** Create `src/canvas/Scene.jsx`, `src/canvas/CameraRig.jsx`, `src/canvas/StarField.jsx`

- [ ] **Step 1: Create Scene.jsx** — `<Canvas>` wrapper with camera settings (fov: 60, near: 0.1, far: 2000). Sets `gl={{ antialias: true, alpha: false }}`. Background color #030014. Adds `<Environment>` with low-res HDRI.

- [ ] **Step 2: Create CameraRig.jsx** — Define CatmullRomCurve3 with ~10 control points mapping the full journey path. In useFrame, read scroll progress, get point + tangent on curve, lerp camera position and lookAt. Add ±3° mouse tilt offset.

- [ ] **Step 3: Create StarField.jsx** — InstancedMesh with 5000 small spheres (or Points with custom shader) at random positions in a large bounding box. 3 depth layers with different sizes/opacities for parallax. Use `<Stars>` from Drei as initial version, replace with custom instanced version later.

- [ ] **Step 4: Wire into App.jsx** — Add Scene with CameraRig + StarField. Create a scrollable `<div>` with height `1300vh` (total journey length) so Lenis has scroll distance.

- [ ] **Step 5: Verify** — Dev server shows stars. Scrolling moves camera through space.

- [ ] **Step 6: Commit**

---

## Task 5: Nebula + Post-Processing

**Files:** Create `src/canvas/Nebula.jsx`, `src/canvas/Effects.jsx`, `src/shaders/noise.glsl`, `src/shaders/nebula.frag`

- [ ] **Step 1: Create noise.glsl** — Simplex 3D noise function (Ashima's webgl-noise).

- [ ] **Step 2: Create Nebula.jsx** — 3-4 large semi-transparent planes/spheres with custom ShaderMaterial. Fragment shader samples noise at varying scales for volumetric cloud look. Cyan/purple color. Pulse animation via u_time uniform. Position along camera path at key points.

- [ ] **Step 3: Create Effects.jsx** — EffectComposer with Bloom (luminanceThreshold: 1.0, intensity: 0.8), ChromaticAberration, Vignette (darkness: 0.5), Noise (opacity: 0.08), ToneMapping (ACESFilmic).

- [ ] **Step 4: Verify** — Scene now has nebula clouds and cinematic post-processing. Stars glow slightly from bloom.

- [ ] **Step 5: Commit**

---

## Task 6: Loading Screen

**Files:** Create `src/components/LoadingScreen.jsx`

- [ ] **Step 1: Create LoadingScreen.jsx** — Full-screen fixed overlay (z-index: 50). Shows "UG" logo animating + progress bar. Uses `useProgress` from Drei to track asset loading. On complete, waits 0.5s, then fades out with GSAP (scale + opacity). Sets pointer-events: none when done.

- [ ] **Step 2: Wire into App.jsx** — Render LoadingScreen above everything.

- [ ] **Step 3: Verify** — Loading screen appears on refresh, fades when assets ready.

- [ ] **Step 4: Commit**

---

## Task 7: Custom Cursor + Navbar + Scroll Progress

**Files:** Create `src/components/CustomCursor.jsx`, `src/components/Navbar.jsx`, `src/components/ScrollProgress.jsx`

- [ ] **Step 1: Create CustomCursor.jsx** — Two divs: small dot (8px) + outer ring (36px). Both follow mouse with different lerp speeds (dot: fast, ring: slower). On hover over `[data-cursor="pointer"]` elements, ring scales up 1.5x. Hidden on touch devices via matchMedia.

- [ ] **Step 2: Create Navbar.jsx** — Fixed top. Glassmorphism (backdrop-blur, semi-transparent bg). Logo `{ UG }` left. Nav links right (About, Experience, Skills, Projects, Contact, Resume button). Auto-hide on scroll down, show on scroll up. Smooth scroll-to on click via Lenis.scrollTo().

- [ ] **Step 3: Create ScrollProgress.jsx** — Thin 3px bar on right edge. Height = scroll progress %. Gradient color matching journey chapters.

- [ ] **Step 4: Verify** — Custom cursor follows mouse. Navbar hides/shows. Progress bar tracks scroll.

- [ ] **Step 5: Commit**

---

## Task 8: Hero Chapter (3D + HTML)

**Files:** Create `src/canvas/HeroConstellation.jsx`, `src/canvas/CrystalAvatar.jsx`, `src/sections/HeroSection.jsx`

- [ ] **Step 1: Create HeroConstellation.jsx** — Points geometry (or InstancedMesh) with ~5000 particles. Initial positions: random spread. Target positions: sampled from "UMESH" text geometry (use Drei's `<Text3D>` geometry, sample surface points). In useFrame, lerp particles between random and text positions based on scroll (0-5% = forming, 5-10% = holding, 10-12% = dissolving). Custom vertex shader with point size attenuation. Emissive color for bloom pickup.

- [ ] **Step 2: Create CrystalAvatar.jsx** — IcosahedronGeometry (detail: 4) with `<MeshTransmissionMaterial>` from Drei. Props: thickness, roughness, chromaticAberration, anisotropy. Add subtle noise vertex displacement via three-custom-shader-material or onBeforeCompile. Float animation via Drei's `<Float>`. Position to the right of center, visible at scroll 0-12%.

- [ ] **Step 3: Create HeroSection.jsx** — HTML overlay for scroll 0-12%. Positioned absolute, full viewport. Contains:
  - "Available for opportunities" badge (green dot + text)
  - `// HELLO WORLD` label with blinking cursor
  - "UMESH" + "GORFAD" (Syne 800, large, gradient text, glitch CSS animation on last name)
  - "Agentic Full-Stack Developer" subtitle
  - Tagline paragraph
  - CTA buttons (Download Resume, Get In Touch)
  - Social icons (GitHub, LinkedIn, Twitter, Email)
  - GSAP: staggered fade-slide-up on mount, fade-out at scroll 8-12%.

- [ ] **Step 4: Verify** — Hero shows particles forming name, crystal sphere, all HTML content. Scrolling fades it out.

- [ ] **Step 5: Commit**

---

## Task 9: Warp Transition + Metrics Chapter

**Files:** Create `src/canvas/WarpEffect.jsx`, `src/canvas/MetricsStation.jsx`, `src/sections/MetricsSection.jsx`

- [ ] **Step 1: Create WarpEffect.jsx** — At scroll 12-15%, modify StarField particles: stretch their z-position based on scroll velocity (vertex shader uniform). Increase ChromaticAberration offset (pass ref to Effects.jsx). Increase Bloom intensity. This is a shader uniform change, not new geometry.

- [ ] **Step 2: Create MetricsStation.jsx** — 4 glass panels (RoundedBox from Drei + MeshTransmissionMaterial) positioned in a grid at the camera path point for scroll 15-25%. Panels scale from 0 → 1 as camera approaches. Each panel tilts toward mouse position with spring-lerped rotation. Add thin edge-glow lines (LineSegments with emissive material for bloom).

- [ ] **Step 3: Create MetricsSection.jsx** — HTML overlay for scroll 15-25%. Four metric counter blocks. Numbers animate from 0 to target with spring easing (use GSAP .to with ease: "power2.out" or custom spring). Labels below numbers. GSAP ScrollTrigger triggers count-up when section enters.

- [ ] **Step 4: Verify** — Scroll through warp effect, arrive at metrics. Numbers count up. Glass panels visible.

- [ ] **Step 5: Commit**

---

## Task 10: Neural Core (About Chapter)

**Files:** Create `src/canvas/NeuralWeb.jsx`, `src/sections/AboutSection.jsx`

- [ ] **Step 1: Create NeuralWeb.jsx** — InstancedMesh for ~30 sphere nodes at predefined positions (visible at scroll 25-40%). Varying sizes (core node larger). Custom shader for iridescent Fresnel effect on core node. Line geometry connecting nodes (BufferGeometry with position attribute). Energy pulse: animate a uniform along each line's length to create traveling glow. On scroll: animate node opacity/scale from simple chain to complex web. Mouse proximity check in useFrame: brighten nearby nodes.

- [ ] **Step 2: Create AboutSection.jsx** — HTML overlay for scroll 25-40%. Left side: your story text. Typewriter reveal effect via GSAP SplitText or character-by-character animation. Key phrases ("self-taught", "Fortune 500", "Commerce grad") highlighted in cyan. Right side is transparent (3D neural web shows through). GSAP ScrollTrigger pins and plays the typewriter.

- [ ] **Step 3: Verify** — Neural network appears, nodes light up on scroll, text types out.

- [ ] **Step 4: Commit**

---

## Task 11: Flight Path (Experience Chapter)

**Files:** Create `src/canvas/TimelineSpline.jsx`, `src/sections/ExperienceSection.jsx`

- [ ] **Step 1: Create TimelineSpline.jsx** — CatmullRomCurve3 defining a curving path (separate from camera spline, but visible alongside it at scroll 40-65%). TubeGeometry from the curve with emissive cyan material. Energy flow: animate UV offset so the glow appears to travel. 4 waystation points on the tube: place small glass card geometry at each. Cards fade in as camera approaches their scroll segment.

- [ ] **Step 2: Create ExperienceSection.jsx** — HTML overlay for scroll 40-65%. 4 experience cards that appear/disappear synced with scroll. Each card has: role, company, dates, tech tags, bullet points. Cards alternate left/right positioning. GSAP SplitText reveals text line-by-line. Each card is pinned for its scroll sub-range then fades out.

- [ ] **Step 3: Verify** — Camera follows timeline path. Company cards appear one by one. Text reveals smoothly.

- [ ] **Step 4: Commit**

---

## Task 12: Skill Nebula (Solar System)

**Files:** Create `src/canvas/SkillPlanets.jsx`, `src/sections/SkillsSection.jsx`

- [ ] **Step 1: Create SkillPlanets.jsx** — Central emissive sun sphere (color: #4fc3f7, intensity > 1.0 for bloom glow). 5 orbit ring geometries (TorusGeometry, very thin). 5 planet spheres on orbits with unique materials:
  - Frontend: MeshTransmissionMaterial (crystalline)
  - Backend: MeshStandardMaterial (metallic, roughness: 0.2)
  - AI: Custom ShaderMaterial (iridescent with noise)
  - DevOps: MeshStandardMaterial (emissive green)
  - Tools: MeshStandardMaterial (emissive amber)

  Scroll (65-80%) rotates the system. Entire group positioned at that camera path segment.

- [ ] **Step 2: Create SkillsSection.jsx** — HTML overlay for scroll 65-80%. Skill category labels positioned near their planets. Individual tech tags grouped by category. Fade in/out with GSAP ScrollTrigger.

- [ ] **Step 3: Verify** — Solar system visible. Planets orbit. Labels appear.

- [ ] **Step 4: Commit**

---

## Task 13: Project Holograms

**Files:** Create `src/canvas/ProjectHolograms.jsx`, `src/sections/ProjectsSection.jsx`

- [ ] **Step 1: Create ProjectHolograms.jsx** — 4 glass card planes (RoundedBox + MeshTransmissionMaterial) arranged in an arc at scroll 80-92%. Each has a colored edge glow (emissive line geometry matching project color). Scroll rotates which card faces camera. Hover: spring-physics scale + tilt via react-spring/three or manual lerp.

- [ ] **Step 2: Create ProjectsSection.jsx** — HTML overlay for scroll 80-92%. Project cards with name, type tag, description, tech tags, demo/source links. Cards appear/disappear synced with the 3D carousel rotation. Expandable detail on click.

- [ ] **Step 3: Verify** — Project cards rotate in 3D. HTML details match. Hover interaction works.

- [ ] **Step 4: Commit**

---

## Task 14: Contact Beacon

**Files:** Create `src/canvas/ContactBeacon.jsx`, `src/sections/ContactSection.jsx`

- [ ] **Step 1: Create ContactBeacon.jsx** — PlaneGeometry (large, below camera) with noise vertex displacement for terrain. CylinderGeometry beacon tower. Sphere at top with emissive material (bloom glow). 3 TorusGeometry signal rings that scale up and fade out (useFrame animation). Fog near surface via custom shader or Drei's `<Fog>`.

- [ ] **Step 2: Create ContactSection.jsx** — HTML overlay for scroll 92-100%. "Let's Connect" heading. Contact info (email, phone, location, LinkedIn, GitHub) as styled list. Terminal-style contact form (dark bg, monospace, blinking cursor prompt). Footer with language proficiency bars and copyright.

- [ ] **Step 3: Verify** — Camera descends to planet. Beacon pulses. Contact form works.

- [ ] **Step 4: Commit**

---

## Task 15: Polish + Mobile + SEO + Deploy

**Files:** Modify multiple files.

- [ ] **Step 1: Mobile fallback** — Add `<PerformanceMonitor>` from Drei. On low performance: reduce particle count, disable post-processing, simplify shaders. Add responsive Tailwind classes to all HTML sections. Test on mobile viewport.

- [ ] **Step 2: SEO layer** — Add `<noscript>` fallback in index.html. Add sr-only semantic HTML with all text content. Add JSON-LD Person schema in `<head>`. Add meta tags (title, description, og:image, etc).

- [ ] **Step 3: Smooth out transitions** — Tune all scroll ranges so chapters flow seamlessly. Adjust camera spline control points. Tune GSAP triggers. Test full journey end-to-end.

- [ ] **Step 4: Performance audit** — Check bundle size. Lazy load heavy 3D components. Ensure 60fps on mid-range hardware. Cap DPR to 1.5.

- [ ] **Step 5: Deploy to Netlify** — Build, test production build locally with `npm run preview`. Push to repo. Configure Netlify build.

- [ ] **Step 6: Final commit**

---

## Execution Notes

- **No TDD for 3D/visual components** — these are verified visually in the browser. Each task ends with "Verify" = open dev server and check.
- **Commit after each task** — incremental progress.
- **Dev server always running** — `npm run dev` in background for hot reload.
- **Shader iteration** — start simple, refine. First pass can use Drei helpers (Stars, Float, MeshTransmissionMaterial). Custom shaders layer on top.
- **Tasks 1-7 are foundational** — must be done in order.
- **Tasks 8-14 can be parallelized** — each chapter is independent once the camera rig works.
- **Task 15 is last** — polish pass after all chapters exist.
