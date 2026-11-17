import { useEffect } from 'react'
import { AdvancedMarker, APIProvider, Map as GoogleMap, useMap } from '@vis.gl/react-google-maps'
import { useCountry } from '@/context/countryContext'
import { getLocation, locations } from '@/data/locations'
import type { OfficeLocation } from '@/data/types'
import { googleMapsKey } from '@/lib/env'
import { cn } from '@/lib/cn'

/** Fly the camera to the selected country's office. */
function CameraController({ target }: { target: OfficeLocation }) {
  const map = useMap()
  useEffect(() => {
    if (!map) return
    map.moveCamera({ center: { lat: target.lat, lng: target.lng }, zoom: target.isPlaceholder ? 11 : 15 })
  }, [map, target])
  return null
}

/**
 * Google Map with custom branded markers (the R&B logo). Lazy-loaded - the Google Maps script is
 * only requested once this section scrolls near the viewport, and only when a key is configured.
 */
export default function MapView() {
  const { country, setCountry } = useCountry()
  const active = getLocation(country)

  return (
    <APIProvider apiKey={googleMapsKey}>
      <GoogleMap
        // DEMO_MAP_ID enables AdvancedMarker without a cloud-styled map; swap for your own Map ID later
        mapId="DEMO_MAP_ID"
        defaultCenter={{ lat: active.lat, lng: active.lng }}
        defaultZoom={11}
        gestureHandling="cooperative"
        disableDefaultUI
        zoomControl
        clickableIcons={false}
        className="h-full w-full"
      >
        {locations.map((l) => {
          const selected = l.id === country
          return (
            <AdvancedMarker
              key={l.id}
              position={{ lat: l.lat, lng: l.lng }}
              title={l.label}
              onClick={() => setCountry(l.id)}
              zIndex={selected ? 10 : 1}
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl ring-4 transition-transform duration-300',
                    selected ? 'scale-110 ring-[#2F5FE0]' : 'ring-white',
                  )}
                >
                  <img src="/brand/rnb-main.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full" />
                </div>
                <div className="-mt-2 h-3.5 w-3.5 rotate-45 bg-white shadow-md" />
              </div>
            </AdvancedMarker>
          )
        })}
        <CameraController target={active} />
      </GoogleMap>
    </APIProvider>
  )
}
