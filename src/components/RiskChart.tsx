'use client'

interface RiskItem {
  id: string
  name: string
  probability: number
  impact: number
  category: string
  status: 'active' | 'mitigated' | 'resolved'
}

interface RiskChartProps {
  risks: RiskItem[]
}

export default function RiskChart({ risks }: RiskChartProps) {
  const getRiskLevel = (probability: number, impact: number) => {
    const score = (probability * impact) / 100
    if (score >= 70) return 'critical'
    if (score >= 50) return 'high'
    if (score >= 30) return 'medium'
    return 'low'
  }

  const getRiskStats = () => {
    const stats = risks.reduce((acc, risk) => {
      const level = getRiskLevel(risk.probability, risk.impact)
      acc[level] = (acc[level] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      critical: stats.critical || 0,
      high: stats.high || 0,
      medium: stats.medium || 0,
      low: stats.low || 0
    }
  }

  const stats = getRiskStats()
  const total = risks.length
  const maxValue = Math.max(stats.critical, stats.high, stats.medium, stats.low)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Critical</span>
          <span className="text-sm font-medium">{stats.critical}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${total > 0 ? (stats.critical / maxValue) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">High</span>
          <span className="text-sm font-medium">{stats.high}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${total > 0 ? (stats.high / maxValue) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Medium</span>
          <span className="text-sm font-medium">{stats.medium}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${total > 0 ? (stats.medium / maxValue) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Low</span>
          <span className="text-sm font-medium">{stats.low}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${total > 0 ? (stats.low / maxValue) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
