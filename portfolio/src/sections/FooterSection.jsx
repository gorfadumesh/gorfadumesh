import { useEffect, useRef } from 'react'
import { gsap } from '../libs/gsap'
import { personal } from '../data/content'

const SKILLS_MARQUEE = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL',
  'Claude Code', 'Cursor AI', 'AWS', 'Docker', 'GraphQL', 'Tailwind',
  'Stripe', 'Firebase', 'MongoDB', 'Redux', 'WebSockets', 'Figma',
]

export function FooterSection() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-headline span', {
        y: 120,
        opacity: 0,
        rotateX: -40,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-headline', start: 'top 85%' },
      })

      gsap.from('.footer-body > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-body', start: 'top 85%' },
      })

      gsap.from('.footer-bottom > *', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="section-3" className="relative min-h-screen mt-20">

      {/* Marquee ticker -- tech stack */}
      <div className="overflow-hidden py-8 mb-20" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
            <span key={i} className="mx-8 text-[11px] tracking-[3px] uppercase font-semibold flex items-center gap-8"
              style={{ color: 'rgba(255,255,255,0.08)' }}>
              {skill}
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef4444', opacity: 0.3 }} />
            </span>
          ))}
        </div>
      </div>

      {/* Main CTA area */}
      <div className="px-8 md:px-14 max-w-[1200px] mx-auto">

        {/* Big headline with overflow clip animation */}
        <div className="footer-headline overflow-hidden mb-12">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight" style={{ perspective: '600px' }}>
            {['Let\'s', 'build', 'something'].map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em]" style={{ display: 'inline-block' }}>{word}</span>
            ))}
            <br />
            <span className="inline-block" style={{ color: '#ef4444', display: 'inline-block' }}>extraordinary</span>
            <span className="inline-block" style={{ display: 'inline-block' }}>.</span>
          </h2>
        </div>

        {/* Two column body */}
        <div className="footer-body grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
          <div>
            <p className="text-sm leading-[2] mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Self-taught developer who started at 20 with a Commerce degree.
              Now building with React, Next.js, NestJS, and AI-augmented workflows
              using Claude Code and Cursor to ship 2-3x faster.
            </p>
            <p className="text-sm leading-[2]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              I've architected products for companies like Dun & Bradstreet,
              built systems processing $3M+ daily, and mentored developers
              who've gone on to senior roles.
            </p>
          </div>

          <div className="flex flex-col justify-between">
            {/* Contact CTA */}
            <div>
              <a
                href={`mailto:${personal.email}`}
                className="group inline-flex items-center gap-4 cursor-pointer"
              >
                <span
                  className="text-3xl md:text-4xl font-bold tracking-tight transition-all duration-500 group-hover:tracking-wide"
                  style={{ color: '#fff' }}
                >
                  Say hello
                </span>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
              <p className="text-xs mt-3 transition-colors duration-300 hover:text-white cursor-pointer" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {personal.email}
              </p>
            </div>

            {/* Location + Phone */}
            <div className="mt-8 flex gap-12">
              <div>
                <span className="text-[9px] tracking-[3px] uppercase block mb-2" style={{ color: 'rgba(255,255,255,0.12)', fontWeight: 600 }}>Location</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{personal.location}</span>
              </div>
              <div>
                <span className="text-[9px] tracking-[3px] uppercase block mb-2" style={{ color: 'rgba(255,255,255,0.12)', fontWeight: 600 }}>Phone</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{personal.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom px-8 md:px-14 py-8 max-w-[1200px] mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left -- Links */}
          <div className="flex items-center gap-6">
            {[
              { label: 'LinkedIn', href: personal.linkedin },
              { label: 'GitHub', href: personal.github },
              { label: 'Email', href: `mailto:${personal.email}` },
              { label: 'Resume', href: personal.resumeUrl },
            ].map((link, i) => (
              <div key={link.label} className="flex items-center gap-6">
                {i > 0 && <span className="w-[3px] h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[2px] uppercase font-semibold transition-colors duration-300 hover:text-white cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {/* Right -- Credit */}
          <span className="text-[9px] tracking-[2px] uppercase" style={{ color: 'rgba(255,255,255,0.08)' }}>
            &copy; 2026 Umesh Gorfad
          </span>
        </div>
      </div>

      {/* Grand finale -- UG zooms in behind this as you scroll */}
      <div id="footer-end" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Big name reveal -- text sits ON TOP of the giant 3D UG */}
        <div className="relative z-10 text-center">
          <h2
            className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-[-0.05em] mix-blend-difference"
            style={{ color: '#fff' }}
          >
            UMESH
            <br />
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', WebkitTextFillColor: 'transparent' }}>
              GORFAD
            </span>
          </h2>
          <p
            className="mt-6 text-[10px] tracking-[6px] uppercase mix-blend-difference"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Agentic Full-Stack Developer
          </p>
        </div>

        {/* Bottom copyright -- absolute bottom */}
        <div className="absolute bottom-6 left-0 right-0 text-center z-10 mix-blend-difference">
          <span className="text-[8px] tracking-[3px] uppercase" style={{ color: 'rgba(255,255,255,0.1)' }}>
            &copy; 2026 &mdash; Designed & Built by Umesh Gorfad
          </span>
        </div>
      </div>
    </div>
  )
}
