import lonlat from '@conveyal/lonlat'
import {createSelector} from 'reselect'

import jsolines from 'lib/utils/jsolines'

import selectMaxTripDurationMinutes from './max-trip-duration-minutes'
import selectNearestPercentileIndex from './nearest-percentile-index'
import selectTravelTimePercentile from './travel-time-percentile'

/**
 * SingleValuedSurface, width, height all come from selector defined below and
 * thus must be passed in one argument.
 */
export function computeIsochrone(singleValuedSurface, cutoff) {
  if (singleValuedSurface == null) return null

  const {surface, width, height, west, north, zoom} = singleValuedSurface

  return jsolines({
    surface,
    width,
    height,
    cutoff,
    project: ([x, y]) => {
      const ll = lonlat.fromPixel({x: x + west, y: y + north}, zoom)
      return [ll.lon, ll.lat]
    }
  })
}

/**
 * The travel time surface contains percentiles, compute a surface with a single
 * percentile for jsolines done separately from isochrone computation because it
 * can be saved when the isochrone cutoff changes when put in a separate
 * selector, memoization will handle this for us.
 */
export function computeSingleValuedSurface(travelTimeSurface, percentile) {
  if (travelTimeSurface == null) return null
  const surface = new Uint8Array(
    travelTimeSurface.width * travelTimeSurface.height
  )

  const percentileIndex = selectNearestPercentileIndex(percentile)

  // y on outside, loop in order, hope the CPU figures this out and prefetches
  for (let y = 0; y < travelTimeSurface.height; y++) {
    for (let x = 0; x < travelTimeSurface.width; x++) {
      const index = y * travelTimeSurface.width + x
      surface[index] = travelTimeSurface.get(x, y, percentileIndex)
    }
  }

  return {
    ...travelTimeSurface,
    surface
  }
}

const singleValuedSurface = createSelector(
  (state) => state.analysis.travelTimeSurface,
  selectTravelTimePercentile,
  computeSingleValuedSurface
)

export default createSelector(
  singleValuedSurface,
  selectMaxTripDurationMinutes,
  computeIsochrone
)
