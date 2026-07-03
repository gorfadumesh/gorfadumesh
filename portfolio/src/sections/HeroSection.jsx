import { useEffect, useRef } from 'react'
import { gsap } from '../libs/gsap'
import { personal } from '../data/content'

export function HeroSection() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ delay: 0.3 })

      // Status badge
      tl.from('.hero-badge', {
        y: -15, opacity: 0, duration: 0.6, ease: 'power3.out',
      })

      // Headline words -- stagger up with clip
      .from('.h-word', {
        y: '120%',
        stagger: 0.08,
        duration: 1.1,
        ease: 'power4.out',
      }, 0.5)

      // Accent word color fill
      .from('.h-accent', {
        backgroundSize: '0% 100%',
        duration: 0.8,
        ease: 'power2.inOut',
      }, 1.2)

      // Divider line draws
      .from('.hero-divider', {
        scaleX: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
      }, 1.0)

      // Role + description fade in
      .from('.hero-desc-block > *', {
        y: 20, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      }, 1.3)

      // Bottom bar
      .from('.hero-footer > *', {
        y: 15, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out',
      }, 1.5)

      // Scroll cue
      .from('.scroll-cue', {
        opacity: 0, duration: 0.5,
      }, 2.0)

      // === SCROLL OUT ===
      gsap.to('.hero-main', {
        y: -180, opacity: 0, filter: 'blur(10px)', ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '80% top', scrub: 2 },
      })
      gsap.to('.hero-footer', {
        y: -60, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '50% top', scrub: 1.5 },
      })
      gsap.to('.scroll-cue', {
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: '3% top', end: '10% top', scrub: 1 },
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const Word = ({ children, accent }) => (
    <span className="inline-block overflow-hidden mr-[0.25em]">
      <span className={`h-word inline-block ${accent ? 'h-accent' : ''}`}
        style={accent ? {
          background: 'linear-gradient(90deg, #ef4444, #ef4444)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        } : undefined}>
        {children}
      </span>
    </span>
  )

  return (
    <section ref={sectionRef} id="section-1" className="relative h-screen overflow-hidden flex flex-col justify-between">

      {/* === MAIN CONTENT === */}
      <div className="hero-main flex-1 flex items-center px-8 md:px-14 relative z-[2]">
        <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-12 gap-8 items-end">

          {/* Left -- Headline (takes 7 cols) */}
          <div className="md:col-span-7">
            {/* Badge */}
            <div className="hero-badge flex items-center gap-2.5 mb-8">
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#ef4444', boxShadow: '0 0 10px rgba(239,68,68,0.6)', animation: 'pulse 2.5s ease infinite' }} />
              <span className="text-[10px] tracking-[3px] uppercase font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Open to work
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-[clamp(2.8rem,7.5vw,7rem)] font-black leading-[0.92] tracking-[-0.04em]">
              <Word>I</Word>
              <Word>build</Word>
              <br className="hidden md:block" />
              <Word>products</Word>
              <Word>that</Word>
              <br className="hidden md:block" />
              <Word accent>matter</Word>
              <Word accent>.</Word>
            </h1>
          </div>

          {/* Right -- Glassmorphism info card */}
          <div className="md:col-span-4 md:col-start-9 md:pb-2">
            <div
              className="hero-desc-block relative p-6 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Top red accent line */}
              <div className="absolute top-0 left-6 right-6 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #ef4444, transparent)' }} />

              {/* Role */}
              <p className="text-[10px] tracking-[3px] uppercase font-semibold mb-4" style={{ color: '#ef4444' }}>
                {personal.title}
              </p>

              {/* Tagline */}
              <p className="text-[13px] leading-[1.8] mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {personal.tagline}
              </p>

              {/* Divider */}
              <div className="h-[1px] mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />

              {/* Metrics grid */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { v: '5+', l: 'Years' },
                  { v: '80K', l: 'Users' },
                  { v: '40+', l: 'Shipped' },
                  { v: '73%', l: 'Faster' },
                ].map((m) => (
                  <div key={m.l} className="text-center py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <span className="text-base font-black text-white block leading-none">{m.v}</span>
                    <span className="text-[7px] tracking-[1.5px] uppercase block mt-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>{m.l}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-[1px] mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />

              {/* CTA links */}
              <div className="flex items-center gap-4">
                <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-lg text-[10px] tracking-[2px] uppercase font-bold cursor-pointer transition-all duration-300 hover:brightness-110"
                  style={{ color: '#fff', background: '#ef4444' }}>
                  Resume
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-lg text-[10px] tracking-[2px] uppercase font-semibold cursor-pointer transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  LinkedIn
                </a>
                <a href={`mailto:${personal.email}`}
                  className="flex-1 text-center py-2.5 rounded-lg text-[10px] tracking-[2px] uppercase font-semibold cursor-pointer transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  Email
                </a>
              </div>

              {/* Bottom corner accents */}
              <div className="absolute bottom-0 left-6 right-6 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* === BOTTOM LOCATION BAR === */}
      <div className="hero-footer flex items-center justify-between px-8 md:px-14 pb-8 relative z-[2]">
        <span className="text-[9px] tracking-[3px] uppercase" style={{ color: 'rgba(255,255,255,0.1)' }}>
          {personal.location}
        </span>
        <span className="text-[9px] tracking-[3px] uppercase hidden md:block" style={{ color: 'rgba(255,255,255,0.1)' }}>
          Portfolio — 2026
        </span>
      </div>

      {/* === SCROLL CUE === */}
      <div className="scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 z-[2]">
        <div className="w-5 h-8 rounded-full flex justify-center pt-2" style={{ border: '1.5px solid rgba(255,255,255,0.08)' }}>
          <div className="w-[3px] h-[3px] rounded-full bg-red-500" style={{
            animation: 'scrollDot 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }} />
        </div>
      </div>
    </section>
  )
}
