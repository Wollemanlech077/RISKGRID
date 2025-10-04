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
        <h1 className="main-title text-6xl mb-6" style={{ color: '#CBD5E1' }}>
          Step Beyond the Ordinary
        </h1>
        <div className="subtitle-tags flex items-center space-x-3 text-base" style={{ color: '#CBD5E1' }}>
          <span>Portal</span>
          <span style={{ color: '#94A3B8' }}>•</span>
          <span>Flow State</span>
          <span style={{ color: '#94A3B8' }}>•</span>
          <span>Limitless Canvas</span>
          <span style={{ color: '#94A3B8' }}>•</span>
          <span>Cloud collaboration</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end mb-20 px-16">
        <p className="hero-title w-1/2">
          The single platform to iterate, evaluate, deploy, and monitor LLMs
        </p>
        
        <button className="portal-button">
          <span className="button-text">Explore the portal</span>
          <span className="arrow-circle">→</span>
        </button>
      </div>
    </div>
  )
}