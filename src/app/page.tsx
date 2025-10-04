'use client'

import { useState, useEffect } from 'react'
import RiskCard from '@/components/RiskCard'
import RiskChart from '@/components/RiskChart'
import RiskMatrix from '@/components/RiskMatrix'

interface RiskItem {
  id: string
  name: string
  probability: number
  impact: number
  category: string
  status: 'active' | 'mitigated' | 'resolved'
}

export default function Home() {
  const [risks, setRisks] = useState<RiskItem[]>([])
  const [newRisk, setNewRisk] = useState({
    name: '',
    probability: 50,
    impact: 50,
    category: 'Technical'
  })

  useEffect(() => {
    // Sample data
    setRisks([
      {
        id: '1',
        name: 'Data Breach',
        probability: 30,
        impact: 90,
        category: 'Security',
        status: 'active'
      },
      {
        id: '2',
        name: 'Server Downtime',
        probability: 60,
        impact: 70,
        category: 'Technical',
        status: 'active'
      },
      {
        id: '3',
        name: 'Budget Overrun',
        probability: 40,
        impact: 80,
        category: 'Financial',
        status: 'mitigated'
      },
      {
        id: '4',
        name: 'Team Member Departure',
        probability: 20,
        impact: 60,
        category: 'Human Resources',
        status: 'active'
      }
    ])
  }, [])

  const addRisk = () => {
    if (newRisk.name.trim()) {
      const risk: RiskItem = {
        id: Date.now().toString(),
        name: newRisk.name,
        probability: newRisk.probability,
        impact: newRisk.impact,
        category: newRisk.category,
        status: 'active'
      }
      setRisks([...risks, risk])
      setNewRisk({ name: '', probability: 50, impact: 50, category: 'Technical' })
    }
  }

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
      total: risks.length,
      critical: stats.critical || 0,
      high: stats.high || 0,
      medium: stats.medium || 0,
      low: stats.low || 0
    }
  }

  const stats = getRiskStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RISKGRID</h1>
              <p className="text-gray-600">Risk Analysis Dashboard - ACTA 2025</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Risks</div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Critical</div>
                <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">High</div>
                <div className="text-2xl font-bold text-orange-600">{stats.high}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Medium</div>
                <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Low</div>
                <div className="text-2xl font-bold text-green-600">{stats.low}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Risk Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Risk</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Risk Name"
              value={newRisk.name}
              onChange={(e) => setNewRisk({...newRisk, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newRisk.category}
              onChange={(e) => setNewRisk({...newRisk, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Technical">Technical</option>
              <option value="Security">Security</option>
              <option value="Financial">Financial</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Operational">Operational</option>
            </select>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Probability: {newRisk.probability}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newRisk.probability}
                onChange={(e) => setNewRisk({...newRisk, probability: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Impact: {newRisk.impact}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newRisk.impact}
                onChange={(e) => setNewRisk({...newRisk, impact: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>
          <button
            onClick={addRisk}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Risk
          </button>
        </div>

        {/* Charts and Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Distribution</h2>
            <RiskChart risks={risks} />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Matrix</h2>
            <RiskMatrix risks={risks} />
          </div>
        </div>

        {/* Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {risks.map((risk) => (
            <RiskCard
              key={risk.id}
              risk={risk}
              riskLevel={getRiskLevel(risk.probability, risk.impact)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
