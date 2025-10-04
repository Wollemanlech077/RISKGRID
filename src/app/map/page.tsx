'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (map.current) return // Initialize map only once
    
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    console.log('Mapbox token:', token ? 'Token exists' : 'Token missing')
    
    mapboxgl.accessToken = token || ''

    if (mapContainer.current && token) {
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [-99.1332, 19.4326],
          zoom: 12,
          pitch: 45,
          bearing: -17.6,
        })

        map.current.on('load', () => {
          console.log('Map loaded successfully')
          setMapLoaded(true)
        })

        map.current.on('error', (e) => {
          console.error('Map error:', e)
        })

        // Añadir controles de navegación
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        // Añadir control de pantalla completa
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right')
      } catch (error) {
        console.error('Error initializing map:', error)
      }
    }

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div className="relative w-screen h-screen bg-gray-900">
      <div ref={mapContainer} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <p className="text-white text-xl">Loading map...</p>
        </div>
      )}
      
      {/* Overlay con título y botón de regreso */}
      <div className="absolute top-8 left-8 z-10">
        <div className="glassmorphism-card p-6 rounded-2xl">
          <h1 className="text-3xl font-light text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Risk Grid Portal
          </h1>
          <p className="text-white/70 text-sm mb-4">
            Interactive mapping interface
          </p>
          <button
            onClick={() => window.close()}
            className="portal-button-small"
          >
            ← Back to main
          </button>
        </div>
      </div>
    </div>
  )
}

