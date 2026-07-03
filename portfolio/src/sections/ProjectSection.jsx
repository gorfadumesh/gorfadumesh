import { useEffect, useRef } from 'react'
import { gsap } from '../libs/gsap'

const PROJECTS = [
  {
    key: 'unitpay',
    num: '01',
    name: 'UnitPay',
    role: 'Agentic Full-Stack Dev',
    year: '2025',
    desc: 'Monetization engine for AI-native SaaS — Stripe Connect, MCP Protocol, Claude Code workflows.',
    tech: ['React', 'NestJS', 'PostgreSQL', 'AWS'],
    status: 'current',
  },
  {
    key: 'xrstudio',
    num: '02',
    name: 'xR Studio',
    role: 'React Developer',
    year: '2023–24',
    desc: 'Financial dashboards processing $3M+ daily. Real-time collaboration for 50K+ concurrent users.',
    tech: ['Next.js', 'TypeScript', 'WebSockets'],
    status: 'past',
  },
  {
    key: 'webcubic',
    num: '03',
    name: 'Webcubic',
    role: 'React Developer',
    year: '2021–23',
    desc: 'Shipped 8 production apps. Built MVP that secured $2M Series A. 95+ Lighthouse scores.',
    tech: ['React', 'GraphQL', 'Material-UI'],
    status: 'past',
  },
  {
    key: 'assessment',
    num: '04',
    name: 'Assessment Platform',
    role: 'Lead Developer',
    year: 'EdTech',
    desc: 'Automated OMR scanning & real-time grading. Saved tutors 4+ hours daily.',
    tech: ['Next.js', 'NestJS', 'FastAPI', 'Stripe'],
    status: 'project',
  },
  {
    key: 'wolfpack',
    num: '05',
    name: 'Wolfpack Trading',
    role: 'Frontend Developer',
    year: 'Fintech',
    desc: 'Real-time trading with live market data for Dun & Bradstreet.',
    tech: ['React', 'Redux', 'WebSocket', 'ApexCharts'],
    status: 'project',
  },
  {
    key: 'nilo',
    num: '06',
    name: 'Nilo Health',
    role: 'Frontend Developer',
    year: 'HealthTech',
    desc: 'Gamified health tracking with real-time Firebase sync and animated dashboards.',
    tech: ['React', 'Tailwind', 'Firebase'],
    status: 'project',
  },
]

export function ProjectSection() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.from('.work-header', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.work-header', start: 'top 88%' },
      })

      // Stagger rows
      gsap.from('.work-row', {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.work-list', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="section-2" className="overflow-hidden px-8 md:px-14 py-20 md:py-32 relative">
      {/* Section header */}
      <div className="work-header max-w-[1200px] mx-auto mb-16 md:mb-24 flex items-end justify-between">
        <div>
          <span
            className="text-[10px] tracking-[4px] uppercase block mb-3"
            style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}
          >
            Selected Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold leading-none tracking-tight">
            Projects &<br />
            <span style={{ color: '#ef4444' }}>Experience</span>
          </h2>
        </div>
        <span
          className="hidden md:block text-[10px] tracking-[3px] uppercase"
          style={{ color: 'rgba(255,255,255,0.15)', fontWeight: 600 }}
        >
          ({PROJECTS.length}) entries
        </span>
      </div>

      {/* Project rows */}
      <div className="work-list max-w-[1200px] mx-auto">
        {/* Column headers */}
        <div
          className="hidden md:grid items-center pb-4 mb-2 text-[9px] tracking-[3px] uppercase"
          style={{
            gridTemplateColumns: '60px 1fr 200px 100px 80px',
            color: 'rgba(255,255,255,0.15)',
            fontWeight: 600,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span>No.</span>
          <span>Project</span>
          <span>Role</span>
          <span>Year</span>
          <span className="text-right">Type</span>
        </div>

        {PROJECTS.map((p) => (
          <div
            key={p.key}
            img-title={p.key}
            className="title work-row group cursor-pointer"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            {/* Main row */}
            <div
              className="grid items-center py-6 md:py-7 transition-all duration-300"
              style={{ gridTemplateColumns: '60px 1fr 200px 100px 80px' }}
            >
              {/* Number */}
              <span
                className="text-[11px] font-bold transition-colors duration-300 group-hover:text-red-500"
                style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'monospace' }}
              >
                {p.num}
              </span>

              {/* Name */}
              <div className="flex items-center gap-4">
                <h3
                  className="text-2xl md:text-4xl font-bold tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {p.name}
                </h3>
                {/* Arrow that appears on hover */}
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: '#ef4444' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>

              {/* Role */}
              <span
                className="hidden md:block text-[11px] tracking-wide transition-colors duration-300 group-hover:text-white/60"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                {p.role}
              </span>

              {/* Year */}
              <span
                className="hidden md:block text-[10px] tracking-wider uppercase transition-colors duration-300 group-hover:text-white/40"
                style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'monospace' }}
              >
                {p.year}
              </span>

              {/* Status badge */}
              <div className="hidden md:flex justify-end">
                <span
                  className="text-[8px] tracking-[2px] uppercase font-bold px-2.5 py-1 rounded-full transition-all duration-300"
                  style={{
                    color: p.status === 'current' ? '#ef4444' : 'rgba(255,255,255,0.2)',
                    border: `1px solid ${p.status === 'current' ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    background: p.status === 'current' ? 'rgba(239,68,68,0.06)' : 'transparent',
                  }}
                >
                  {p.status === 'current' ? 'Active' : p.status === 'past' ? 'Role' : 'Project'}
                </span>
              </div>
            </div>

            {/* Expandable detail row -- visible on hover */}
            <div
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ maxHeight: 0 }}
              ref={(el) => {
                if (!el) return
                const parent = el.closest('.work-row')
                parent?.addEventListener('mouseenter', () => {
                  el.style.maxHeight = '120px'
                  el.style.opacity = '1'
                })
                parent?.addEventListener('mouseleave', () => {
                  el.style.maxHeight = '0px'
                  el.style.opacity = '0'
                })
              }}
            >
              <div className="pl-[60px] pb-6 flex items-start gap-12">
                <p
                  className="text-[13px] leading-relaxed max-w-md"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {p.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] tracking-[1px] uppercase font-semibold px-3 py-1 rounded-full"
                      style={{
                        color: 'rgba(255,255,255,0.3)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Red accent line */}
      <div className="absolute bg-red-600 h-px w-390 top-280 md:top-240 left-[10vw] md:left-[70vw] md:w-200 -rotate-45" />
    </section>
  )
}
