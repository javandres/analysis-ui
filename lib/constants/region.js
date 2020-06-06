//
import reprojectCoordinates from '../utils/reproject-coordinates'

export const CREATING_ID = '__CREATING_REGION__'

const ne = reprojectCoordinates({lat: -2.8224219, lon: -78.891719})
const sw = reprojectCoordinates({lat: -2.9378069, lon: -79.072339})

export const DEFAULT_BOUNDS = {
  north: ne.lat,
  east: ne.lon,
  south: sw.lat,
  west: sw.lon
}
