'use client'

interface RiskItem {
  id: string
  name: string
  probability: number
  impact: number
  category: string
  status: 'active' | 'mitigated' | 'resolved'
}

interface RiskMatrixProps {
  risks: RiskItem[]
}

export default function RiskMatrix({ risks }: RiskMatrixProps) {
  const getRiskLevel = (probability: number, impact: number) => {
    const score = (probability * impact) / 100
    if (score >= 70) return 'critical'
    if (score >= 50) return 'high'
    if (score >= 30) return 'medium'
    return 'low'
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  // Create a 10x10 grid
  const gridSize = 10
  const matrix = Array(gridSize).fill(null).map((_, row) => 
    Array(gridSize).fill(null).map((_, col) => {
      const probability = (col + 1) * 10
      const impact = (gridSize - row) * 10
      const level = getRiskLevel(probability, impact)
      
      // Find risks in this cell
      const cellRisks = risks.filter(risk => 
        Math.floor(risk.probability / 10) === col && 
        Math.floor(risk.impact / 10) === (gridSize - row - 1)
      )
      
      return { level, risks: cellRisks }
    })
  )

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>Low Probability</span>
        <span>High Probability</span>
      </div>
      
      {/* Matrix Grid */}
      <div className="relative">
        {/* Y-axis label */}
        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-600">
          <span>High Impact</span>
          <span>Low Impact</span>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-10 gap-1 ml-8">
          {matrix.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center text-xs font-bold
                  ${cell.level === 'critical' ? 'bg-red-100 border-red-300' : ''}
                  ${cell.level === 'high' ? 'bg-orange-100 border-orange-300' : ''}
                  ${cell.level === 'medium' ? 'bg-yellow-100 border-yellow-300' : ''}
                  ${cell.level === 'low' ? 'bg-green-100 border-green-300' : ''}
                `}
                title={`Probability: ${(colIndex + 1) * 10}%, Impact: ${(gridSize - rowIndex) * 10}%`}
              >
                {cell.risks.length > 0 && (
                  <div className="w-3 h-3 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                    {cell.risks.length}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
          <span>Critical</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded"></div>
          <span>High</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span>Medium</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
          <span>Low</span>
        </div>
      </div>
    </div>
  )
}
