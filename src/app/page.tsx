'use client'

export default function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{
        backgroundImage: 'url(/background.png)',
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col items-end mt-16 px-16">
        <div style={{ display: 'inline-flex', flexDirection: 'column', marginRight: '4rem' }}>
          <h1 className="text-6xl mb-6" style={{ color: '#CBD5E1', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 300, letterSpacing: '-0.02em', textAlign: 'left', width: '100%' }}>
            Step Beyond the Ordinary
          </h1>
          <div 
            className="rounded-full backdrop-blur-md border border-white/30 flex items-center text-base" 
            style={{ 
              color: '#CBD5E1',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              paddingTop: '0.65rem',
              paddingBottom: '0.65rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2)',
              gap: '1.5rem',
              whiteSpace: 'nowrap'
            }}
          >
            <span onClick={() => window.open('/lookup', '_blank')} style={{ cursor: 'pointer' }}>Lookup</span>
            <span style={{ color: '#CBD5E1', fontSize: '1.2em' }}>•</span>
            <span onClick={() => window.open('/team', '_blank')} style={{ cursor: 'pointer' }}>Team</span>
            <span style={{ color: '#CBD5E1', fontSize: '1.2em' }}>•</span>
            <span onClick={() => window.open('/api', '_blank')} style={{ cursor: 'pointer' }}>API</span>
            <span style={{ color: '#CBD5E1', fontSize: '1.2em' }}>•</span>
            <span onClick={() => window.open('/pricing', '_blank')} style={{ cursor: 'pointer' }}>Pricing</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end mb-20 px-16">
        <p className="hero-title w-1/2">
          The single platform to iterate, evaluate, deploy, and monitor LLMs
        </p>
        
              <button className="portal-button" onClick={() => window.open('/map', '_blank')}>
                <span className="button-text">Explore the portal</span>
                <span className="arrow-circle">→</span>
              </button>
      </div>
    </div>
  )
}