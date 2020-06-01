//
import reprojectCoordinates from '../utils/reproject-coordinates'

export const CREATING_ID = '__CREATING_REGION__'

const ne = reprojectCoordinates({lat: -2.841546, lon: -78.92578})
const sw = reprojectCoordinates({lat: -2.940297, lon: -79.11254})

export const DEFAULT_BOUNDS = {
  north: ne.lat,
  east: ne.lon,
  south: sw.lat,
  west: sw.lon
}
