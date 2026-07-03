// Background images that reveal on project title hover
// For now using colored placeholder divs. Replace with actual project screenshots later.
const PROJECTS = ['assessment', 'wolfpack', 'nilo', 'monkeybox', 'unitpay', 'xrstudio', 'webcubic']

const COLORS = {
  assessment: '#1a0a2e',
  wolfpack: '#0a1628',
  nilo: '#0a2818',
  monkeybox: '#281a0a',
  unitpay: '#0a1a28',
  xrstudio: '#1a0a28',
  webcubic: '#0a0a1a',
}

export function BackgroundImages() {
  return (
    <div className="images">
      {PROJECTS.map((name) => (
        <div
          key={name}
          id={name}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            transition: 'all 0.3s linear',
            background: `radial-gradient(ellipse at center, ${COLORS[name]}ee, #0a0a0a)`,
          }}
        />
      ))}
    </div>
  )
}
