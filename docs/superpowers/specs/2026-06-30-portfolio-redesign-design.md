# Portfolio Redesign: The Developer's Cosmos

**Date:** 2026-06-30
**Author:** Umesh Gorfad
**Status:** Approved

## Overview

Complete rebuild of umeshgorfad.netlify.app as a scroll-driven 3D space odyssey. Scrolling flies a camera through space along a spline path. Each section is a destination in the cosmos. The portfolio demonstrates the skills it advertises.

**Inspired by:** itomdev.com (3D corridor + scroll camera), everswap.com (Lusion's ScreenPaint distortion + physics scroll + custom shaders), aikawakenichi.com (WebGL + custom cursor + glass distortion).

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Build | Vite | Fast bundler, HMR |
| UI | React 18 | Component framework |
| 3D Engine | React Three Fiber + Drei | WebGL rendering |
| Post-Processing | @react-three/postprocessing | Bloom, ChromAb, Vignette, AO, Grain |
| Scroll | Lenis | Smooth scroll with momentum |
| Animation | GSAP + ScrollTrigger | HTML overlay choreography |
| Shaders | Custom GLSL + three-custom-shader-material | FBO particles, noise displacement, nebula, warp, ripple |
| Styling | Tailwind CSS | HTML overlay styling |
| Typography | Syne (display) + JetBrains Mono (code) + Outfit (body) | Font system |
| Deployment | Netlify | Hosting at umeshgorfad.netlify.app |

## Architecture

Single-page app with two rendering layers:

1. **R3F Canvas (background, z-index: 0)** -- Full viewport, fixed position. Contains the entire 3D scene. Camera position driven by Lenis scroll progress along a CatmullRomCurve3 spline.

2. **HTML Overlay (foreground, z-index: 1)** -- Scrollable content with pointer-events on interactive elements only. GSAP ScrollTrigger animates content in/out at scroll thresholds.

```
<Lenis>
  <LoadingScreen />        // blocks until 3D assets loaded
  <CustomCursor />          // magnetic cursor + hover states
  <Canvas>
    <Environment />         // HDRI lighting
    <CameraRig />           // spline-following camera
    <CosmosScene>
      <StarField />         // instanced 5000 points
      <NebulaVolumes />     // raymarched clouds
      <HeroConstellation /> // FBO particle text morph
      <MetricsStation />    // glass metric panels
      <NeuralWeb />         // instanced nodes + lines
      <TimelineSpline />    // glowing tube path
      <SkillPlanets />      // orbital system
      <ProjectHolograms />  // glass cards carousel
      <ContactBeacon />     // planet surface + beacon
    </CosmosScene>
    <PostProcessing />      // Bloom + ChromAb + Vignette + N8AO + Noise
  </Canvas>
  <HTMLOverlay>
    <Navbar />              // glassmorphism, auto-hide
    <HeroContent />
    <MetricsContent />
    <AboutContent />
    <ExperienceCards />
    <SkillTags />
    <ProjectDetails />
    <ContactForm />
    <ScrollProgress />      // thin right-edge indicator
  </HTMLOverlay>
</Lenis>
```

## Camera Journey (8 Chapters)

### Chapter 1: Genesis (scroll 0-12%)
- **Camera:** [0, 0, 50] → [0, 0, 30], slow push-in
- **3D:** 10K FBO particles morph into "UMESH" text, dissolve into stars. Crystal icosahedron (MeshTransmissionMaterial + noise vertex displacement) floats center-right. Instanced star field at 3 parallax depths. Nebula volume shader pulses cyan/purple.
- **HTML:** Name, "Agentic Full-Stack Developer", tagline, CTA buttons, social links, "Available" badge.
- **Interaction:** Mouse tilts camera ±3°. Ripple displacement through particle field.
- **Transition:** Particles stretch into warp streaks, camera accelerates.

### Chapter 2: Warp Jump (scroll 12-15%)
- **Camera:** [0, 0, 30] → [0, 0, -20], fast z-push
- **3D:** Stars stretch via vertex shader. Bloom intensity spikes. ChromaticAberration ramps to 0.05. Pure 3D spectacle, no HTML.
- **Transition:** Streaks decelerate, resolve into glass panels.

### Chapter 3: Command Station (scroll 15-25%)
- **Camera:** [0, 0, -20] → [0, 2, -40], slight upward drift
- **3D:** Four glass panels (MeshTransmissionMaterial) materialize from particles. Holographic Text3D numbers with emissive glow. HUD frame lines draw themselves. Panels tilt toward cursor with spring physics.
- **HTML:** Metric labels + spring-physics counter animations (80K+, 40+, 73%, 5+).
- **Transition:** Panels dissolve, camera turns right toward neural web.

### Chapter 4: Neural Core (scroll 25-40%)
- **Camera:** [0, 2, -40] → [8, 0, -65], drift right
- **3D:** Neural network -- 30+ InstancedMesh sphere nodes, Line geometry connections with traveling energy pulses. Nodes light up sequentially on scroll (simple→complex = growth). Core node has iridescent Fresnel shader. Mouse proximity brightens nearby nodes.
- **HTML:** Story text with typewriter effect. "Commerce grad → Self-taught → Fortune 500".
- **Transition:** Nodes rearrange into vertical line, become timeline path.

### Chapter 5: Flight Path (scroll 40-65%)
- **Camera:** Follows curving spline, always looking along tangent
- **3D:** Glowing TubeGeometry career path. 4 holographic waystation cards materialize from particles at company positions (UnitPay, xR Studio, Webcubic, JarvioT). Energy flows through tube in scroll direction.
- **HTML:** Company, role, dates, achievements. GSAP SplitText reveals. Cards alternate left/right.
- **Transition:** Tube spirals outward, becomes first orbit ring.

### Chapter 6: Skill Nebula (scroll 65-80%)
- **Camera:** Orbits center, scroll controls orbit angle
- **3D:** Solar system. Emissive sun with bloom. 5 orbit rings. Skill-category planets with unique materials (Frontend=crystalline, Backend=metallic, AI=iridescent, DevOps=green emissive, Tools=amber). Individual techs orbit as instanced spheres with text sprites. Hover planet → spring camera zoom.
- **HTML:** Category labels and tech tags.
- **Transition:** Planets compress, scatter as project cards.

### Chapter 7: Orbital Stations (scroll 80-92%)
- **Camera:** Pulls back, scroll rotates carousel
- **3D:** 4 glass project cards in arc. MeshTransmissionMaterial + chromatic aberration. Each has unique accent glow. Hover → spring-physics zoom + cursor tilt. Animated shader border.
- **HTML:** Project name, role, description, tech tags, links. Expandable on click.
- **Transition:** Camera tilts down, cards rise above, planet surface below.

### Chapter 8: Signal Beacon (scroll 92-100%)
- **Camera:** [x, 20, z] → [x, 2, z], descent to surface
- **3D:** Planet surface (PlaneGeometry + noise displacement). Beacon tower (CylinderGeometry) with pulsing light sphere (emissive + bloom). Signal rings (TorusGeometry) expand outward. Fog near surface.
- **HTML:** "Let's Connect", contact details, terminal-style form, footer.

## Post-Processing Pipeline

```
<EffectComposer>
  <Bloom luminanceThreshold={1.0} intensity={0.8} />
  <ChromaticAberration offset={[0.002, 0.002]} />
  <Vignette darkness={0.5} />
  <N8AO intensity={0.5} />
  <Noise opacity={0.08} />
  <ToneMapping mode={ACESFilmic} />
</EffectComposer>
```

ChromaticAberration ramps during warp (0.002→0.05→0.002). Bloom pulses with scroll velocity.

## Pro-Level UX Details

- **Loading Screen:** Full overlay, progress bar, preloads all assets. Animated reveal.
- **Custom Cursor:** Smooth-following dot+ring. Magnetic pull on hoverable elements. Hidden on touch.
- **Lenis Smooth Scroll:** Momentum-based. Lerped before feeding to camera for butter-smooth movement.
- **Scroll Progress:** Thin colored line on right edge showing journey position.
- **Mobile Fallback:** Fewer particles, no post-processing, simpler shaders. PerformanceMonitor auto-adapts.
- **SEO Layer:** Hidden semantic HTML (sr-only pattern). JSON-LD Person schema.
- **Mouse Distortion:** ScreenPaint-style ripple -- cursor movement creates displacement waves across scene via DataTexture.

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| --space-black | #030014 | Background |
| --cyan | #4fc3f7 | Primary accent |
| --purple | #a78bfa | Secondary accent |
| --pink | #f472b6 | Highlight |
| --green | #22c55e | Status/success |
| --amber | #f59e0b | Warning/tools |

## Content Data (from resume)

### Personal
- Name: Umesh Gorfad
- Title: Agentic Full-Stack Developer
- Tagline: "Commerce grad turned developer. I don't just write code — I understand the business it serves."
- Email: gorfadumesh1213@gmail.com
- Phone: +91 9924992637
- Location: Surat, Gujarat, India
- LinkedIn: linkedin.com/in/gorfad-umesh-98711b198
- GitHub: github.com/gorfadumesh

### Metrics
- 80K+ Users Served
- 40+ Features Shipped
- 73% Load Time Reduced
- 5+ Years Experience

### Experience
1. UnitPay -- Agentic Full-Stack Developer (Mar 2025–Present)
2. xR Studio LLP -- React Developer (Jun 2023–Dec 2024)
3. Webcubic Technologies -- React Developer (Nov 2021–May 2023)
4. JarvioT Technologies -- Frontend Developer (Oct 2020–Oct 2021)

### Skills
- AI & Agentic: Claude Code, Cursor AI, GitHub Copilot, MCP Protocol, GPT-4 API
- Frontend: React 18, Next.js 14, TypeScript, Redux Toolkit, Tailwind CSS, MUI, Chakra UI
- Backend: Node.js, NestJS, Express.js, FastAPI, REST APIs, GraphQL, WebSockets
- Database: PostgreSQL, MongoDB, Firebase
- Cloud & DevOps: AWS, Docker, Vercel, CI/CD, Git
- Testing: Jest, Playwright, RTL
- Payments: Stripe, Stripe Connect

### Projects
1. Assessment Automation Platform (EdTech) -- Lead Developer
2. Wolfpack Trading Platform (Fintech) -- Frontend Developer
3. Nilo Health Gamification App -- Frontend Developer
4. MonkeyBox Meal Delivery -- Frontend Developer

### Education
- Bachelor of Commerce, BKNMU Junagadh (2017-2020)

### Languages
- English, Hindi, Gujarati
