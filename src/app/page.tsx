export default function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between p-8"
      style={{ 
        backgroundImage: 'url(/background.png)',
        color: '#4ade80' // Verde directo
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center mt-16">
        <h1 className="text-5xl font-bold mb-4" style={{ color: '#4ade80' }}>Step Beyond the Ordinary</h1>
        <div className="flex space-x-4 text-lg">
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm" style={{ color: '#4ade80' }}>Portal</span>
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm" style={{ color: '#4ade80' }}>Flow State</span>
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm" style={{ color: '#4ade80' }}>Limitless Canvas</span>
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm" style={{ color: '#4ade80' }}>Cloud collaboration</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end mb-16">
        <p className="text-3xl w-1/3 leading-relaxed" style={{ color: '#4ade80' }}>
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
