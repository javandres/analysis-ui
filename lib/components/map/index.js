import get from 'lodash/get'
import dynamic from 'next/dynamic'
import React from 'react'
import {AttributionControl, Map as LeafletMap, ZoomControl} from 'react-leaflet'
import {useSelector} from 'react-redux'

import useOnMount from 'lib/hooks/use-on-mount'
import useRouteChanging from 'lib/hooks/use-route-changing'
import selectModificationSaveInProgress from 'lib/selectors/modification-save-in-progress'
import selectRegionBounds from 'lib/selectors/region-bounds'
import * as localStorage from 'lib/utils/local-storage'

import Geocoder from './geocoder'

const MapboxGLLayer = dynamic(() => import('./mapbox-gl'))

const VIEWPORT_KEY = 'analysis-map-viewport'
const ZOOM = 12
const MIN_ZOOM = 3 // Odd map shifts happen at lower zoom levels
const DEFAULT_VIEWPORT = {
  center: [38, -77],
  zoom: ZOOM
}

export default function Map(p) {
  const leafletMapRef = React.useRef()
  const regionBounds = useSelector(selectRegionBounds)
  const [viewport, setViewport] = React.useState(() =>
    localStorage.getParsedItem(VIEWPORT_KEY)
  )
  const saveInProgress = useSelector(selectModificationSaveInProgress)
  const [routeChanging] = useRouteChanging()

  // Share the leaflet map
  const getMap = () => get(leafletMapRef, 'current.leafletElement')

  // Attach the leaflet map to `window` if it exists. Helpful with Cypress test
  React.useEffect(() => {
    if (leafletMapRef.current) {
      window.LeafletMap = leafletMapRef.current.leafletElement
    }
  }, [leafletMapRef])

  // Map container map change sizes between pages
  React.useEffect(() => {
    if (leafletMapRef.current && !routeChanging) {
      leafletMapRef.current.leafletElement.invalidateSize()

      // Delay an additional inalidation to allow for elements to change the
      // viewport size. This is hacky, but we don't currently have an application
      // state to indicate that all elements have been drawn.
      const id = setTimeout(() => {
        leafletMapRef.current.leafletElement.invalidateSize()
      }, 100)
      return () => clearTimeout(id)
    }
  }, [routeChanging, leafletMapRef])

  // If center is not within region bounds, reset to center
  React.useEffect(() => {
    if (regionBounds) {
      const center = get(viewport, 'center')
      if (!center || !regionBounds.contains(center)) {
        setViewport({center: regionBounds.getCenter(), zoom: ZOOM})
      }
    }
  }, [leafletMapRef, regionBounds, viewport])

  // Set geolocation to users current position on initial use
  useOnMount(() => {
    let watchId = false
    if (!viewport && navigator in window) {
      watchId = navigator.geolocation.getCurrentPosition(function (p) {
        setViewport({
          ...viewport,
          center: [p.coords.latitude, p.coords.longitude]
        })
      })
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  })

  return (
    <>
      <LeafletMap
        attributionControl={false}
        className={routeChanging || saveInProgress ? 'disableAndDim' : ''}
        minZoom={MIN_ZOOM}
        onViewportChanged={(v) => localStorage.stringifyAndSet(VIEWPORT_KEY, v)}
        preferCanvas={true}
        ref={leafletMapRef}
        viewport={viewport || DEFAULT_VIEWPORT}
        zoomControl={false}
      >
        {!process.env.BASEMAP_DISABLED && <MapboxGLLayer />}

        <AttributionControl position='bottomright' prefix={false} />
        <ZoomControl position='topright' />

        {!routeChanging && p.children ? p.children : null}
      </LeafletMap>

      <Geocoder getMap={getMap} />
    </>
  )
}
