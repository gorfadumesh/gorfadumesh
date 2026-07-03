import { useState, useEffect, useRef } from 'react'
import { personal } from '../data/content'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      // Hide on scroll down, show on scroll up
      setHidden(y > lastY.current && y > 150)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transform: hidden ? 'translateY(-120%)' : 'translateY(0)',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        className="flex items-center justify-between px-8 md:px-14 py-5 transition-all duration-700"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
        }}
      >
        {/* Left -- Monogram + line */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative">
            <span
              className="text-[22px] font-black tracking-[-0.04em] transition-all duration-500 group-hover:tracking-[0.05em]"
              style={{ color: '#fff', fontFamily: 'Arial, sans-serif' }}
            >
              U
              <span style={{ color: '#ef4444' }}>G</span>
            </span>
            <div
              className="absolute -bottom-1 left-0 h-[2px] w-full transition-all duration-500 group-hover:w-[140%] group-hover:-left-[20%]"
              style={{ background: 'linear-gradient(90deg, transparent, #ef4444, transparent)' }}
            />
          </div>
          <div className="hidden md:block w-[1px] h-5" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span
            className="hidden md:block text-[9px] tracking-[4px] uppercase transition-opacity duration-300"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Portfolio &mdash; 2026
          </span>
        </a>

        {/* Right */}
        <div className="flex items-center">
          {/* Nav links */}
          <div className="hidden md:flex items-center mr-8">
            {['Work', 'About', 'Contact'].map((label, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && (
                  <div className="w-[3px] h-[3px] rounded-full mx-5" style={{ background: 'rgba(255,255,255,0.12)' }} />
                )}
                <button
                  onClick={() => scrollTo(label === 'Work' ? 'section-2' : 'section-3')}
                  className="text-[10px] tracking-[2.5px] uppercase cursor-pointer transition-all duration-300 relative group"
                  style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                >
                  {label}
                  <span
                    className="absolute -bottom-1.5 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                    style={{ background: '#ef4444' }}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="hidden md:block w-[1px] h-5 mr-8" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* LinkedIn + Resume */}
          <div className="flex items-center gap-5">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 cursor-pointer transition-all duration-300 group"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0a66c2'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-[9px] tracking-[2px] uppercase font-semibold">LinkedIn</span>
            </a>

            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-[9px] tracking-[2px] uppercase cursor-pointer group"
              style={{ color: '#ef4444', fontWeight: 700 }}
            >
              <span className="flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
                Resume
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
