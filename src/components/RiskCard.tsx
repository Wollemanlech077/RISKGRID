'use client'

interface RiskItem {
  id: string
  name: string
  probability: number
  impact: number
  category: string
  status: 'active' | 'mitigated' | 'resolved'
}

interface RiskCardProps {
  risk: RiskItem
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

export default function RiskCard({ risk, riskLevel }: RiskCardProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'border-red-500 bg-red-50'
      case 'high': return 'border-orange-500 bg-orange-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800'
      case 'mitigated': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const riskScore = Math.round((risk.probability * risk.impact) / 100)

  return (
    <div className={`border-2 rounded-lg p-6 ${getRiskColor(riskLevel)}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{risk.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
          {risk.status}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Category: {risk.category}</div>
        <div className="text-sm text-gray-600 mb-2">Risk Score: {riskScore}/100</div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Probability</span>
            <span>{risk.probability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${risk.probability}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Impact</span>
            <span>{risk.impact}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${risk.impact}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Risk Level: {riskLevel.toUpperCase()}</span>
          <span>ID: {risk.id}</span>
        </div>
      </div>
    </div>
  )
}
